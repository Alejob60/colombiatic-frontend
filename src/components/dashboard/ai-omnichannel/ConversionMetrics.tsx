// src/components/dashboard/ai-omnichannel/ConversionMetrics.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ConversionMetricsProps {
  successfulConversations: number;
  totalConversations: number;
}

export default function ConversionMetrics({ successfulConversations, totalConversations }: ConversionMetricsProps) {
  const conversionRate = totalConversations > 0 
    ? Math.round((successfulConversations / totalConversations) * 100)
    : 0;

  const data = [
    { name: 'Conversaciones Exitosas', value: successfulConversations },
    { name: 'Otras Conversaciones', value: totalConversations - successfulConversations }
  ];

  const COLORS = ['#10b981', '#374151'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: '#f9fafb'
            }}
            formatter={(value) => [value, 'Conversaciones']}
          />
          <Legend 
            layout="vertical" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-white">{conversionRate}%</p>
        <p className="text-sm text-gray-400">Tasa de conversión</p>
      </div>
    </div>
  );
}