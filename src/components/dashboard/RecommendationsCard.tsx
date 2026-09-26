// src/components/dashboard/RecommendationsCard.tsx
// Cross-business recommendations component

import React from 'react';
import { CrossBusinessRecommendation } from '@/services/misybot/dashboardServiceV2';
import { TrendingUp, ShoppingCart, Users, Handshake } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: CrossBusinessRecommendation[];
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations }) => {
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <ShoppingCart className="h-5 w-5" />;
      case 'service':
        return <Users className="h-5 w-5" />;
      case 'partnership':
        return <Handshake className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getRecommendationColor = (score: number) => {
    if (score > 0.8) return 'bg-green-500/20 text-green-400';
    if (score > 0.5) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-blue-500/20 text-blue-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Cross-Business Recommendations</h3>
      <div className="space-y-4">
        {recommendations.slice(0, 3).map((rec) => (
          <div 
            key={rec.id} 
            className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start">
              <div className={`rounded-full p-2 ${getRecommendationColor(rec.confidence_score)}`}>
                {getRecommendationIcon(rec.recommendation_type)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-white">
                    {rec.business_name}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRecommendationColor(rec.confidence_score)}`}>
                    {Math.round(rec.confidence_score * 100)}% confidence
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400 capitalize">
                  {rec.recommendation_type}
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  {rec.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-gray-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>
                    Potential value: ${rec.potential_value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsCard;