// src/components/dashboard/ux-intelligence/UserBehaviorChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BehaviorData {
  page: string;
  visits: number;
  avgTime: number;
  bounceRate: number;
}

interface UserBehaviorChartProps {
  data: BehaviorData[];
}

export default function UserBehaviorChart({ data }: UserBehaviorChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="page" 
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#9ca3af" yAxisId="left" />
          <YAxis stroke="#9ca3af" yAxisId="right" orientation="right" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: '#f9fafb'
            }}
            formatter={(value, name) => {
              if (name === 'visits') return [value, 'Visitas'];
              if (name === 'avgTime') return [`${value}s`, 'Tiempo promedio'];
              if (name === 'bounceRate') return [`${value}%`, 'Tasa de rebote'];
              return [value, name];
            }}
          />
          <Legend 
            wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="visits" 
            name="Visitas" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="avgTime" 
            name="Tiempo promedio (s)" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="bounceRate" 
            name="Tasa de rebote (%)" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}