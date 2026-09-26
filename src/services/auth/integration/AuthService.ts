import axios from 'axios';
import {
  storeTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken
} from '@/lib/tokenManager';

// Tipos para la autenticación
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  user: any;
  tokens: AuthTokens;
}

class AuthService {
  private baseUrl: string;
  private refreshTokenPromise: Promise<AuthTokens> | null = null;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
  }

  /**
   * Iniciar sesión con credenciales
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, credentials);
      
      const authData: AuthResponse = response.data;
      
      // Almacenar tokens
      storeTokens({
        accessToken: authData.tokens.accessToken,
        refreshToken: authData.tokens.refreshToken
      });
      
      return authData;
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      throw error;
    }
  }

  /**
   * Renovar token de acceso
   */
  async refreshAccessToken(): Promise<AuthTokens> {
    // Prevenir múltiples llamadas simultáneas
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = this._performTokenRefresh();
    
    try {
      const tokens = await this.refreshTokenPromise;
      return tokens;
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  private async _performTokenRefresh(): Promise<AuthTokens> {
    try {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${this.baseUrl}/auth/refresh`, {
        refreshToken
      });

      const tokens: AuthTokens = response.data;
      
      // Almacenar nuevos tokens
      storeTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
      
      return tokens;
    } catch (error) {
      console.error('Error al renovar token:', error);
      // Limpiar tokens inválidos
      clearTokens();
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      const accessToken = getAccessToken();
      
      if (accessToken) {
        // Notificar al backend del cierre de sesión
        await axios.post(`${this.baseUrl}/auth/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      }
    } catch (error) {
      console.error('Error al cerrar sesión en el backend:', error);
    } finally {
      // Limpiar tokens localmente
      clearTokens();
    }
  }

  /**
   * Obtener token de acceso actual
   */
  getAccessToken(): string | null {
    return getAccessToken();
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }
}

export default new AuthService();