// src/features/omnichannel-ai-agent/services/aiAgentService.ts
import axios from 'axios';

// Define types
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ConversationContext {
  userId?: string;
  sessionId: string;
  previousMessages: Message[];
  channel: 'web' | 'whatsapp' | 'facebook' | 'telegram';
}

export interface AiResponse {
  response: string;
  suggestedActions?: string[];
  intent?: string;
  confidence?: number;
}

// Create axios instance for AI agent
const aiAgentClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_AGENT_URL || 'http://localhost:3007',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if available
aiAgentClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
aiAgentClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('AI Agent API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Send message to AI agent and get response
 */
export async function sendMessageToAgent(
  message: string,
  context: ConversationContext
): Promise<AiResponse> {
  try {
    const response = await aiAgentClient.post<AiResponse>('/api/chat', {
      message,
      context,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message to AI agent:', error);
    throw error;
  }
}

/**
 * Initialize conversation with AI agent
 */
export async function initializeConversation(
  context: ConversationContext
): Promise<AiResponse> {
  try {
    const response = await aiAgentClient.post<AiResponse>('/api/chat/init', {
      context,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error initializing conversation:', error);
    throw error;
  }
}

/**
 * Get conversation analytics
 */
export async function getConversationAnalytics(sessionId: string) {
  try {
    const response = await aiAgentClient.get(`/api/analytics/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

/**
 * Configure AI agent for specific business
 */
export async function configureAgent(config: {
  businessId: string;
  tone: string;
  language: string;
  greeting: string;
  knowledgeBase?: string[];
}) {
  try {
    const response = await aiAgentClient.post('/api/config', config);
    return response.data;
  } catch (error) {
    console.error('Error configuring agent:', error);
    throw error;
  }
}

export default {
  sendMessageToAgent,
  initializeConversation,
  getConversationAnalytics,
  configureAgent,
};