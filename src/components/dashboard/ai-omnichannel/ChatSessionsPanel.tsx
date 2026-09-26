// src/components/dashboard/ai-omnichannel/ChatSessionsPanel.tsx
import { MessageCircle, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export interface Session {
  id: number;
  customer: string;
  channel: string;
  status: 'active' | 'pending' | 'resolved';
  lastMessage: string;
  timestamp: string;
  intent: string;
}

interface ChatSessionsPanelProps {
  sessions: Session[];
  loading: boolean;
}

export default function ChatSessionsPanel({ sessions, loading }: ChatSessionsPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <MessageCircle className="h-4 w-4 text-green-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      case 'resolved':
        return 'Resuelto';
      default:
        return 'Desconocido';
    }
  };

  const getIntentBadge = (intent: string) => {
    const intentMap: Record<string, { text: string; color: string }> = {
      product_inquiry: { text: 'Consulta de producto', color: 'bg-blue-900 text-blue-300' },
      purchase: { text: 'Compra', color: 'bg-green-900 text-green-300' },
      shipping_inquiry: { text: 'Consulta de envío', color: 'bg-purple-900 text-purple-300' },
      support: { text: 'Soporte', color: 'bg-yellow-900 text-yellow-300' }
    };

    const intentData = intentMap[intent] || { text: 'General', color: 'bg-gray-900 text-gray-300' };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${intentData.color}`}>
        {intentData.text}
      </span>
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center py-4 border-b border-gray-700">
            <div className="rounded-full bg-gray-700 h-10 w-10"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No hay sesiones de chat recientes
        </div>
      ) : (
        sessions.map((session) => (
          <div key={session.id} className="flex items-start py-4 border-b border-gray-700 last:border-0">
            <div className="flex-shrink-0">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium text-white truncate">{session.customer}</h3>
                  <span className="ml-2 inline-flex items-center text-xs text-gray-400">
                    {getStatusIcon(session.status)}
                    <span className="ml-1">{getStatusText(session.status)}</span>
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formatTime(session.timestamp)}</span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                  {session.channel}
                </span>
                <span className="ml-2">{getIntentBadge(session.intent)}</span>
              </div>
              <p className="mt-2 text-sm text-gray-300 truncate">{session.lastMessage}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}