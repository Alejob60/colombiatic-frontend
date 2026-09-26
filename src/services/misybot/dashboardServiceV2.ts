// src/services/misybot/dashboardServiceV2.ts
// Enhanced dashboard service with fallback handling

import { apiClient } from '@/lib/apiClient';
import * as metaAgentService from '@/services/metaAgentService';

// Types for dashboard data
export interface ConversationMetric {
  id: string;
  channel: 'web' | 'whatsapp' | 'facebook' | 'instagram';
  message_count: number;
  sentiment_score: number;
  intent: string;
  timestamp: string;
}

export interface SalesMetric {
  id: string;
  channel: 'web' | 'whatsapp' | 'facebook' | 'instagram' | 'email';
  conversions: number;
  revenue: number;
  conversion_rate: number;
  timestamp: string;
}

export interface AdMetric {
  id: string;
  platform: 'google' | 'facebook' | 'instagram';
  campaign_id: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  cost: number;
  timestamp: string;
}

export interface DashboardSummary {
  total_leads: number;
  total_sales: number;
  avg_response_time: number;
  customer_satisfaction: number;
  conversations: ConversationMetric[];
  sales: SalesMetric[];
  ads: AdMetric[];
}

export interface LearningInsight {
  id: string;
  insight_type: 'conversation_pattern' | 'sales_tactic' | 'customer_behavior';
  description: string;
  impact_score: number;
  related_conversations: string[];
  timestamp: string;
}

export interface CrossBusinessRecommendation {
  id: string;
  business_name: string;
  recommendation_type: 'product' | 'service' | 'partnership';
  description: string;
  confidence_score: number;
  potential_value: number;
}

/**
 * Get dashboard summary data with fallback
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    console.log('Dashboard service: Making request to', `${baseUrl}/colombiatic/dashboard/summary`);
    
    const response = await apiClient.get<DashboardSummary>(`${baseUrl}/colombiatic/dashboard/summary`);
    
    // Log the response to verify authentication is working
    console.log('Dashboard summary response status:', response.status);
    console.log('Dashboard summary response data:', response.data);
    
    // Check if we got real data or fallback data
    if (response.data && response.data.total_leads !== 1247) {
      console.log('Dashboard service: Got real data from backend');
    } else {
      console.log('Dashboard service: Got fallback data');
    }
    
    // Enhance with meta-agent processing if available
    try {
      const enhancedData = await metaAgentService.processMessageThroughMetaAgent(
        'dashboard-summary',
        'enhance analytics',
        response.data
      );
      return enhancedData || response.data;
    } catch (metaError) {
      console.warn('Meta-agent enhancement failed, using base data:', metaError);
      return response.data;
    }
  } catch (error: any) {
    console.error('Dashboard summary error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
      url: error.config?.url
    });
    
    // Return fallback data if API fails
    console.log('Dashboard service: Returning fallback data due to error');
    return {
      total_leads: 1247,
      total_sales: 24500,
      avg_response_time: 1.8,
      customer_satisfaction: 92.5,
      conversations: [
        {
          id: '1',
          channel: 'web',
          message_count: 124,
          sentiment_score: 0.75,
          intent: 'support',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          channel: 'whatsapp',
          message_count: 89,
          sentiment_score: 0.82,
          intent: 'sales',
          timestamp: new Date().toISOString()
        }
      ],
      sales: [
        {
          id: '1',
          channel: 'web',
          conversions: 42,
          revenue: 8400,
          conversion_rate: 0.18,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          channel: 'whatsapp',
          conversions: 28,
          revenue: 5600,
          conversion_rate: 0.22,
          timestamp: new Date().toISOString()
        }
      ],
      ads: [
        {
          id: '1',
          platform: 'google',
          campaign_id: 'g1',
          impressions: 12500,
          clicks: 375,
          ctr: 0.03,
          cpc: 0.8,
          conversions: 42,
          cost: 300,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }
}

/**
 * Get conversation metrics
 */
