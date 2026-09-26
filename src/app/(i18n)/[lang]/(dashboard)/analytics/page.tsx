// src/app/(dashboard)/analytics/page.tsx
// Comprehensive analytics dashboard

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import useDashboardAnalytics from '@/hooks/useDashboardAnalytics';
import LearningInsightsCard from '@/components/dashboard/LearningInsightsCard';
import RecommendationsCard from '@/components/dashboard/RecommendationsCard';
import { BarChart3, MessageSquare, DollarSign, Smile, Clock, RefreshCw, AlertCircle, User } from 'lucide-react';

const AnalyticsDashboard = () => {
  const { 
    summary, 
    conversations, 
    sales, 
    insights, 
    recommendations, 
    loading, 
    error, 
    refreshData 
  } = useDashboardAnalytics();
  const [timeframe, setTimeframe] = useState('7d');

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <button
          onClick={refreshData}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          {summary && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <User className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">Total Leads</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(summary.total_leads)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">Total Sales</p>
                    <p className="text-2xl font-bold text-white">${formatNumber(summary.total_sales)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">Avg Response Time</p>
                    <p className="text-2xl font-bold text-white">{summary.avg_response_time.toFixed(1)}s</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Smile className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">Satisfaction</p>
                    <p className="text-2xl font-bold text-white">{summary.customer_satisfaction.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Tables as替代方案 to Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {conversations && conversations.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">Recent Conversations</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Channel</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Messages</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sentiment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {conversations.slice(0, 5).map((conv) => (
                        <tr key={conv.id}>
                          <td className="px-4 py-3 text-sm text-white capitalize">{conv.channel}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{conv.message_count}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              conv.sentiment_score > 0.5 
                                ? 'bg-green-500/20 text-green-400' 
                                : conv.sentiment_score > 0 
                                  ? 'bg-yellow-500/20 text-yellow-400' 
                                  : 'bg-red-500/20 text-red-400'
                            }`}>
                              {conv.sentiment_score > 0 ? '+' : ''}{conv.sentiment_score.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {sales && sales.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">Sales Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Channel</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Conversions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {sales.slice(0, 5).map((sale) => (
                        <tr key={sale.id}>
                          <td className="px-4 py-3 text-sm text-white capitalize">{sale.channel}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">${formatNumber(sale.revenue)}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{sale.conversions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Insights and Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights && insights.length > 0 && (
              <LearningInsightsCard insights={insights} />
            )}
            {recommendations && recommendations.length > 0 && (
              <RecommendationsCard recommendations={recommendations} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(AnalyticsDashboard);