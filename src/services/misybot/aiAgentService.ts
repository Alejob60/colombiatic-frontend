// src/services/misybot/aiAgentService.ts
// AI Agent service for Misybot integration

import axios from 'axios';
import * as metaAgentService from '@/services/metaAgentService';

// Create axios instance for Misybot ColombiaTIC agent endpoints
const agentApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net'}/colombiatic/agent`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for Misybot IA Orchestrator
const orchestratorApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle errors
agentApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('AI Agent API Error:', error);
    return Promise.reject(error);
  }
);

// Handle orchestrator errors
orchestratorApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('IA Orchestrator API Error:', error);
    return Promise.reject(error);
  }
);

// Types for AI agent
export interface CreateAgentRequest {
  site_url: string;
  industry: string;
  language: string;
  tone: string;
  connect_channels: ('web' | 'whatsapp' | 'facebook' | 'instagram' | 'telegram')[];
  organization_id: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  site_url: string;
  industry: string;
  language: string;
  tone: string;
  connected_channels: ('web' | 'whatsapp' | 'facebook' | 'instagram' | 'telegram')[];
  webhook_urls: {
    facebook?: string;
    whatsapp?: string;
    web?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AgentResponse {
  success: boolean;
  agent: AgentConfig;
  message?: string;
}

export interface WebhookConfig {
  id: string;
  channel: 'facebook' | 'whatsapp' | 'web';
  webhook_url: string;
  verification_token?: string;
  created_at: string;
}

/**
 * Create a new AI agent (using Meta-Agent for processing)
 */
export async function createAgent(agentData: CreateAgentRequest): Promise<AgentResponse> {
  try {
    // First create the agent in Misybot
    const response = await agentApiClient.post<AgentResponse>('/create', agentData);
    
    // Then create the agent in Meta-Agent for enhanced processing
    try {
      await metaAgentService.createMetaAgent({
        ...agentData,
        model_type: 'colombiatic_default',
        processing_mode: 'realtime',
        integration_type: 'colombiatic'
      });
    } catch (metaError) {
      console.warn('Meta-Agent creation failed, continuing with Misybot only:', metaError);
    }
    
    return response.data;
  } catch (error) {
    console.error('Create agent error:', error);
    throw error;
  }
}

/**
 * Get agent configuration
 */
export async function getAgentConfig(agentId: string): Promise<AgentConfig> {
  try {
    const response = await agentApiClient.get<AgentConfig>(`/${agentId}`);
    return response.data;
  } catch (error) {
    console.error('Get agent config error:', error);
    throw error;
  }
}

/**
 * Update agent configuration
 */
export async function updateAgentConfig(agentId: string, config: Partial<AgentConfig>): Promise<AgentResponse> {
  try {
    const response = await agentApiClient.put<AgentResponse>(`/${agentId}`, config);
    
    // Also update in Meta-Agent if it exists
    try {
      await metaAgentService.updateMetaAgentConfig(agentId, config as any);
    } catch (metaError) {
      console.warn('Meta-Agent update failed:', metaError);
    }
    
    return response.data;
  } catch (error) {
    console.error('Update agent config error:', error);
    throw error;
  }
}

/**
 * Configure webhooks for different channels
 */
export async function configureWebhooks(agentId: string, webhooks: WebhookConfig[]): Promise<{ success: boolean; message: string }> {
  try {
    const response = await agentApiClient.post<{ success: boolean; message: string }>(`/${agentId}/webhooks`, { webhooks });
    
    // Also configure in Meta-Agent
    try {
      await metaAgentService.configureMetaWebhooks(agentId, webhooks);
    } catch (metaError) {
      console.warn('Meta-Agent webhook configuration failed:', metaError);
    }
    
    return response.data;
  } catch (error) {
    console.error('Configure webhooks error:', error);
    throw error;
  }
}

/**
 * Get webhook configuration
 */
export async function getWebhookConfig(agentId: string): Promise<WebhookConfig[]> {
  try {
    const response = await agentApiClient.get<WebhookConfig[]>(`/${agentId}/webhooks`);
    return response.data;
  } catch (error) {
    console.error('Get webhook config error:', error);
    throw error;
  }
}

/**
 * Generate universal chat widget script
 */
export function generateChatWidgetScript(clientId: string): string {
  return `<script src="https://cdn.colombiatic.ai/widget.js" data-client="${clientId}" async></script>`;
}

/**
 * Process message through the integrated system (Meta-Agent -> Misybot)
 */
export async function processMessage(agentId: string, message: string, context: any): Promise<any> {
  try {
    // Try to process through Meta-Agent first
    try {
      return await metaAgentService.processMessageThroughMetaAgent(agentId, message, context);
    } catch (metaError) {
      console.warn('Meta-Agent processing failed, falling back to direct Misybot:', metaError);
      // Fallback to direct Misybot processing
      const response = await agentApiClient.post(`/process`, { message, context });
      return response.data;
    }
  } catch (error) {
    console.error('Process message error:', error);
    throw error;
  }
}

/**
 * Connect directly to Misybot's IA Orchestrator
 */
export async function connectToOrchestrator(agentId: string, config: any): Promise<{ success: boolean; message: string }> {
  try {
    const response = await orchestratorApiClient.post(`/api/orchestrator/connect`, {
      agentId,
      config
    });
    return response.data;
  } catch (error) {
    console.error('Connect to orchestrator error:', error);
    throw error;
  }
}

/**
 * Send message to IA Orchestrator for processing
 */
export async function sendMessageToOrchestrator(
  agentId: string, 
  message: string, 
  context: any
): Promise<any> {
  try {
    const response = await orchestratorApiClient.post(`/api/orchestrator/process`, {
      agentId,
      message,
      context
    });
    return response.data;
  } catch (error) {
    console.error('Send message to orchestrator error:', error);
    throw error;
  }
}

/**
 * Get analytics from IA Orchestrator
 */
export async function getOrchestratorAnalytics(agentId: string, timeframe: string): Promise<any> {
  try {
    const response = await orchestratorApiClient.get(`/api/orchestrator/analytics/${agentId}?timeframe=${timeframe}`);
    return response.data;
  } catch (error) {
    console.error('Get orchestrator analytics error:', error);
    throw error;
  }
}

export default {
  createAgent,
  getAgentConfig,
  updateAgentConfig,
  configureWebhooks,
  getWebhookConfig,
  generateChatWidgetScript,
  processMessage,
  connectToOrchestrator,
  sendMessageToOrchestrator,
  getOrchestratorAnalytics,
};