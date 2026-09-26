// src/services/metaAgentService.ts
// Servicio para comunicarse con el FrontDesk Agent del Meta-Agent

import axios from 'axios';

// Definición de tipos basados en la documentación
export interface Context {
  sessionId: string;
  language: string;
  [key: string]: any; // Para permitir contexto adicional
}

export interface Conversation {
  userMessage: string;
  agentResponse: string;
  objective: 'generate_video' | 'schedule_post' | 'analyze_trends' | 'faq_response' | 'generate_report';
  targetAgent: 'video-scriptor' | 'post-scheduler' | 'trend-scanner' | 'faq-responder' | 'analytics-reporter';
  collectedInfo: Record<string, any>;
  missingInfo: string[];
  confidence: number;
  emotion: 'curious' | 'frustrated' | 'excited' | 'confused' | 'satisfied' | 'neutral';
  isComplete: boolean;
}

export interface FrontDeskResponse {
  agent: 'front-desk';
  status: 'clarification_needed' | 'ready';
  conversation: Conversation;
}

class MetaAgentService {
  private baseUrl: string;
  private sessionId: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_META_AGENT_API_URL || 'http://localhost:3007/api';
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public updateSessionId(): string {
    this.sessionId = this.generateSessionId();
    return this.sessionId;
  }

  /**
   * Procesa un mensaje del cliente a través del FrontDesk Agent
   * @param message Mensaje del cliente
   * @param context Contexto adicional
   * @returns Respuesta del FrontDesk Agent
   */
  async processMessage(message: string, context: Partial<Context> = {}): Promise<FrontDeskResponse> {
    try {
      const response = await axios.post<FrontDeskResponse>(`${this.baseUrl}/agents/front-desk`, {
        message,
        context: {
          sessionId: this.sessionId,
          language: 'es',
          ...context
        }
      }, {
        timeout: 10000 // 10 segundos de timeout
      });
      
      return response.data;
    } catch (error) {
      console.error('Error al procesar el mensaje con el Meta-Agent:', error);
      
      // Verificar si es un error de conexión
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
          throw new Error('CONNECTION_ERROR');
        }
      }
      
      // Si hay un error general, retornar una respuesta de fallback
      return {
        agent: 'front-desk',
        status: 'clarification_needed',
        conversation: {
          userMessage: message,
          agentResponse: 'Lo siento, actualmente no puedo procesar tu solicitud. Por favor, inténtalo más tarde.',
          objective: 'faq_response',
          targetAgent: 'faq-responder',
          collectedInfo: {},
          missingInfo: [],
          confidence: 0.5,
          emotion: 'frustrated',
          isComplete: true
        }
      };
    }
  }
}

export default new MetaAgentService();