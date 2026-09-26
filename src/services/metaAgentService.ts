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

export type WebhookChannel = 'facebook' | 'whatsapp' | 'web' | 'instagram' | 'telegram';

export interface WebhookConfig {
  id: string;
  channel: WebhookChannel;
  webhook_url: string;
  verification_token?: string;
  created_at: string;
}

// Configuración de un meta-agente. Los distintos consumidores envían
// subconjuntos diferentes (identidad del agente, capacidades, o datos de la
// organización a la que pertenece), por lo que todos los campos son opcionales
// y se permite enviar propiedades adicionales soportadas por el backend.
export interface MetaAgentConfig {
  name?: string;
  description?: string;
  capabilities?: string[];
  model_type?: string;
  processing_mode?: string;
  integration_type?: string;
  config?: Record<string, any>;
  [key: string]: any;
}

const REQUEST_TIMEOUT = 10000;

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

  /**
   * Ejecuta una petición contra el Meta-Agent normalizando los errores de conexión
   */
  private async request<T>(method: 'get' | 'post' | 'put', path: string, payload?: unknown): Promise<T> {
    try {
      const response = await axios.request<T>({
        method,
        url: `${this.baseUrl}${path}`,
        data: payload,
        timeout: REQUEST_TIMEOUT
      });

      return response.data;
    } catch (error) {
      console.error(`Error al llamar a ${method.toUpperCase()} ${path} en el Meta-Agent:`, error);

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
          throw new Error('CONNECTION_ERROR');
        }
      }

      throw error;
    }
  }

  /**
   * Crea un meta-agente
   * @param config Configuración del meta-agente
   * @returns Meta-agente creado por el backend
   */
  async createMetaAgent(config: MetaAgentConfig): Promise<any> {
    return this.request('post', '/agents/meta-agent', config);
  }

  /**
   * Obtiene la configuración de un meta-agente
   * @param agentId Identificador del meta-agente
   * @returns Configuración del meta-agente
   */
  async getMetaAgentConfig(agentId: string): Promise<any> {
    return this.request('get', `/agents/meta-agent/${agentId}`);
  }

  /**
   * Actualiza la configuración de un meta-agente
   * @param agentId Identificador del meta-agente
   * @param config Campos a actualizar
   * @returns Configuración actualizada
   */
  async updateMetaAgentConfig(agentId: string, config: MetaAgentConfig): Promise<any> {
    return this.request('put', `/agents/meta-agent/${agentId}`, config);
  }

  /**
   * Configura los webhooks de un meta-agente
   * @param agentId Identificador del meta-agente
   * @param webhooks Webhooks a registrar por canal
   * @returns Confirmación del backend
   */
  async configureMetaWebhooks(agentId: string, webhooks: WebhookConfig[]): Promise<any> {
    return this.request('post', `/agents/meta-agent/${agentId}/webhooks`, { webhooks });
  }

  /**
   * Procesa un mensaje a través de un meta-agente concreto
   * @param agentId Identificador del meta-agente
   * @param message Mensaje a procesar
   * @param context Contexto adicional; el backend devuelve el payload enriquecido
   *   con la misma forma que el contexto recibido
   * @returns Payload procesado por el meta-agente
   */
  async processMessageThroughMetaAgent(agentId: string, message: string, context: Record<string, any> = {}): Promise<any> {
    return this.request('post', `/agents/meta-agent/${agentId}/process`, {
      message,
      context: {
        sessionId: this.sessionId,
        language: 'es',
        ...context
      }
    });
  }
}

const metaAgentService = new MetaAgentService();

export function createMetaAgent(config: MetaAgentConfig): Promise<any> {
  return metaAgentService.createMetaAgent(config);
}

export function getMetaAgentConfig(agentId: string): Promise<any> {
  return metaAgentService.getMetaAgentConfig(agentId);
}

export function updateMetaAgentConfig(agentId: string, config: MetaAgentConfig): Promise<any> {
  return metaAgentService.updateMetaAgentConfig(agentId, config);
}

export function configureMetaWebhooks(agentId: string, webhooks: WebhookConfig[]): Promise<any> {
  return metaAgentService.configureMetaWebhooks(agentId, webhooks);
}

export function processMessageThroughMetaAgent(agentId: string, message: string, context: Record<string, any> = {}): Promise<any> {
  return metaAgentService.processMessageThroughMetaAgent(agentId, message, context);
}

export default metaAgentService;