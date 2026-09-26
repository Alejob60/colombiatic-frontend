import axios from 'axios';
import io from 'socket.io-client';
import api from './api';

// Tipos para la comunicación con el agente
export interface AgentMessage {
  message: string;
  context?: {
    sessionId?: string;
    language?: string;
    tenantId?: string;
    userId?: string;
  };
}

export interface AgentResponse {
  agent: string;
  status: 'clarification_needed' | 'ready' | 'processing' | 'completed';
  conversation: {
    userMessage: string;
    agentResponse: string;
    objective: string;
    targetAgent: string;
    collectedInfo: Record<string, any>;
    missingInfo: string[];
    confidence: number;
    isComplete: boolean;
  };
  taskId?: string;
}

export interface SessionContext {
  sessionId: string;
  language: string;
  tenantId?: string;
  userId?: string;
}

// Servicio para manejar la comunicación con el agente ColombiaTIC
class ColombiaticAgentService {
  private apiClient;
  private socket;
  private baseUrl = 'http://localhost:3007/api'; // Puerto correcto según la memoria
  private socketUrl = 'http://localhost:3007';

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.socket = io(this.socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }

  // Generar ID de sesión único
  generateSessionId(): string {
    return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // Persistir contexto de conversación en localStorage
  saveConversationContext(sessionId: string, messages: any[]): void {
    try {
      const context = {
        sessionId,
        messages,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas de expiración
      };
      localStorage.setItem(`colombiatic_chat_${sessionId}`, JSON.stringify(context));
    } catch (error) {
      console.warn('No se pudo guardar el contexto de conversación:', error);
    }
  }

  // Recuperar contexto de conversación de localStorage
  loadConversationContext(sessionId: string): any[] | null {
    try {
      const stored = localStorage.getItem(`colombiatic_chat_${sessionId}`);
      if (!stored) return null;
      
      const context = JSON.parse(stored);
      
      // Verificar si ha expirado
      if (new Date(context.expiresAt) < new Date()) {
        localStorage.removeItem(`colombiatic_chat_${sessionId}`);
        return null;
      }
      
      return context.messages;
    } catch (error) {
      console.warn('No se pudo cargar el contexto de conversación:', error);
      return null;
    }
  }

  // Limpiar sesiones expiradas
  cleanupExpiredSessions(): void {
    try {
      const keysToRemove: string[] = [];
      const now = new Date();
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('colombiatic_chat_')) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const context = JSON.parse(stored);
              if (new Date(context.expiresAt) < now) {
                keysToRemove.push(key);
              }
            }
          } catch (error) {
            keysToRemove.push(key); // Remover entradas corruptas
          }
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Error limpiando sesiones expiradas:', error);
    }
  }

  // Enviar mensaje al agente ColombiaTIC
  async sendMessage(message: string, context: Partial<SessionContext> = {}): Promise<AgentResponse> {
    try {
      // Usar el servicio API existente para mantener consistencia
      const response = await api.makeRequest('/v2/agents/colombiatic', {
        method: 'POST',
        body: JSON.stringify({
          message,
          context: {
            sessionId: context.sessionId || this.generateSessionId(),
            language: context.language || 'es',
            tenantId: context.tenantId || null,
            userId: context.userId || null
          }
        })
      });

      return response;
    } catch (error) {
      console.error('Error enviando mensaje al agente ColombiaTIC:', error);
      throw error;
    }
  }

  // Escuchar eventos en tiempo real del agente
  onAgentUpdate(callback: (data: any) => void): void {
    this.socket.on('agent_status_update', callback);
  }

  onTaskProgress(callback: (data: any) => void): void {
    this.socket.on('task_progress', callback);
  }

  onSystemAlert(callback: (data: any) => void): void {
    this.socket.on('system_alert', callback);
  }

  // Cerrar conexión WebSocket
  closeConnection(): void {
    this.socket.close();
  }
}

export default new ColombiaticAgentService();