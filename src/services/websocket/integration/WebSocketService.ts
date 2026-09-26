import { io, Socket } from 'socket.io-client';
import { getTokens } from '@/lib/tokenManager';

interface WebSocketConfig {
  url?: string;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

interface JoinSessionParams {
  sessionId: string;
  userId?: string;
  tenantId?: string;
}

class WebSocketService {
  private socket: Socket | null = null;
  private config: WebSocketConfig;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private sessionId: string | null = null;
  private isConnected: boolean = false;

  constructor(config: WebSocketConfig = {}) {
    this.config = {
      url: config.url || process.env.WEBSOCKET_URL || 'http://localhost:3007',
      reconnectAttempts: config.reconnectAttempts || 5,
      reconnectDelay: config.reconnectDelay || 1000
    };
    
    this.maxReconnectAttempts = this.config.reconnectAttempts || 5;
    this.reconnectDelay = this.config.reconnectDelay || 1000;
  }

  /**
   * Conectar al servidor WebSocket
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Obtener token de autenticación
        const tokens = getTokens();
        const authToken = tokens?.accessToken;
        
        // Crear conexión WebSocket
        this.socket = io(this.config.url!, {
          transports: ['websocket'],
          auth: {
            token: authToken
          },
          reconnection: false // Manejaremos la reconexión manualmente
        });

        // Configurar listeners
        this.setupEventListeners();

        // Resolver la promesa cuando se establezca la conexión
        this.socket.on('connect', () => {
          console.log('Conexión WebSocket establecida');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve();
        });

        // Rechazar la promesa si hay un error de conexión
        this.socket.on('connect_error', (error) => {
          console.error('Error de conexión WebSocket:', error);
          this.isConnected = false;
          reject(error);
        });
      } catch (error) {
        console.error('Error al crear conexión WebSocket:', error);
        reject(error);
      }
    });
  }

  /**
   * Configurar listeners de eventos
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('disconnect', (reason) => {
      console.log('Desconexión WebSocket:', reason);
      this.isConnected = false;
      
      // Intentar reconectar si no fue una desconexión manual
      if (reason !== 'io client disconnect') {
        this.handleReconnect();
      }
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`Intento de reconexión #${attempt}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Fallo en la reconexión después de múltiples intentos');
    });

    // Listeners para eventos específicos del chat
    this.socket.on('agent_message', (data) => {
      this.handleAgentMessage(data);
    });

    this.socket.on('typing_indicator', (data) => {
      this.handleTypingIndicator(data);
    });

    this.socket.on('agent_transfer', (data) => {
      this.handleAgentTransfer(data);
    });
  }

  /**
   * Unirse a una sesión
   */
  public joinSession(params: JoinSessionParams): void {
    if (!this.socket || !this.isConnected) {
      console.warn('No se puede unir a la sesión: WebSocket no conectado');
      return;
    }

    this.sessionId = params.sessionId;
    
    this.socket.emit('join_session', {
      sessionId: params.sessionId,
      userId: params.userId,
      tenantId: params.tenantId || process.env.TENANT_ID || '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba'
    });
  }

  /**
   * Enviar un mensaje del usuario
   */
  public sendUserMessage(message: string, context?: any): void {
    if (!this.socket || !this.isConnected) {
      console.warn('No se puede enviar mensaje: WebSocket no conectado');
      return;
    }

    if (!this.sessionId) {
      console.warn('No se puede enviar mensaje: No hay sesión activa');
      return;
    }

    this.socket.emit('user_message', {
      sessionId: this.sessionId,
      message: message,
      context: context
    });
  }

  /**
   * Manejar mensaje del agente
   */
  private handleAgentMessage(data: any): void {
    // Emitir evento personalizado para que otros componentes puedan escuchar
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('agentMessage', { detail: data }));
    }
  }

  /**
   * Manejar indicador de escritura
   */
  private handleTypingIndicator(data: any): void {
    // Emitir evento personalizado para que otros componentes puedan escuchar
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('typingIndicator', { detail: data }));
    }
  }

  /**
   * Manejar transferencia de agente
   */
  private handleAgentTransfer(data: any): void {
    // Emitir evento personalizado para que otros componentes puedan escuchar
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('agentTransfer', { detail: data }));
    }
  }

  /**
   * Manejar reconexión automática
   */
  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Máximo número de intentos de reconexión alcanzado');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Intentando reconectar (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      this.connect()
        .then(() => {
          console.log('Reconexión exitosa');
          // Si había una sesión activa, volver a unirse
          if (this.sessionId) {
            this.joinSession({ sessionId: this.sessionId });
          }
        })
        .catch((error) => {
          console.error('Error en reconexión:', error);
          this.handleReconnect();
        });
    }, this.reconnectDelay * this.reconnectAttempts); // Incrementar el delay con cada intento
  }

  /**
   * Desconectar del servidor WebSocket
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.sessionId = null;
    }
  }

  /**
   * Verificar si está conectado
   */
  public isConnectedStatus(): boolean {
    return this.isConnected && this.socket !== null;
  }

  /**
   * Obtener la instancia del socket (para casos especiales)
   */
  public getSocket(): Socket | null {
    return this.socket;
  }
}

// Crear una instancia singleton del WebSocketService
const webSocketService = new WebSocketService();

export default webSocketService;
export { WebSocketService };
export type { JoinSessionParams };