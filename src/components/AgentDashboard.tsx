// src/components/AgentDashboard.tsx
import React, { useState } from 'react';
import agentService from '@/services/agentService';

const AgentDashboard: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrendScan = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.scanTrends({
        topic: 'technology',
        timeframe: 'week',
      });
      setResult(data);
    } catch (error: any) {
      console.error('Failed to scan trends:', error);
      setError(error.message || 'Failed to scan trends');
    } finally {
      setLoading(false);
    }
  };

  const handleFAQResponse = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agentService.answerFAQ('What are the benefits of using AI agents?');
      setResult(data);
    } catch (error: any) {
      console.error('Failed to get FAQ response:', error);
      setError(error.message || 'Failed to get FAQ response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Meta-Agent Dashboard</h2>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={handleTrendScan} 
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Scanning...' : 'Scan Trends'}
        </button>
        
        <button 
          onClick={handleFAQResponse} 
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Ask FAQ'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="p-4 bg-gray-700 rounded">
          <h3 className="text-lg font-semibold text-white mb-2">Results:</h3>
          <pre className="text-sm text-gray-200 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-400">
        <p>Make sure the Meta-Agent service is running on http://localhost:3001</p>
        <p>Available agents: trend-scanner, video-scriptor, faq-responder, campaign, front-desk</p>
      </div>
    </div>
  );
};

export default AgentDashboard;