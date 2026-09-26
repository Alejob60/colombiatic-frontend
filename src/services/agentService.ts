// src/services/agentService.ts
// Specific services for different agents

import apiService from './api';

// Define the message data type
interface MessageData {
  message: string;
  context?: {
    sessionId?: string;
    language?: string;
    userId?: string;
    tenantId?: string;
    [key: string]: any;
  };
}

class AgentService {
  // Trend Scanner Agent
  async scanTrends(criteria: any) {
    return apiService.executeAgent('trend-scanner', criteria);
  }

  // Video Scriptor Agent
  async generateVideoScript(contentIdea: any) {
    return apiService.executeAgent('video-scriptor', contentIdea);
  }

  // FAQ Responder Agent
  async answerFAQ(question: string) {
    return apiService.executeAgent('faq-responder', { question });
  }

  // Campaign Manager Agent
  async launchCampaign(campaignData: any) {
    return apiService.executeAgent('campaign', campaignData);
  }

  // Front Desk Agent (for chat functionality) - using the correct V2 endpoint
  async sendMessageToChatAgent(messageData: MessageData) {
    return apiService.executeAgent('front-desk', messageData);
  }

  // Front Desk Agent with tenant context
  async sendMessageToChatAgentWithTenant(messageData: MessageData, tenantId: string) {
    return apiService.executeAgentWithTenant('front-desk', messageData, tenantId);
  }
}

export default new AgentService();