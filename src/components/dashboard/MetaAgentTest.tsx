// src/components/dashboard/MetaAgentTest.tsx
"use client";

import { useState, useEffect } from 'react';
import * as metaAgentService from '@/services/metaAgentService';

export default function MetaAgentTest() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [agentId, setAgentId] = useState<string>('test-agent-001');

  const testCreateAgent = async () => {
    setLoading(true);
    try {
      const result = await metaAgentService.createMetaAgent({
        name: 'Test Agent',
        description: 'Test agent for dashboard integration',
        capabilities: ['chat', 'analytics'],
        model_type: 'gpt-4',
        processing_mode: 'realtime',
        config: {
          temperature: 0.7,
          max_tokens: 150
        }
      });
      
      setTestResult({
        success: true,
        action: 'create_agent',
        data: result
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        action: 'create_agent',
        error: error.message || 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const testProcessMessage = async () => {
    setLoading(true);
    try {
      const result = await metaAgentService.processMessageThroughMetaAgent(
        agentId,
        'Hello, this is a test message',
        {
          context: 'dashboard_test',
          user: 'test_user',
          timestamp: new Date().toISOString()
        }
      );
      
      setTestResult({
        success: true,
        action: 'process_message',
        data: result
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        action: 'process_message',
        error: error.message || 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  const testGetConfig = async () => {
    setLoading(true);
    try {
      const result = await metaAgentService.getMetaAgentConfig(agentId);
      
      setTestResult({
        success: true,
        action: 'get_config',
        data: result
      });
    } catch (error: any) {
      setTestResult({
        success: false,
        action: 'get_config',
        error: error.message || 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Meta Agent Service Test</h2>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Agent ID:</label>
        <input
          type="text"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={testCreateAgent}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Create Agent'}
        </button>
        <button
          onClick={testProcessMessage}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Process Message'}
        </button>
        <button
          onClick={testGetConfig}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Get Config'}
        </button>
      </div>
      
      {testResult && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-white mb-2">Test Result</h3>
          <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-auto max-h-60 text-sm">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}