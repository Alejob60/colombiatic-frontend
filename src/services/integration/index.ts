// src/services/integration/index.ts
export { default as AuthService } from '../auth/integration/AuthService';
export { default as ApiService } from '../api/integration/ApiService';
export { default as WebSocketService } from '../websocket/integration/WebSocketService';

// Re-exportar tipos y clases específicas
export type { JoinSessionParams } from '../websocket/integration/WebSocketService';