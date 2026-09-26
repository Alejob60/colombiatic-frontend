// src/services/testMetaAgentConnection.ts
// Test script for Meta-Agent connection

import axios from 'axios';
import * as metaAgentService from './metaAgentService';
import * as aiAgentService from './misybot/aiAgentService';

/**
 * Test Meta-Agent connectivity
 */
export async function testMetaAgentConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  try {
    const metaAgentUrl = process.env.NEXT_PUBLIC_META_AGENT_URL || 'http://localhost:3007';
    
    // Test basic connectivity
    const response = await axios.get(`${metaAgentUrl}/health`);
    
    return {
      success: true,
      message: 'Meta-Agent connection successful',
      details: response.data
    };
  } catch (error) {
    console.error('Meta-Agent connection test failed:', error);
    return {
      success: false,
      message: 'Meta-Agent connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test agent creation through Meta-Agent
 */
export async function testAgentCreation(): Promise<{ success: boolean; message: string; agent?: any }> {
  try {
    const testAgentData: aiAgentService.CreateAgentRequest = {
      site_url: 'https://test.colombiatic.ai',
      industry: 'technology',
      language: 'es',
      tone: 'professional',
      connect_channels: ['web', 'whatsapp'],
      organization_id: 'test-org-123'
    };

    const response = await metaAgentService.createMetaAgent({
      ...testAgentData,
      model_type: 'test_model',
      processing_mode: 'realtime'
    });

    return {
      success: true,
      message: 'Agent creation through Meta-Agent successful',
      agent: response
    };
  } catch (error) {
    console.error('Agent creation test failed:', error);
    return {
      success: false,
      message: 'Agent creation through Meta-Agent failed',
      agent: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test webhook configuration
 */
export async function testWebhookConfiguration(agentId: string): Promise<{ success: boolean; message: string }> {
  try {
    const testWebhooks: metaAgentService.WebhookConfig[] = [
      {
        id: 'test-webhook-1',
        channel: 'web',
        webhook_url: 'https://test.colombiatic.ai/webhook',
        verification_token: 'test-token-123',
        created_at: new Date().toISOString()
      }
    ];

    await metaAgentService.configureMetaWebhooks(agentId, testWebhooks);

    return {
      success: true,
      message: 'Webhook configuration successful'
    };
  } catch (error) {
    console.error('Webhook configuration test failed:', error);
    return {
      success: false,
      message: 'Webhook configuration failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
}

/**
 * Run all connection tests
 */
export async function runAllTests(): Promise<void> {
  console.log('🧪 Running Meta-Agent connection tests...\n');

  // Test 1: Basic connectivity
  console.log('1. Testing Meta-Agent connectivity...');
  const connectionTest = await testMetaAgentConnection();
  console.log(`   ${connectionTest.success ? '✅' : '❌'} ${connectionTest.message}`);
  if (connectionTest.details) {
    console.log(`   Details: ${JSON.stringify(connectionTest.details, null, 2)}`);
  }

  // Test 2: Agent creation
  console.log('\n2. Testing agent creation...');
  const agentTest = await testAgentCreation();
  console.log(`   ${agentTest.success ? '✅' : '❌'} ${agentTest.message}`);
  if (agentTest.agent) {
    console.log(`   Agent: ${JSON.stringify(agentTest.agent, null, 2)}`);
  }

  // Test 3: Webhook configuration (if agent creation was successful)
  if (agentTest.success && agentTest.agent?.meta_agent_config?.meta_agent_id) {
    console.log('\n3. Testing webhook configuration...');
    const webhookTest = await testWebhookConfiguration(agentTest.agent.meta_agent_config.meta_agent_id);
    console.log(`   ${webhookTest.success ? '✅' : '❌'} ${webhookTest.message}`);
  }

  console.log('\n🏁 Connection tests completed.');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  runAllTests().catch(console.error);
}

export default {
  testMetaAgentConnection,
  testAgentCreation,
  testWebhookConfiguration,
  runAllTests
};