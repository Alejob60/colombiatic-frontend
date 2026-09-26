// src/components/chat/DashboardChat.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Settings, Power, BarChart3, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startContext, getPendingPurchase, clearPendingPurchase } from '@/services/contextService';
import { useAuthState } from '@/hooks/useAuthState';
import { useToast } from '@/contexts/ToastContext';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

interface ChatAction {
  label: string;
  action: 'activate' | 'configure' | 'view_metrics' | 'view_docs' | 'buy';
  serviceId?: string;
  icon: any;
}

interface DashboardChatProps {
  isChatOpen: boolean;
  toggleChat: () => void;
}

export default function DashboardChat({ isChatOpen, toggleChat }: DashboardChatProps) {
  const router = useRouter();
  const { user } = useAuthState();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextId, setContextId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat and check for pending purchases
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isChatOpen]);

  const initializeChat = async () => {
    try {
      const context = await startContext({
        origin: 'dashboard',
        intention: 'manage',
        userId: user?.id
      });

      setContextId(context.contextId);

      // Check for pending purchase
      const pendingPurchase = getPendingPurchase();

      if (pendingPurchase) {
        // Resume purchase flow
        const resumeMessage: Message = {
          id: '1',
          role: 'system',
          content: `¡Bienvenido de vuelta! 🎉

Como tu **IA Personal**, estoy listo para retomar donde lo dejamos.

Estábamos trabajando en activar **${pendingPurchase.serviceName || 'un servicio'}** para tu proyecto.

¿Continuamos con la configuración?`,
          timestamp: new Date(),
          actions: [
            {
              label: 'Sí, continuar',
              action: 'buy',
              serviceId: pendingPurchase.serviceId,
              icon: Power
            },
            {
              label: 'Ver detalles primero',
              action: 'view_docs',
              icon: FileText
            }
          ]
        };

        setMessages([resumeMessage]);
        
        // Clear pending purchase after showing
        clearPendingPurchase();
      } else {
        // Welcome message
        const welcomeMessage: Message = {
          id: '1',
          role: 'assistant',
          content: `¡Hola ${user?.name || 'Usuario'}! 👋

Soy tu **IA Personal** para gestionar y optimizar tu proyecto.

Estoy aquí para:

🛠️ **Configurar** y activar servicios
📊 **Analizar** métricas y rendimiento
💡 **Asesorarte** con mejores prácticas
⚡ **Optimizar** tu configuración

¿En qué aspecto de tu proyecto te ayudo hoy?`,
          timestamp: new Date(),
          actions: [
            {
              label: 'Ver panel de servicios',
              action: 'view_metrics',
              icon: BarChart3
            },
            {
              label: 'Activar nuevo servicio',
              action: 'activate',
              icon: Power
            }
          ]
        };

        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('[DashboardChat] Error initializing:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (in production, call actual AI API)
    setTimeout(() => {
      const response = generateDashboardResponse(text);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const generateDashboardResponse = (userInput: string): Message => {
    const lower = userInput.toLowerCase();

    // Check for activation intent
    if (lower.includes('activar') || lower.includes('habilitar')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Como tu asesor de proyecto, te recomiendo estos servicios populares:\n\n🤖 **Misybot AI** - Chatbot omnicanal inteligente\n📧 **Email Marketing** - Campañas automatizadas\n🛒 **Recuperación de Carritos** - Aumenta conversiones\n\n¿Cuál te gustaría activar para tu proyecto?',
        timestamp: new Date(),
        actions: [
          {
            label: 'Activar Misybot AI',
            action: 'activate',
            serviceId: 'misybot_ai',
            icon: Power
          },
          {
            label: 'Ver todos los servicios',
            action: 'view_docs',
            icon: FileText
          }
        ]
      };
    }

    // Check for configuration intent
    if (lower.includes('configurar') || lower.includes('ajustar')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Te puedo asesorar en la configuración de:\n\n⚙️ **Servicios activos** - Optimiza parámetros\n📊 **Dashboard y métricas** - Personaliza vistas\n👤 **Perfil y preferencias** - Ajusta tu cuenta\n🔐 **Seguridad y API keys** - Gestiona accesos\n\n¿Qué aspecto quieres configurar?',
        timestamp: new Date(),
        actions: [
          {
            label: 'Ir a configuración',
            action: 'configure',
            icon: Settings
          },
          {
            label: 'Configurar servicios',
            action: 'configure',
            serviceId: 'services',
            icon: Settings
          }
        ]
      };
    }

    // Check for metrics intent
    if (lower.includes('métrica') || lower.includes('estadística') || lower.includes('rendimiento')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Como tu asesor, puedo mostrarte:\n\n📈 **Métricas generales** - Overview de rendimiento\n💬 **Conversaciones** - Interacciones con clientes\n💰 **Ventas** - Performance comercial\n📊 **Analytics** - Insights profundos\n\n¿Qué análisis necesitas?',
        timestamp: new Date(),
        actions: [
          {
            label: 'Ver Analytics',
            action: 'view_metrics',
            icon: BarChart3
          }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Como tu IA Personal, puedo asesorarte en:\n\n✨ Activar servicios nuevos\n⚙️ Configurar servicios existentes\n📊 Analizar métricas y reportes\n🔧 Resolver problemas técnicos\n\n¿En qué aspecto de tu proyecto necesitas ayuda?',
      timestamp: new Date(),
      actions: [
        {
          label: 'Ver servicios',
          action: 'view_docs',
          icon: FileText
        }
      ]
    };
  };

  const handleActionClick = (action: ChatAction) => {
    switch (action.action) {
      case 'activate':
        if (action.serviceId) {
          router.push(`/dashboard/services?activate=${action.serviceId}`);
        } else {
          router.push('/services');
        }
        showToast('Abriendo activación de servicio...', 'info');
        break;

      case 'configure':
        if (action.serviceId === 'services') {
          router.push('/services');
        } else if (action.serviceId) {
          router.push(`/dashboard/settings?service=${action.serviceId}`);
        } else {
          router.push('/dashboard/settings');
        }
        break;

      case 'view_metrics':
        router.push('/dashboard/analytics');
        break;

      case 'view_docs':
        router.push('/services');
        break;

      case 'buy':
        if (action.serviceId) {
          // Handle checkout flow
          showToast('Abriendo proceso de compra...', 'info');
          router.push(`/dashboard/services?buy=${action.serviceId}`);
        }
        break;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Tu IA Personal</h3>
            <p className="text-xs text-gray-400">Asesor de tu proyecto</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.role === 'system'
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white border border-purple-500/30'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              
              {/* Actions */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.actions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleActionClick(action)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        {action.label}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
