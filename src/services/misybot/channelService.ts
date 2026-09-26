// src/services/misybot/channelService.ts
// Channel Management Service

import { apiClient } from '@/lib/apiClient';

// Types for channel management
export interface ChannelConfig {
  id: string;
  type: 'webchat' | 'whatsapp' | 'email' | 'facebook' | 'messenger';
  name: string;
  enabled: boolean;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  channel_id: string;
  channel_type: string;
  customer_id: string;
  customer_name: string;
  status: 'active' | 'pending' | 'resolved' | 'transferred';
  assigned_agent?: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
  unread_count: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  text: string;
  sender: 'customer' | 'agent' | 'system';
  sender_name?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ConnectChannelRequest {
  type: 'webchat' | 'whatsapp' | 'email' | 'facebook' | 'messenger';
  config: Record<string, any>;
}

export interface SendMessageRequest {
  conversation_id: string;
  text: string;
  metadata?: Record<string, any>;
}

/**
 * Connect a new channel
 */
export async function connectChannel(request: ConnectChannelRequest): Promise<ChannelConfig> {
  try {
    const response = await apiClient.post<ChannelConfig>('/channels/connect', request);
    return response.data;
  } catch (error) {
    console.error('Error connecting channel:', error);
    throw error;
  }
}

/**
 * Get all channels for the current user
 */
export async function getChannels(): Promise<ChannelConfig[]> {
  try {
    const response = await apiClient.get<ChannelConfig[]>('/channels');
    return response.data;
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
}

/**
 * Update channel configuration
 */
export async function updateChannel(id: string, config: Record<string, any>): Promise<ChannelConfig> {
  try {
    const response = await apiClient.put<ChannelConfig>(`/channels/${id}`, { config });
    return response.data;
  } catch (error) {
    console.error('Error updating channel:', error);
    throw error;
  }
}

/**
 * Disconnect a channel
 */
export async function disconnectChannel(id: string): Promise<void> {
  try {
    await apiClient.delete<void>(`/channels/${id}`);
  } catch (error) {
    console.error('Error disconnecting channel:', error);
    throw error;
  }
}

/**
 * Get conversations for a channel
 */
export async function getConversations(channelId?: string, status?: string): Promise<Conversation[]> {
  try {
    const params = new URLSearchParams();
    if (channelId) params.append('channel_id', channelId);
    if (status) params.append('status', status);
    
    const response = await apiClient.get<Conversation[]>(`/conversations?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
}

/**
 * Get messages for a conversation
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
  try {
    const response = await apiClient.get<Message[]>(`/conversations/${conversationId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(request: SendMessageRequest): Promise<Message> {
  try {
    const response = await apiClient.post<Message>('/messages/send', request);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

/**
 * Transfer conversation to human agent
 */
export async function transferToHuman(conversationId: string, agentId?: string): Promise<Conversation> {
  try {
    const response = await apiClient.post<Conversation>(`/conversations/${conversationId}/transfer`, { agent_id: agentId });
    return response.data;
  } catch (error) {
    console.error('Error transferring conversation:', error);
    throw error;
  }
}

/**
 * Resolve a conversation
 */
export async function resolveConversation(conversationId: string): Promise<Conversation> {
  try {
    const response = await apiClient.post<Conversation>(`/conversations/${conversationId}/resolve`, {});
    return response.data;
  } catch (error) {
    console.error('Error resolving conversation:', error);
    throw error;
  }
}

export default {
  connectChannel,
  getChannels,
  updateChannel,
  disconnectChannel,
  getConversations,
  getMessages,
  sendMessage,
  transferToHuman,
  resolveConversation
};