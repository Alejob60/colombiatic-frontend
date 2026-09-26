// src/components/dashboard/LearningInsightsCard.tsx
// Learning insights display component

import React from 'react';
import { LearningInsight } from '@/services/misybot/dashboardService';
import { Lightbulb, TrendingUp, Users, MessageSquare } from 'lucide-react';

interface LearningInsightsCardProps {
  insights: LearningInsight[];
}

const LearningInsightsCard: React.FC<LearningInsightsCardProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'conversation_pattern':
        return <MessageSquare className="h-5 w-5" />;
      case 'sales_tactic':
        return <TrendingUp className="h-5 w-5" />;
      case 'customer_behavior':
        return <Users className="h-5 w-5" />;
      default:
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getInsightColor = (score: number) => {
    if (score > 0.8) return 'bg-green-500/20 text-green-400';
    if (score > 0.5) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-blue-500/20 text-blue-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Learning Insights</h3>
      <div className="space-y-4">
        {insights.slice(0, 3).map((insight) => (
          <div 
            key={insight.id} 
            className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start">
              <div className={`rounded-full p-2 ${getInsightColor(insight.impact_score)}`}>
                {getInsightIcon(insight.insight_type)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-white capitalize">
                    {insight.insight_type.replace('_', ' ')}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getInsightColor(insight.impact_score)}`}>
                    {Math.round(insight.impact_score * 100)}% impact
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                  {insight.description}
                </p>
                {insight.related_conversations.length > 0 && (
                  <div className="mt-2 flex items-center text-xs text-gray-400">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>
                      Based on {insight.related_conversations.length} conversations
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningInsightsCard;