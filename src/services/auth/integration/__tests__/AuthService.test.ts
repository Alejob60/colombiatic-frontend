import { AuthService } from './AuthService';
import { getStoredToken, setStoredToken, removeStoredToken } from '@/lib/tokenManager';

// Mock de las dependencias
jest.mock('@/lib/tokenManager', () => ({
  getStoredToken: jest.fn(),
  setStoredToken: jest.fn(),
  removeStoredToken: jest.fn()
}));

jest.mock('axios', () => ({
  post: jest.fn(),
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  }))
}));

describe('AuthService', () => {
  let authService: AuthService;
  
  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('debería iniciar sesión exitosamente y almacenar tokens', async () => {
      const mockResponse = {
        data: {
          user: { id: '1', email: 'test@example.com' },
          tokens: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token'
          }
        }
      };
      
      (require('axios').post as jest.Mock).mockResolvedValue(mockResponse);
      
      const credentials = { email: 'test@example.com', password: 'password123' };
      const result = await authService.login(credentials);
      
      expect(require('axios').post).toHaveBeenCalledWith(
        'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net/auth/login',
        credentials
      );
      
      expect(setStoredToken).toHaveBeenCalledWith({
        accessToken: 'access-token',
        refreshToken: 'refresh-token'
      });
      
      expect(result).toEqual(mockResponse.data);
    });

    it('debería lanzar un error si las credenciales son inválidas', async () => {
      (require('axios').post as jest.Mock).mockRejectedValue(new Error('Credenciales inválidas'));
      
      const credentials = { email: 'invalid@example.com', password: 'wrongpassword' };
      
      await expect(authService.login(credentials)).rejects.toThrow('Credenciales inválidas');
    });
  });

  describe('logout', () => {
    it('debería limpiar los tokens almacenados', async () => {
      await authService.logout();
      
      expect(removeStoredToken).toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    it('debería renovar el token de acceso', async () => {
      const mockResponse = {
        data: {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token'
        }
      };
      
      (require('axios').post as jest.Mock).mockResolvedValue(mockResponse);
      (getStoredToken as jest.Mock).mockReturnValue({
        refreshToken: 'old-refresh-token'
      });
      
      const result = await authService.refreshToken();
      
      expect(require('axios').post).toHaveBeenCalledWith(
        'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net/auth/refresh',
        { refreshToken: 'old-refresh-token' }
      );
      
      expect(setStoredToken).toHaveBeenCalledWith({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token'
      });
      
      expect(result).toEqual(mockResponse.data);
    });

    it('debería lanzar un error si no hay refreshToken', async () => {
      (getStoredToken as jest.Mock).mockReturnValue(null);
      
      await expect(authService.refreshToken()).rejects.toThrow('No refresh token available');
    });
  });

  describe('isAuthenticated', () => {
    it('debería retornar true si hay un token válido', () => {
      (getStoredToken as jest.Mock).mockReturnValue({
        accessToken: 'valid-token',
        refreshToken: 'valid-refresh-token'
      });
      
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('debería retornar false si no hay tokens', () => {
      (getStoredToken as jest.Mock).mockReturnValue(null);
      
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('debería retornar los datos del usuario del token', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      (require('axios').post as jest.Mock).mockResolvedValue({ data: mockUser });
      (getStoredToken as jest.Mock).mockReturnValue({
        accessToken: 'valid-token'
      });
      
      const result = await authService.getCurrentUser();
      
      expect(require('axios').post).toHaveBeenCalledWith(
        'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net/auth/me',
        {},
        { headers: { Authorization: 'Bearer valid-token' } }
      );
      
      expect(result).toEqual(mockUser);
    });
  });
});