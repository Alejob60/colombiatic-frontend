// src/app/(i18n)/[lang]/(dashboard)/support/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  BookOpen, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  agent?: string;
}

function SupportPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets] = useState<Ticket[]>([
    {
      id: 'TK-001',
      subject: 'Problema con conexión al chatbot',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2023-06-15',
      updatedAt: '2023-06-18',
      agent: 'María González'
    },
    {
      id: 'TK-002',
      subject: 'Solicitud de nueva funcionalidad',
      status: 'open',
      priority: 'medium',
      createdAt: '2023-06-10',
      updatedAt: '2023-06-10'
    },
    {
      id: 'TK-003',
      subject: 'Error en reporte de métricas',
      status: 'resolved',
      priority: 'low',
      createdAt: '2023-06-05',
      updatedAt: '2023-06-07'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Abierto';
      case 'in-progress': return 'En progreso';
      case 'resolved': return 'Resuelto';
      case 'closed': return 'Cerrado';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'urgent': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'Baja';
      case 'medium': return 'Media';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Soporte Técnico</h1>
        <p className="text-gray-400">Obtén ayuda y asistencia técnica para tus servicios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Options */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">¿Cómo podemos ayudarte?</h2>
            <div className="space-y-4">
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="text-white font-medium">Chat en Vivo</div>
                  <div className="text-gray-400 text-sm">Respuesta inmediata</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="text-white font-medium">Email</div>
                  <div className="text-gray-400 text-sm">support@colombiatic.com.co</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="text-white font-medium">Teléfono</div>
                  <div className="text-gray-400 text-sm">+57 300 123 4567</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recursos Útiles</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-white">Documentación</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-white">Tutoriales</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-white">FAQ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Tickets */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Tickets de Soporte</h2>
              <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Nuevo Ticket
              </button>
            </div>

            <div className="mb-6">
              <div className="flex border-b border-gray-700">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'tickets' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('tickets')}
                >
                  Mis Tickets
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'knowledge' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('knowledge')}
                >
                  Base de Conocimiento
                </button>
              </div>
            </div>

            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No tienes tickets abiertos</h3>
                <p className="text-gray-400 mb-4">Crea un nuevo ticket para obtener ayuda</p>
                <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Crear Ticket
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">#{ticket.id}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ticket.status)} text-white`}>
                            {getStatusText(ticket.status)}
                          </span>
                        </div>
                        <h3 className="text-white font-medium">{ticket.subject}</h3>
                      </div>
                      <div className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Creado: {ticket.createdAt}</span>
                        </div>
                        {ticket.agent && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{ticket.agent}</span>
                          </div>
                        )}
                      </div>
                      <button className="text-primary hover:text-blue-400">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SupportPage);