// src/features/omnichannel-ai-agent/hooks/useChatAgent.ts
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessageToAgent, initializeConversation } from '../services/aiAgentService';
import { Message, ConversationContext } from '../services/aiAgentService';

interface UseChatAgentProps {
  channelId: 'web' | 'whatsapp' | 'facebook' | 'telegram';
  userId?: string;
}

export function useChatAgent({ channelId, userId }: UseChatAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Create session ID on mount
  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  }, []);

  // Initialize conversation
  const initialize = useCallback(async () => {
    if (!sessionId || isInitialized) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const context: ConversationContext = {
        sessionId,
        userId,
        channel: channelId,
        previousMessages: [],
      };

      const response = await initializeConversation(context);
      
      // Add initial AI message
      const initialMessage: Message = {
        id: uuidv4(),
        text: response.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages([initialMessage]);
      setIsInitialized(true);
    } catch (err) {
      setError('Failed to initialize chat. Please try again.');
      console.error('Chat initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isInitialized, userId, channelId]);

  // Send message to AI agent
  const sendAiMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !isInitialized) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add user message immediately
      const userMessage: Message = {
        id: uuidv4(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      // Prepare context
      const context: ConversationContext = {
        sessionId,
        userId,
        channel: channelId,
        previousMessages: messages,
      };

      // Get AI response
      const response = await sendMessageToAgent(text, context);

      // Add AI message
      const aiMessage: Message = {
        id: uuidv4(),
        text: response.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Message sending error:', err);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, userId, channelId, messages, isLoading, isInitialized]);

  // Reset chat
  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsInitialized(false);
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sessionId,
    isInitialized,
    initialize,
    sendAiMessage,
    resetChat,
  };
}