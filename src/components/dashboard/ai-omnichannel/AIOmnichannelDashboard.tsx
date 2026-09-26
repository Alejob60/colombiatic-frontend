// src/components/dashboard/ai-omnichannel/AIOmnichannelDashboard.tsx
"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, Clock, CheckCircle, BarChart3, Users, Zap, Bell } from 'lucide-react';
import ChatSessionsPanel, { Session } from './ChatSessionsPanel';
import AIMetricsChart from './AIMetricsChart';
import ConversionMetrics from './ConversionMetrics';

// Mock data for demonstration
const mockMetrics = {
  totalConversations: 1242,
  activeChats: 24,
  responseTime: 42,
  conversionRate: 18.5,
  successfulConversations: 89,
  channels: [
    { name: 'Web', count: 420, color: 'bg-blue-500' },
    { name: 'WhatsApp', count: 380, color: 'bg-green-500' },
    { name: 'Facebook', count: 210, color: 'bg-blue-700' },
    { name: 'Instagram', count: 150, color: 'bg-pink-500' },
    { name: 'Email', count: 82, color: 'bg-gray-500' }
  ]
};

const mockSessions: Session[] = [
  {
    id: 1,
    customer: "María López",
    channel: "Web",
    status: "active",
    lastMessage: "¿Tienen disponible el producto en color negro?",
    timestamp: "2025-11-23T10:30:00Z",
    intent: "product_inquiry"
  },
  {
    id: 2,
    customer: "Carlos Rodríguez",
    channel: "WhatsApp",
    status: "pending",
    lastMessage: "Gracias por la información",
    timestamp: "2025-11-23T10:25:00Z",
    intent: "purchase"
  },
  {
    id: 3,
    customer: "Ana Martínez",
    channel: "Facebook",
    status: "resolved",
    lastMessage: "Perfecto, lo compraré",
    timestamp: "2025-11-23T10:15:00Z",
    intent: "purchase"
  },
  {
    id: 4,
    customer: "Jorge Pérez",
    channel: "Instagram",
    status: "active",
    lastMessage: "¿Cuánto tiempo tarda el envío?",
    timestamp: "2025-11-23T10:10:00Z",
    intent: "shipping_inquiry"
  }
];

export default function AIOmnichannelDashboard() {
  const [metrics, setMetrics] = useState(mockMetrics);
  const [sessions, setSessions] = useState(mockSessions);
  const [loading, setLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real implementation, this would fetch real-time data from the backend
      setMetrics(prev => ({
        ...prev,
        activeChats: Math.max(0, prev.activeChats + Math.floor(Math.random() * 3) - 1),
        totalConversations: prev.totalConversations + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
        <h1 className="text-2xl font-bold text-white">IA Omnicanal</h1>
        <p className="text-gray-400 mt-1">Panel de control de chats y atención al cliente impulsada por IA</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Conversaciones Totales</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.totalConversations.toLocaleString()}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Chats Activos</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.activeChats}</p>
            </div>
            <Zap className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tiempo de Respuesta</p>
              <p className="text-2xl font-bold text-white mt-1">{metrics.responseTime}s</p>
            </div>
            <Clock className="h-8 w-8 text-green-400" />
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
      </div>

      {/* Charts and Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metrics Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Métricas de Conversación por Canal</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <AIMetricsChart channels={metrics.channels} />
        </div>

        {/* Conversion Metrics */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Métricas de Conversión</h2>
            <CheckCircle className="h-5 w-5 text-gray-400" />
          </div>
          <ConversionMetrics 
            successfulConversations={metrics.successfulConversations}
            totalConversations={metrics.totalConversations}
          />
        </div>
      </div>

      {/* Chat Sessions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Sesiones de Chat Recientes</h2>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-400">Actualizado hace 2 min</span>
          </div>
        </div>
        <ChatSessionsPanel sessions={sessions} loading={loading} />
      </div>
    </div>
  );
}