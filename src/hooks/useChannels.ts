// src/hooks/useChannels.ts
// Custom hook for channel management

import { useState, useEffect } from 'react';
import * as channelService from '@/services/misybot/channelService';

export interface ChannelsState {
  channels: channelService.ChannelConfig[];
  conversations: channelService.Conversation[];
  messages: channelService.Message[];
  loading: boolean;
  error: string | null;
}

export const useChannels = () => {
  const [state, setState] = useState<ChannelsState>({
    channels: [],
    conversations: [],
    messages: [],
    loading: false,
    error: null
  });

  const fetchChannels = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const channels = await channelService.getChannels();
      // For now, we'll use mock data
      const mockChannels: channelService.ChannelConfig[] = [
        {
          id: 'chan-1',
          type: 'webchat',
          name: 'Web Chat',
          enabled: true,
          config: { title: 'Support Chat', position: 'bottom-right' },
          created_at: '2025-11-01T00:00:00Z',
          updated_at: '2025-11-01T00:00:00Z'
        },
        {
          id: 'chan-2',
          type: 'whatsapp',
          name: 'WhatsApp',
          enabled: false,
          config: { phoneNumber: '+1234567890', apiKey: 'xxxxx' },
          created_at: '2025-11-01T00:00:00Z',
          updated_at: '2025-11-01T00:00:00Z'
        }
      ];
      
      setState(prev => ({
        ...prev,
        channels: mockChannels,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching channels:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch channels'
      }));
    }
  };

  const fetchConversations = async (channelId?: string, status?: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const conversations = await channelService.getConversations(channelId, status);
      // For now, we'll use mock data
      const mockConversations: channelService.Conversation[] = [
        {
          id: 'conv-1',
          channel_id: 'chan-1',
          channel_type: 'webchat',
          customer_id: 'cust-123',
          customer_name: 'John Doe',
          status: 'active',
          assigned_agent: 'Agent Smith',
          created_at: '2025-11-26T10:00:00Z',
          updated_at: '2025-11-26T10:30:00Z',
          last_message: 'Hello, I need help with my order',
          unread_count: 2
        },
        {
          id: 'conv-2',
          channel_id: 'chan-1',
          channel_type: 'webchat',
          customer_id: 'cust-456',
          customer_name: 'Maria Garcia',
          status: 'resolved',
          assigned_agent: 'Agent Johnson',
          created_at: '2025-11-26T09:00:00Z',
          updated_at: '2025-11-26T09:45:00Z',
          last_message: 'Thanks for your help!',
          unread_count: 0
        }
      ];
      
      setState(prev => ({
        ...prev,
        conversations: mockConversations,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch conversations'
      }));
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const messages = await channelService.getMessages(conversationId);
      // For now, we'll use mock data
      const mockMessages: channelService.Message[] = [
        {
          id: 'msg-1',
          conversation_id: 'conv-1',
          text: 'Hello, I need help with my order #12345',
          sender: 'customer',
          sender_name: 'John Doe',
          timestamp: '2025-11-26T10:30:00Z'
        },
        {
          id: 'msg-2',
          conversation_id: 'conv-1',
          text: 'Hi John, I\'d be happy to help you with your order. Can you please provide more details?',
          sender: 'agent',
          sender_name: 'Agent Smith',
          timestamp: '2025-11-26T10:31:00Z'
        }
      ];
      
      setState(prev => ({
        ...prev,
        messages: mockMessages,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch messages'
      }));
    }
  };

  const connectChannel = async (request: channelService.ConnectChannelRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const channel = await channelService.connectChannel(request);
      // For now, we'll simulate the creation
      const newChannel: channelService.ChannelConfig = {
        id: `chan-${Date.now()}`,
        ...request,
        name: request.type.charAt(0).toUpperCase() + request.type.slice(1),
        enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        channels: [...prev.channels, newChannel],
        loading: false
      }));
      
      return newChannel;
    } catch (error) {
      console.error('Error connecting channel:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to connect channel'
      }));
      throw error;
    }
  };

  const updateChannel = async (id: string, config: Record<string, any>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const updatedChannel = await channelService.updateChannel(id, config);
      // For now, we'll simulate the update
      const updatedChannels = state.channels.map(channel => 
        channel.id === id 
          ? { ...channel, config, updated_at: new Date().toISOString() } 
          : channel
      );
      
      setState(prev => ({
        ...prev,
        channels: updatedChannels,
        loading: false
      }));
      
      return updatedChannels.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error updating channel:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update channel'
      }));
      throw error;
    }
  };

  const disconnectChannel = async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // await channelService.disconnectChannel(id);
      // For now, we'll simulate the deletion
      const updatedChannels = state.channels.filter(channel => channel.id !== id);
      
      setState(prev => ({
        ...prev,
        channels: updatedChannels,
        loading: false
      }));
    } catch (error) {
      console.error('Error disconnecting channel:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to disconnect channel'
      }));
      throw error;
    }
  };

  const sendMessage = async (request: channelService.SendMessageRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const message = await channelService.sendMessage(request);
      // For now, we'll simulate the message sending
      const newMessage: channelService.Message = {
        id: `msg-${Date.now()}`,
        ...request,
        sender: 'agent',
        sender_name: 'You',
        timestamp: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        loading: false
      }));
      
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      }));
      throw error;
    }
  };

  const transferToHuman = async (conversationId: string, agentId?: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const updatedConversation = await channelService.transferToHuman(conversationId, agentId);
      // For now, we'll simulate the transfer
      const updatedConversations: channelService.Conversation[] = state.conversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, status: 'transferred', assigned_agent: agentId || 'Human Agent' } 
          : conv
      ) as channelService.Conversation[];
      
      setState(prev => ({
        ...prev,
        conversations: updatedConversations,
        loading: false
      }));
      
      return updatedConversations.find(c => c.id === conversationId) || null;
    } catch (error) {
      console.error('Error transferring conversation:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to transfer conversation'
      }));
      throw error;
    }
  };

  const resolveConversation = async (conversationId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const updatedConversation = await channelService.resolveConversation(conversationId);
      // For now, we'll simulate the resolution
      const updatedConversations: channelService.Conversation[] = state.conversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, status: 'resolved' } 
          : conv
      ) as channelService.Conversation[];
      
      setState(prev => ({
        ...prev,
        conversations: updatedConversations,
        loading: false
      }));
      
      return updatedConversations.find(c => c.id === conversationId) || null;
    } catch (error) {
      console.error('Error resolving conversation:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to resolve conversation'
      }));
      throw error;
    }
  };

  return {
    ...state,
    fetchChannels,
    fetchConversations,
    fetchMessages,
    connectChannel,
    updateChannel,
    disconnectChannel,
    sendMessage,
    transferToHuman,
    resolveConversation
  };
};

export default useChannels;