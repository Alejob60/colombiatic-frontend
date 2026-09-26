// src/components/dashboard/ux-intelligence/UXIntelligenceDashboard.tsx
"use client";

import { useState, useEffect } from 'react';
import { Eye, Clock, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Users, Zap } from 'lucide-react';
import UserBehaviorChart from './UserBehaviorChart';
import PagePerformanceMetrics from './PagePerformanceMetrics';
import FrictionPoints, { FrictionPoint } from './FrictionPoints';

// Mock data for demonstration
const mockMetrics = {
  avgTimeOnSite: 324,
  bounceRate: 32.5,
  pagesPerSession: 4.2,
  conversionRate: 18.5,
  userSatisfaction: 4.2
};

const mockBehaviorData = [
  { page: 'Home', visits: 1240, avgTime: 45, bounceRate: 28 },
  { page: 'Productos', visits: 890, avgTime: 120, bounceRate: 15 },
  { page: 'Carrito', visits: 320, avgTime: 85, bounceRate: 42 },
  { page: 'Checkout', visits: 180, avgTime: 150, bounceRate: 65 },
  { page: 'Confirmación', visits: 142, avgTime: 60, bounceRate: 10 }
];

const mockFrictionPoints: FrictionPoint[] = [
  {
    id: 1,
    page: 'Checkout',
    issue: 'Formulario de pago complejo',
    severity: 'high',
    impact: '65% de usuarios abandonan en esta página',
    recommendation: 'Simplificar el formulario y agregar más opciones de pago'
  },
  {
    id: 2,
    page: 'Carrito',
    issue: 'Tiempo de carga lento',
    severity: 'medium',
    impact: '42% de usuarios abandonan antes de completar la compra',
    recommendation: 'Optimizar imágenes y recursos de la página'
  },
  {
    id: 3,
    page: 'Productos',
    issue: 'Falta de información clara',
    severity: 'low',
    impact: '22% de usuarios no agregan productos al carrito',
    recommendation: 'Agregar más detalles y reseñas de productos'
  }
];

export default function UXIntelligenceDashboard() {
  const [metrics, setMetrics] = useState(mockMetrics);
  const [behaviorData, setBehaviorData] = useState(mockBehaviorData);
  const [frictionPoints, setFrictionPoints] = useState(mockFrictionPoints);
  const [loading, setLoading] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Inteligencia UX</h1>
        <p className="text-gray-400 mt-1">Análisis de experiencia del usuario y puntos de fricción</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-white mt-1">{Math.floor(metrics.avgTimeOnSite / 60)}m {metrics.avgTimeOnSite % 60}s</p>
            </div>
            <Clock className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tasa de Rebote</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.bounceRate}%</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Páginas por Sesión</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.pagesPerSession}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tasa de Conversión</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.conversionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Satisfacción</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.userSatisfaction}/5</p>
            </div>
            <CheckCircle className="h-8 w-8 text-pink-400" />
          </div>
        </div>
      </div>

      {/* Charts and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Behavior Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Comportamiento del Usuario</h2>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <UserBehaviorChart data={behaviorData} />
        </div>

        {/* Page Performance Metrics */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Rendimiento por Página</h2>
            <Zap className="h-5 w-5 text-gray-400" />
          </div>
          <PagePerformanceMetrics data={behaviorData} />
        </div>
      </div>

      {/* Friction Points */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Puntos de Fricción Detectados</h2>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        <FrictionPoints points={frictionPoints} loading={loading} />
      </div>
    </div>
  );
}