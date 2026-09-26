// src/services/integration/__tests__/integration.test.ts

// Prueba simple para verificar que los archivos existen y se pueden importar
import AuthService from '../../auth/integration/AuthService';
import ApiService from '../../api/integration/ApiService';
import WebSocketService from '../../websocket/integration/WebSocketService';

describe('Pruebas Integrales de Servicios', () => {
  it('debería poder importar todos los servicios', () => {
    expect(AuthService).toBeDefined();
    expect(ApiService).toBeDefined();
    expect(WebSocketService).toBeDefined();
  });
});