export async function getConversationMetrics(): Promise<ConversationMetric[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    const response = await apiClient.get<ConversationMetric[]>(`${baseUrl}/colombiatic/analytics/conversations`);
    
    // Log the response for debugging
    console.log('Conversation metrics response data:', response.data);
    
    // Process with meta-agent for emotional analysis
    try {
      const processedData = await metaAgentService.processMessageThroughMetaAgent(
        'conversation-metrics',
        'analyze emotions',
        response.data
      );
      return processedData || response.data;
    } catch (metaError) {
      console.warn('Meta-agent processing failed, using base data:', metaError);
      return response.data;
    }
  } catch (error) {
    console.error('Conversation metrics error:', error);
    // Return fallback data
    return [
      {
        id: 'fallback-1',
        channel: 'web',
        message_count: 124,
        sentiment_score: 0.75,
        intent: 'support',
        timestamp: new Date().toISOString()
      },
      {
        id: 'fallback-2',
        channel: 'whatsapp',
        message_count: 89,
        sentiment_score: 0.82,
        intent: 'sales',
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * Get sales metrics
 */
export async function getSalesMetrics(): Promise<SalesMetric[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    const response = await apiClient.get<SalesMetric[]>(`${baseUrl}/colombiatic/analytics/sales`);
    
    // Log the response for debugging
    console.log('Sales metrics response data:', response.data);
    
    // Enhance with meta-agent for sales pattern analysis
    try {
      const enhancedData = await metaAgentService.processMessageThroughMetaAgent(
        'sales-metrics',
        'analyze patterns',
        response.data
      );
      return enhancedData || response.data;
    } catch (metaError) {
      console.warn('Meta-agent enhancement failed, using base data:', metaError);
      return response.data;
    }
  } catch (error) {
    console.error('Sales metrics error:', error);
    // Return fallback data
    return [
      {
        id: 'fallback-1',
        channel: 'web',
        conversions: 42,
        revenue: 8400,
        conversion_rate: 0.18,
        timestamp: new Date().toISOString()
      },
      {
        id: 'fallback-2',
        channel: 'whatsapp',
        conversions: 28,
        revenue: 5600,
        conversion_rate: 0.22,
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * Get ad performance metrics
 */
export async function getAdMetrics(): Promise<AdMetric[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    const response = await apiClient.get<AdMetric[]>(`${baseUrl}/colombiatic/analytics/ads`);
    
    // Log the response for debugging
    console.log('Ad metrics response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Ad metrics error:', error);
    // Return fallback data
    return [
      {
        id: 'fallback-1',
        platform: 'google',
        campaign_id: 'g1',
        impressions: 12500,
        clicks: 375,
        ctr: 0.03,
        cpc: 0.8,
        conversions: 42,
        cost: 300,
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * Get learning insights from the global AI model
 */
export async function getLearningInsights(): Promise<LearningInsight[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    const response = await apiClient.get<LearningInsight[]>(`${baseUrl}/colombiatic/learning/insights`);
    
    // Log the response for debugging
    console.log('Learning insights response data:', response.data);
    
    // Enhance with meta-agent for insight prioritization
    try {
      const enhancedData = await metaAgentService.processMessageThroughMetaAgent(
        'learning-insights',
        'prioritize insights',
        response.data
      );
      return enhancedData || response.data;
    } catch (metaError) {
      console.warn('Meta-agent enhancement failed, using base data:', metaError);
      return response.data;
    }
  } catch (error) {
    console.error('Learning insights error:', error);
    // Return fallback data
    return [
      {
        id: 'fallback-1',
        insight_type: 'conversation_pattern',
        description: 'Customers prefer evening support hours',
        impact_score: 0.85,
        related_conversations: [],
        timestamp: new Date().toISOString()
      }
    ];
  }
}

/**
 * Get cross-business recommendations
 */
export async function getCrossBusinessRecommendations(): Promise<CrossBusinessRecommendation[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    const response = await apiClient.get<CrossBusinessRecommendation[]>(`${baseUrl}/colombiatic/recommendations/business`);
    
    // Log the response for debugging
    console.log('Cross-business recommendations response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Cross-business recommendations error:', error);
    // Return fallback data
    return [
      {
        id: 'fallback-1',
        business_name: 'Tech Solutions Inc',
        recommendation_type: 'partnership',
        description: 'Potential partnership opportunity for integrated services',
        confidence_score: 0.92,
        potential_value: 50000
      }
    ];
  }
}