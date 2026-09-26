// src/components/dashboard/ux-intelligence/PagePerformanceMetrics.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BehaviorData {
  page: string;
  visits: number;
  avgTime: number;
  bounceRate: number;
}

interface PagePerformanceMetricsProps {
  data: BehaviorData[];
}

export default function PagePerformanceMetrics({ data }: PagePerformanceMetricsProps) {
  // Find the page with the highest bounce rate for highlighting
  const maxBounceRate = Math.max(...data.map(item => item.bounceRate));
  
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
          <XAxis type="number" stroke="#9ca3af" />
          <YAxis 
            dataKey="page" 
            type="category" 
            stroke="#9ca3af" 
            width={90}
            tick={{ fontSize: 12 }}
          />
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
          <Bar dataKey="bounceRate" name="Tasa de rebote (%)">
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.bounceRate === maxBounceRate ? '#f59e0b' : '#3b82f6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}