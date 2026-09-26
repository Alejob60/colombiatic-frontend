// src/components/dashboard/ai-omnichannel/AIMetricsChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Channel {
  name: string;
  count: number;
  color: string;
}

interface AIMetricsChartProps {
  channels: Channel[];
}

export default function AIMetricsChart({ channels }: AIMetricsChartProps) {
  // Convert color classes to actual colors for Recharts
  const getColor = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      'bg-blue-500': '#3b82f6',
      'bg-green-500': '#10b981',
      'bg-blue-700': '#1d4ed8',
      'bg-pink-500': '#ec4899',
      'bg-gray-500': '#6b7280'
    };
    return colorMap[colorClass] || '#6b7280';
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={channels}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: '#f9fafb'
            }}
            itemStyle={{ color: '#f9fafb' }}
            labelStyle={{ color: '#f9fafb', fontWeight: 'bold' }}
          />
          <Bar dataKey="count" name="Conversaciones">
            {channels.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.color)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}