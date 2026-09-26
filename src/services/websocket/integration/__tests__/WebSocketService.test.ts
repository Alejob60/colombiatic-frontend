import webSocketService, { WebSocketService } from './WebSocketService';
import { io, Socket } from 'socket.io-client';
import { getTokens } from '@/lib/tokenManager';

// Mock de las dependencias
jest.mock('socket.io-client', () => {
  const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
    connected: true
  };
  
  return {
    io: jest.fn(() => mockSocket),
    Socket: jest.fn(() => mockSocket)
  };
});

jest.mock('@/lib/tokenManager', () => ({
  getTokens: jest.fn()
}));

describe('WebSocketService', () => {
  let service: WebSocketService;
  let mockSocket: any;
  
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
    
    // Crear un mock de socket
    mockSocket = {
      on: jest.fn((event, callback) => {
        if (event === 'connect') {
          // Simular conexión inmediata
          setTimeout(callback, 0);
        }
        return mockSocket;
      }),
      off: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
      connected: true
    };
    
    // Mock de io para retornar nuestro mock de socket
    (io as jest.Mock).mockReturnValue(mockSocket);
    
    // Crear una nueva instancia del servicio
    service = new WebSocketService({
      url: 'ws://test-server:3007',
      reconnectAttempts: 3,
      reconnectDelay: 100
    });
  });

  describe('Constructor', () => {
    it('debería crear una instancia con configuración por defecto', () => {
      const defaultService = new WebSocketService();
      
      // Verificar que las propiedades se establecieron correctamente
      expect((defaultService as any).config).toEqual({
        url: 'http://localhost:3007',
        reconnectAttempts: 5,
        reconnectDelay: 1000
      });
    });

    it('debería crear una instancia con configuración personalizada', () => {
      expect((service as any).config).toEqual({
        url: 'ws://test-server:3007',
        reconnectAttempts: 3,
        reconnectDelay: 100
      });
    });
  });

  describe('connect', () => {
    it('debería conectar al servidor WebSocket exitosamente', async () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-token'
      });
      
      // Intentar conectar
      await expect(service.connect()).resolves.toBeUndefined();
      
      // Verificar que se llamó a io con los parámetros correctos
      expect(io).toHaveBeenCalledWith('ws://test-server:3007', {
        transports: ['websocket'],
        auth: {
          token: 'test-token'
        },
        reconnection: false
      });
      
      // Verificar que se registraron los listeners
      expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));
    });

    it('debería rechazar la promesa si hay un error de conexión', async () => {
      // Mock de io para simular un error de conexión
      const errorSocket = {
        on: jest.fn((event, callback) => {
          if (event === 'connect_error') {
            // Simular error de conexión
            setTimeout(() => callback(new Error('Connection failed')), 0);
          }
          return errorSocket;
        }),
        off: jest.fn(),
        emit: jest.fn(),
        disconnect: jest.fn()
      };
      
      (io as jest.Mock).mockReturnValue(errorSocket);
      
      // Intentar conectar
      await expect(service.connect()).rejects.toThrow('Connection failed');
    });
  });

  describe('joinSession', () => {
    beforeEach(async () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-token'
      });
      
      // Conectar primero
      await service.connect();
    });

    it('debería unirse a una sesión correctamente', () => {
      // Unirse a una sesión
      service.joinSession({
        sessionId: 'test-session-id',
        userId: 'test-user-id',
        tenantId: 'test-tenant-id'
      });
      
      // Verificar que se emitió el evento correcto
      expect(mockSocket.emit).toHaveBeenCalledWith('join_session', {
        sessionId: 'test-session-id',
        userId: 'test-user-id',
        tenantId: 'test-tenant-id'
      });
    });

    it('debería usar el tenant ID por defecto si no se proporciona', () => {
      // Unirse a una sesión sin tenantId
      service.joinSession({
        sessionId: 'test-session-id',
        userId: 'test-user-id'
      });
      
      // Verificar que se usó el tenant ID por defecto
      expect(mockSocket.emit).toHaveBeenCalledWith('join_session', {
        sessionId: 'test-session-id',
        userId: 'test-user-id',
        tenantId: '7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba'
      });
    });

    it('debería advertir si no está conectado', () => {
      // Desconectar
      service.disconnect();
      
      // Espiar console.warn
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      // Intentar unirse a una sesión
      service.joinSession({
        sessionId: 'test-session-id'
      });
      
      // Verificar que se mostró la advertencia
      expect(consoleWarnSpy).toHaveBeenCalledWith('No se puede unir a la sesión: WebSocket no conectado');
      
      // Restaurar console.warn
      consoleWarnSpy.mockRestore();
    });
  });

  describe('sendUserMessage', () => {
    beforeEach(async () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-token'
      });
      
      // Conectar primero
      await service.connect();
      
      // Unirse a una sesión
      service.joinSession({
        sessionId: 'test-session-id'
      });
    });

    it('debería enviar un mensaje de usuario correctamente', () => {
      // Enviar un mensaje
      service.sendUserMessage('Hello, world!', { context: 'test' });
      
      // Verificar que se emitió el evento correcto
      expect(mockSocket.emit).toHaveBeenCalledWith('user_message', {
        sessionId: 'test-session-id',
        message: 'Hello, world!',
        context: { context: 'test' }
      });
    });

    it('debería advertir si no está conectado', () => {
      // Desconectar
      service.disconnect();
      
      // Espiar console.warn
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      // Intentar enviar un mensaje
      service.sendUserMessage('Hello, world!');
      
      // Verificar que se mostró la advertencia
      expect(consoleWarnSpy).toHaveBeenCalledWith('No se puede enviar mensaje: WebSocket no conectado');
      
      // Restaurar console.warn
      consoleWarnSpy.mockRestore();
    });

    it('debería advertir si no hay sesión activa', () => {
      // Crear un nuevo servicio sin unirse a una sesión
      const newService = new WebSocketService();
      
      // Espiar console.warn
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      // Intentar enviar un mensaje
      newService.sendUserMessage('Hello, world!');
      
      // Verificar que se mostró la advertencia
      expect(consoleWarnSpy).toHaveBeenCalledWith('No se puede enviar mensaje: No hay sesión activa');
      
      // Restaurar console.warn
      consoleWarnSpy.mockRestore();
    });
  });

  describe('disconnect', () => {
    beforeEach(async () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-token'
      });
      
      // Conectar primero
      await service.connect();
    });

    it('debería desconectar del servidor WebSocket', () => {
      // Desconectar
      service.disconnect();
      
      // Verificar que se llamó al método disconnect del socket
      expect(mockSocket.disconnect).toHaveBeenCalled();
      
      // Verificar que las propiedades se resetearon
      expect((service as any).isConnected).toBe(false);
      expect((service as any).sessionId).toBeNull();
    });
  });

  describe('isConnectedStatus', () => {
    it('debería retornar false si no hay socket', () => {
      // Verificar estado de conexión sin conectar
      expect(service.isConnectedStatus()).toBe(false);
    });

    it('debería retornar true si está conectado', async () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-token'
      });
      
      // Conectar
      await service.connect();
      
      // Verificar estado de conexión
      expect(service.isConnectedStatus()).toBe(true);
    });
  });

  describe('getSocket', () => {
    it('debería retornar null si no hay socket', () => {
      // Verificar que retorna null sin conectar
      expect(service.getSocket()).toBeNull();
    });

    it('debería retornar la instancia del socket si está conectado', async () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-token'
      });
      
      // Conectar
      await service.connect();
      
      // Verificar que retorna la instancia del socket
      expect(service.getSocket()).toBe(mockSocket);
    });
  });
});