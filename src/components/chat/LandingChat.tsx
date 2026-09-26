// src/components/chat/LandingChat.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, ShoppingCart, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startContext, savePendingPurchase } from '@/services/contextService';
import { useAuthState } from '@/hooks/useAuthState';
import { useToast } from '@/contexts/ToastContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  serviceId?: string;
}

interface LandingChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LandingChat({ isOpen, onClose }: LandingChatProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuthState();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contextId, setContextId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    try {
      const context = await startContext({
        origin: 'landing',
        intention: 'explore'
      });

      setContextId(context.contextId);

      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: '¡Hola! 👋 Soy tu **IA Personal** de ColombiaTIC.\n\nEstoy aquí para asesorarte en la transformación digital de tu proyecto:\n\n✨ **Analizar** tus necesidades específicas\n🎯 **Recomendar** las mejores soluciones de IA\n📊 **Diseñar** una estrategia personalizada\n🚀 **Acompañarte** en cada paso\n\n¿Cuéntame sobre tu proyecto! ¿Qué quieres lograr?',
        timestamp: new Date(),
        suggestions: [
          'Quiero automatizar ventas',
          'Necesito un chatbot IA',
          'Ver soluciones disponibles',
          'Asesoría personalizada'
        ]
      };

      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('[LandingChat] Error initializing:', error);
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
      const response = generateResponse(text);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): Message => {
    const lower = userInput.toLowerCase();

    // Check for purchase intent
    if (lower.includes('comprar') || lower.includes('adquirir') || lower.includes('precio')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Como tu asesor personal, te ayudaré a elegir el plan ideal para tu proyecto:\n\n💎 **Plan Creator** - $29/mes\n• Perfecto para emprendedores\n• Hasta 1,000 conversaciones\n• Todos los servicios básicos\n\n🚀 **Plan Pro** - $99/mes\n• Para negocios en crecimiento\n• Conversaciones ilimitadas\n• IA avanzada + integraciones\n\n¿Qué plan se ajusta mejor a tus necesidades?',
        timestamp: new Date(),
        suggestions: ['Ver Plan Creator', 'Ver Plan Pro', 'Comparar planes']
      };
    }

    // Check for chatbot/AI intent
    if (lower.includes('chatbot') || lower.includes('ia') || lower.includes('automatizar')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: '¡Excelente elección! Como tu IA Personal, te recomiendo **Misybot AI**:\n\n✨ Características destacadas:\n• IA omnicanal (WhatsApp, Web, Instagram)\n• Respuestas automáticas 24/7\n• Integración con tu inventario\n• Personalización por cliente\n• Analytics en tiempo real\n\nPuedo ayudarte a configurarlo para tu proyecto.',
        timestamp: new Date(),
        suggestions: ['Probar gratis', 'Ver más servicios IA', 'Hablar con ventas']
      };
    }

    // Check for services inquiry
    if (lower.includes('servicio') || lower.includes('qué ofrecen')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Como tu asesor de transformación digital, te presento nuestro ecosistema completo:\n\n🌐 **Presencia Digital**\n• Landing pages optimizadas\n• Sitios web modernos\n• Auditoría SEO automatizada\n\n🤖 **Automatización & IA**\n• Chatbots inteligentes\n• Flujos de venta automáticos\n• Recuperación de carritos\n\n📧 **Comunicaciones**\n• Email marketing\n• SMS masivos\n• Dashboard unificado\n\n¿Qué área priorizamos para tu proyecto?',
        timestamp: new Date(),
        suggestions: ['Ver todos los servicios', 'Automatización', 'Marketing']
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Como tu IA Personal, puedo asesorarte en:\n\n💡 Información sobre servicios y soluciones\n📊 Análisis y comparación de planes\n🎯 Guía personalizada de implementación\n🔧 Soporte técnico especializado\n\n¿En qué aspecto quieres que profundicemos?',
      timestamp: new Date(),
      suggestions: ['Ver servicios', 'Ver planes', 'Hablar con soporte']
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Handle special suggestions
    if (suggestion === 'Ver servicios' || suggestion === 'Ver todos los servicios') {
      router.push('/services');
      onClose();
      return;
    }

    if (suggestion === 'Comparar planes' || suggestion === 'Ver Plan Creator' || suggestion === 'Ver Plan Pro') {
      router.push('/pricing');
      onClose();
      return;
    }

    if (suggestion.includes('Probar') || suggestion.includes('comprar')) {
      handlePurchaseIntent('misybot_ai');
      return;
    }

    // Send as regular message
    handleSendMessage(suggestion);
  };

  const handlePurchaseIntent = (serviceId: string) => {
    if (!isLoggedIn) {
      // Save pending purchase and redirect to login
      savePendingPurchase({
        serviceId,
        intention: 'buy',
        contextId,
        serviceName: 'Misybot AI'
      });

      showToast('Debes iniciar sesión para continuar con la compra', 'info');
      router.push('/login');
    } else {
      // User is logged in, go to checkout or service activation
      router.push(`/dashboard/services/${serviceId}?action=buy`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 w-96 h-[600px] bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Tu IA Personal</h3>
                  <p className="text-xs text-gray-400">Asesor de proyecto</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
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
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
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
          <div className="p-4 border-t border-gray-700 bg-gray-900/50">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
