// src/components/dashboard/ux-intelligence/FrictionPoints.tsx
import { AlertTriangle, CheckCircle } from 'lucide-react';

export interface FrictionPoint {
  id: number;
  page: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  recommendation: string;
}

interface FrictionPointsProps {
  points: FrictionPoint[];
  loading: boolean;
}

export default function FrictionPoints({ points, loading }: FrictionPointsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900 text-red-300';
      case 'medium':
        return 'bg-yellow-900 text-yellow-300';
      case 'low':
        return 'bg-green-900 text-green-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'Desconocida';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 bg-gray-750 rounded-lg">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {points.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <CheckCircle className="h-12 w-12 mx-auto text-green-400" />
          <p className="mt-2">¡Excelente! No se detectaron puntos de fricción en tu sitio.</p>
        </div>
      ) : (
        points.map((point) => (
          <div key={point.id} className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-white">{point.page}</h3>
                  <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(point.severity)}`}>
                    {getSeverityText(point.severity)}
                  </span>
                </div>
                <p className="mt-2 text-gray-300">{point.issue}</p>
                <p className="mt-1 text-sm text-gray-400">{point.impact}</p>
                <div className="mt-3 p-3 bg-gray-800 rounded-md">
                  <p className="text-sm font-medium text-white">Recomendación:</p>
                  <p className="mt-1 text-sm text-gray-300">{point.recommendation}</p>
                </div>
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 ml-4" />
            </div>
          </div>
        ))
      )}
    </div>
  );
}