import apiService, { ApiService } from './ApiService';
import { getTokens } from '@/lib/tokenManager';
import axios from 'axios';

// Mock de las dependencias
jest.mock('@/lib/tokenManager', () => ({
  getTokens: jest.fn()
}));

jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    },
    defaults: {
      headers: {
        common: {}
      }
    }
  };
  
  return {
    create: jest.fn(() => mockAxiosInstance),
    default: mockAxiosInstance
  };
});

describe('ApiService', () => {
  let service: ApiService;
  
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
    
    // Crear una nueva instancia del servicio
    service = new ApiService({
      baseUrl: 'https://test-api.example.com',
      timeout: 5000
    });
  });

  describe('Constructor', () => {
    it('debería crear una instancia con configuración por defecto', () => {
      const defaultService = new ApiService();
      
      // Verificar que axios.create fue llamado con los valores por defecto
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
        timeout: 10000
      });
    });

    it('debería crear una instancia con configuración personalizada', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://test-api.example.com',
        timeout: 5000
      });
    });
  });

  describe('Interceptores', () => {
    it('debería configurar interceptores de solicitud y respuesta', () => {
      // Verificar que los interceptores fueron configurados
      expect(service.getInstance().interceptors.request.use).toHaveBeenCalled();
      expect(service.getInstance().interceptors.response.use).toHaveBeenCalled();
    });

    it('debería agregar tenant ID y token de autenticación a las solicitudes', () => {
      // Mock de tokens
      (getTokens as jest.Mock).mockReturnValue({
        accessToken: 'test-access-token'
      });

      // Obtener el interceptor de solicitud
      const requestInterceptor = (service.getInstance().interceptors.request.use as jest.Mock).mock.calls[0][0];
      
      // Crear una configuración de solicitud de prueba
      const config: any = {
        headers: new Map()
      };
      
      // Ejecutar el interceptor
      const result = requestInterceptor(config);
      
      // Verificar que se agregaron los headers correctamente
      expect(result.headers.get('x-tenant-id')).toBe('7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba');
      expect(result.headers.get('Authorization')).toBe('Bearer test-access-token');
    });

    it('debería manejar errores de interceptor de solicitud', async () => {
      // Obtener el interceptor de error
      const errorInterceptor = (service.getInstance().interceptors.request.use as jest.Mock).mock.calls[0][1];
      
      // Crear un error de prueba
      const testError = new Error('Test error');
      
      // Verificar que el interceptor rechaza la promesa con el error
      await expect(errorInterceptor(testError)).rejects.toThrow('Test error');
    });
  });

  describe('Métodos HTTP', () => {
    beforeEach(() => {
      // Mock de la respuesta de axios
      (service.getInstance().get as jest.Mock).mockResolvedValue({ data: 'test' });
      (service.getInstance().post as jest.Mock).mockResolvedValue({ data: 'test' });
      (service.getInstance().put as jest.Mock).mockResolvedValue({ data: 'test' });
      (service.getInstance().delete as jest.Mock).mockResolvedValue({ data: 'test' });
      (service.getInstance().patch as jest.Mock).mockResolvedValue({ data: 'test' });
    });

    it('debería realizar solicitudes GET correctamente', async () => {
      const result = await service.get('/test-endpoint');
      
      expect(service.getInstance().get).toHaveBeenCalledWith('/test-endpoint', undefined);
      expect(result.data).toBe('test');
    });

    it('debería realizar solicitudes POST correctamente', async () => {
      const testData = { name: 'test' };
      const result = await service.post('/test-endpoint', testData);
      
      expect(service.getInstance().post).toHaveBeenCalledWith('/test-endpoint', testData, undefined);
      expect(result.data).toBe('test');
    });

    it('debería realizar solicitudes PUT correctamente', async () => {
      const testData = { id: 1, name: 'test' };
      const result = await service.put('/test-endpoint', testData);
      
      expect(service.getInstance().put).toHaveBeenCalledWith('/test-endpoint', testData, undefined);
      expect(result.data).toBe('test');
    });

    it('debería realizar solicitudes DELETE correctamente', async () => {
      const result = await service.delete('/test-endpoint');
      
      expect(service.getInstance().delete).toHaveBeenCalledWith('/test-endpoint', undefined);
      expect(result.data).toBe('test');
    });

    it('debería realizar solicitudes PATCH correctamente', async () => {
      const testData = { name: 'updated' };
      const result = await service.patch('/test-endpoint', testData);
      
      expect(service.getInstance().patch).toHaveBeenCalledWith('/test-endpoint', testData, undefined);
      expect(result.data).toBe('test');
    });
  });

  describe('setTenantId', () => {
    it('debería actualizar el tenant ID', () => {
      // Verificar el tenant ID inicial
      expect((service as any).tenantId).toBe('7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba');
      
      // Actualizar el tenant ID
      service.setTenantId('new-tenant-id');
      
      // Verificar que se actualizó correctamente
      expect((service as any).tenantId).toBe('new-tenant-id');
    });
  });

  describe('getInstance', () => {
    it('debería retornar la instancia de axios', () => {
      const instance = service.getInstance();
      
      expect(instance).toBeDefined();
      expect(instance).toHaveProperty('get');
      expect(instance).toHaveProperty('post');
      expect(instance).toHaveProperty('put');
      expect(instance).toHaveProperty('delete');
      expect(instance).toHaveProperty('patch');
    });
  });
});