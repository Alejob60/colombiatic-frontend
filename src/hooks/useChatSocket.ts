// src/hooks/useChatSocket.ts
import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDashboardStore, Message } from '@/store/useDashboardStore';
import { v4 as uuidv4 } from 'uuid';
import { sendNotification } from '@/components/dashboard-v2/NotificationCenter';

const SOCKET_URL = process.env.NEXT_PUBLIC_METAAGENT_URL || 'http://localhost:3001';

interface AgentMessage {
  type: 'message' | 'command' | 'navigate' | 'action' | 'render_view';
  content?: string;
  data?: Record<string, any>;
  quickReplies?: string[];
  actions?: Array<{
    label: string;
    action: string;
    data?: Record<string, any>;
  }>;
}

interface AgentCommand {
  type: 'navigate' | 'action' | 'render_view';
  target?: string;
  action?: string;
  view?: string;
  serviceId?: string;
  data?: Record<string, any>;
}

export function useChatSocket(userId?: string) {
  const socketRef = useRef<Socket | null>(null);
  const {
    conversationId,
    setConversationId,
    addMessage,
    setIsTyping,
    setIsConnected,
    setCurrentView,
    setPendingAction,
  } = useDashboardStore();

  // Connect to WebSocket
  useEffect(() => {
    if (!userId) return;

    console.log('[ChatSocket] Connecting to Meta-Agent...', SOCKET_URL);

    // Get JWT token from localStorage
    const getAuthToken = () => {
      const tokens = localStorage.getItem('auth_tokens');
      if (tokens) {
        try {
          const parsed = JSON.parse(tokens);
          return parsed.access_token || parsed.accessToken;
        } catch (error) {
          console.error('[ChatSocket] Error parsing auth tokens:', error);
          return null;
        }
      }
      return null;
    };

    const authToken = getAuthToken();

    const socket = io(SOCKET_URL, {
      auth: {
        token: authToken,
        userId,
        conversationId: conversationId || uuidv4(),
      },
      extraHeaders: {
        'Authorization': `Bearer ${authToken}`,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    // Connection events
    socket.on('connect', () => {
      console.log('[ChatSocket] Connected to Meta-Agent');
      setIsConnected(true);

      // Set or restore conversation ID
      if (!conversationId) {
        const newConversationId = uuidv4();
        setConversationId(newConversationId);
        socket.emit('start_conversation', { conversationId: newConversationId });
      }
    });

    socket.on('disconnect', () => {
      console.log('[ChatSocket] Disconnected from Meta-Agent');
      setIsConnected(false);
    });

    socket.on('connect_error', (error: Error) => {
      console.error('[ChatSocket] Connection error:', error);
      setIsConnected(false);
      
      // Check if it's an authentication error
      if (error.message && error.message.includes('auth')) {
        console.error('[ChatSocket] Authentication failed. Token may be invalid or expired.');
        // Optionally: trigger token refresh or logout
      }
    });

    // Message events
    socket.on('agent_message', (data: AgentMessage) => {
      console.log('[ChatSocket] Received agent message:', data);
      setIsTyping(false);

      const message: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.content || '',
        timestamp: new Date(),
        metadata: {
          type: data.type as any,
          data: data.data,
        },
        quickReplies: data.quickReplies,
        actions: data.actions,
      };

      addMessage(message);
    });

    // Command events
    socket.on('command', (command: AgentCommand) => {
      console.log('[ChatSocket] Received command:', command);
      handleCommand(command);
    });

    // Notification events
    socket.on('notification', (notification: any) => {
      console.log('[ChatSocket] Received notification:', notification);
      sendNotification({
        type: notification.type || 'info',
        title: notification.title,
        message: notification.message,
        actionLabel: notification.actionLabel,
        actionUrl: notification.actionUrl,
      });
    });

    socket.on('typing', (isTyping: boolean) => {
      setIsTyping(isTyping);
    });

    // Cleanup
    return () => {
      console.log('[ChatSocket] Disconnecting...');
      socket.disconnect();
    };
  }, [userId]);

  // Handle commands from Meta-Agent
  const handleCommand = useCallback((command: AgentCommand) => {
    switch (command.type) {
      case 'navigate':
        if (command.target) {
          // Check if internal or external link
          if (command.target.startsWith('http')) {
            window.open(command.target, '_blank');
          } else {
            // Internal navigation
            window.location.href = command.target;
          }
        }
        break;

      case 'action':
        if (command.action) {
          setPendingAction({
            type: command.action as any,
            payload: command.data || {},
            timestamp: Date.now(),
          });
        }
        break;

      case 'render_view':
        if (command.view) {
          setCurrentView({
            type: command.view as any,
            data: {
              serviceId: command.serviceId,
              ...command.data,
            },
          });
        }
        break;

      default:
        console.warn('[ChatSocket] Unknown command type:', command.type);
    }
  }, [setPendingAction, setCurrentView]);

  // Send message to Meta-Agent
  const sendMessage = useCallback((content: string, metadata?: Record<string, any>) => {
    if (!socketRef.current?.connected) {
      console.warn('[ChatSocket] Not connected to Meta-Agent');
      return;
    }

    const message: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
      metadata: {
        type: 'text',
        data: metadata,
      },
    };

    // Add to local messages
    addMessage(message);

    // Send to server
    socketRef.current.emit('client_message', {
      conversationId,
      content,
      metadata,
    });

    setIsTyping(true);
  }, [conversationId, addMessage, setIsTyping]);

  // Execute action command
  const executeAction = useCallback((action: string, data?: Record<string, any>) => {
    if (!socketRef.current?.connected) {
      console.warn('[ChatSocket] Not connected to Meta-Agent');
      return;
    }

    socketRef.current.emit('execute_action', {
      conversationId,
      action,
      data,
    });
  }, [conversationId]);

  return {
    sendMessage,
    executeAction,
    isConnected: socketRef.current?.connected || false,
  };
}
