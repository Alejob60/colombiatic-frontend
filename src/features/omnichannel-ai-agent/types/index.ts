// src/features/omnichannel-ai-agent/types/index.ts

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

export interface ChatConfig {
  primaryColor: string;
  greetingMessage: string;
  botName: string;
  logoUrl?: string;
  tone: 'professional' | 'friendly' | 'casual';
  language: 'es' | 'en';
}

export interface AnalyticsData {
  sessionId: string;
  messageCount: number;
  userMessages: number;
  aiMessages: number;
  conversationDuration: number;
  sentimentScore?: number;
  intentsDetected: string[];
  conversionEvents: string[];
}