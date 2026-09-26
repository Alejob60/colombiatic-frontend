// src/components/dashboard/ConversationMetricsChart.tsx
// Conversation metrics visualization component

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ConversationMetric } from '@/services/misybot/dashboardServiceV2';

interface ConversationMetricsChartProps {
  data: ConversationMetric[];
}

const ConversationMetricsChart: React.FC<ConversationMetricsChartProps> = ({ data }) => {
  // Transform data for charting
  const chartData = data.map(item => ({
    channel: item.channel,
    messages: item.message_count,
    sentiment: item.sentiment_score,
    intent: item.intent
  }));

  // Color based on sentiment
  const getColor = (sentiment: number) => {
    if (sentiment > 0.5) return '#10B981'; // green
    if (sentiment > 0) return '#FBBF24';   // yellow
    return '#EF4444';                      // red
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Conversation Metrics</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="channel" 
              stroke="#9CA3AF" 
              tick={{ fill: '#D1D5DB' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              tick={{ fill: '#D1D5DB' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                borderColor: '#374151',
                color: '#F9FAFB'
              }}
              itemStyle={{ color: '#F9FAFB' }}
              labelStyle={{ color: '#F9FAFB', fontWeight: 'bold' }}
            />
            <Bar dataKey="messages" name="Messages">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.sentiment)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm text-gray-300">Positive Sentiment</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-sm text-gray-300">Neutral Sentiment</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-300">Negative Sentiment</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationMetricsChart;