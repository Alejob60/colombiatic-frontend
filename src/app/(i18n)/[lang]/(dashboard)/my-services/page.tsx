// src/app/(i18n)/[lang]/(dashboard)/my-services/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Play,
  Pause,
  Settings,
  BarChart3
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastUsed: string;
  usage: number;
}

function MyServicesPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching services
    setTimeout(() => {
      setServices([
        {
          id: '1',
          name: 'Chatbot Inteligente',
          description: 'Asistente virtual para atención al cliente',
          status: 'active',
          createdAt: '2023-01-15',
          lastUsed: '2023-06-20',
          usage: 85
        },
        {
          id: '2',
          name: 'Analizador de Sentimientos',
          description: 'Análisis avanzado de emociones en texto',
          status: 'active',
          createdAt: '2023-03-22',
          lastUsed: '2023-06-19',
          usage: 65
        },
        {
          id: '3',
          name: 'Generador de Contenido',
          description: 'Creación automática de artículos y publicaciones',
          status: 'inactive',
          createdAt: '2023-05-10',
          lastUsed: '2023-05-15',
          usage: 20
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Mis Servicios</h1>
            <p className="text-gray-400">Gestiona tus servicios de inteligencia artificial</p>
          </div>
          <button 
            onClick={() => router.push('/services')}
            className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Servicio
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No tienes servicios aún</h3>
          <p className="text-gray-400 mb-4">Comienza agregando tu primer servicio de inteligencia artificial</p>
          <button 
            onClick={() => router.push('/services')}
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Explorar Servicios
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                </div>
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-gray-700 text-gray-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                <span className="text-sm text-gray-300">{getStatusText(service.status)}</span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Uso</span>
                  <span className="text-white">{service.usage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${service.usage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-6">
                <div>
                  <div>Creado</div>
                  <div className="text-white">{service.createdAt}</div>
                </div>
                <div>
                  <div>Último uso</div>
                  <div className="text-white">{service.lastUsed}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  Métricas
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  Configurar
                </button>
              </div>

              <div className="flex gap-2 mt-3">
                {service.status === 'active' ? (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                    <Pause className="w-4 h-4" />
                    Pausar
                  </button>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                    Activar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(MyServicesPage);