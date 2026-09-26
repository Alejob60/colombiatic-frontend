// src/app/dashboard/web-builder/ai-sales/behavior-analysis.tsx
"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface InteractionData {
  hour: string;
  interactions: number;
}

interface ResponseData {
  type: string;
  percentage: number;
  color: string;
}

export default function BehaviorAnalysis() {
  const { t } = useTranslations();
  const [interactionData, setInteractionData] = useState<InteractionData[]>([]);
  const [responseData, setResponseData] = useState<ResponseData[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const hourlyData: InteractionData[] = [
      { hour: '00:00', interactions: 4 },
      { hour: '04:00', interactions: 2 },
      { hour: '08:00', interactions: 8 },
      { hour: '12:00', interactions: 15 },
      { hour: '16:00', interactions: 12 },
      { hour: '20:00', interactions: 18 },
    ];
    
    const responseTypes: ResponseData[] = [
      { type: t('webBuilder.aiSales.analysis.responses.predefined'), percentage: 65, color: '#3b82f6' },
      { type: t('webBuilder.aiSales.analysis.responses.generated'), percentage: 25, color: '#10b981' },
      { type: t('webBuilder.aiSales.analysis.responses.followUp'), percentage: 10, color: '#f59e0b' },
    ];
    
    setInteractionData(hourlyData);
    setResponseData(responseTypes);
  }, [t]);

  return (
    <div className="bg-gray-800 rounded-lg p-5">
      <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.aiSales.analysis.title')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interaction Chart */}
        <div>
          <h4 className="text-md font-medium text-gray-300 mb-3">{t('webBuilder.aiSales.analysis.interactions.title')}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="interactions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-400 mt-2">{t('webBuilder.aiSales.analysis.interactions.description')}</p>
        </div>
        
        {/* Response Types */}
        <div>
          <h4 className="text-md font-medium text-gray-300 mb-3">{t('webBuilder.aiSales.analysis.responses.title')}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={responseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  label={(labelProps) => {
                    const entry = labelProps.payload as ResponseData;
                    return `${entry.type}: ${entry.percentage}%`;
                  }}
                >
                  {responseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  formatter={(value) => [`${value}%`, t('webBuilder.aiSales.analysis.responses.percentage')]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {responseData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-300">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-700">
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-sm text-gray-400">{t('webBuilder.aiSales.analysis.metrics.conversations')}</p>
        </div>
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">86%</p>
          <p className="text-sm text-gray-400">{t('webBuilder.aiSales.analysis.metrics.resolution')}</p>
        </div>
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">3.2</p>
          <p className="text-sm text-gray-400">{t('webBuilder.aiSales.analysis.metrics.responseTime')}</p>
        </div>
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">4.8</p>
          <p className="text-sm text-gray-400">{t('webBuilder.aiSales.analysis.metrics.satisfaction')}</p>
        </div>
      </div>
    </div>
  );
}