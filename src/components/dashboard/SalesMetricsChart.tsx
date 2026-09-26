// src/components/dashboard/SalesMetricsChart.tsx
// Sales metrics visualization component

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SalesMetric } from '@/services/misybot/dashboardService';

interface SalesMetricsChartProps {
  data: SalesMetric[];
}

const SalesMetricsChart: React.FC<SalesMetricsChartProps> = ({ data }) => {
  // Transform data for charting
  const chartData = data.map(item => ({
    channel: item.channel,
    revenue: item.revenue,
    conversions: item.conversions,
    conversionRate: (item.conversion_rate * 100).toFixed(2),
    date: new Date(item.timestamp).toLocaleDateString()
  }));

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Sales Performance</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue ($)" 
              stroke="#3B82F6" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="conversions" 
              name="Conversions" 
              stroke="#10B981" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesMetricsChart;