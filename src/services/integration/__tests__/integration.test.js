// src/services/integration/__tests__/integration.test.js

// Prueba simple para verificar que los archivos existen y se pueden importar
const AuthService = require('../../auth/integration/AuthService').default;
const ApiService = require('../../api/integration/ApiService').default;
const WebSocketService = require('../../websocket/integration/WebSocketService').default;

describe('Pruebas Integrales de Servicios', () => {
  it('debería poder importar todos los servicios', () => {
    expect(AuthService).toBeDefined();
    expect(ApiService).toBeDefined();
    expect(WebSocketService).toBeDefined();
  });
});