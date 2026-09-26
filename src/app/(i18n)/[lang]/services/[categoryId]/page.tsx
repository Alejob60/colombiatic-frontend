// src/app/(i18n)/[lang]/services/[categoryId]/page.tsx
"use client";

import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useServicesData, Service } from '@/hooks/useServicesData';
import ServiceListItem from '@/components/services/ServiceListItem';
import ServiceActionsPopup from '@/components/services/ServiceActionsPopup';
import { useToast } from '@/contexts/ToastContext';

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId as string;
  const { getCategoryById, toggleServiceActive } = useServicesData();
  const { showToast } = useToast();
  
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const category = getCategoryById(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Categoría no encontrada</h2>
          <button
            onClick={() => router.push('/services')}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Volver a Servicios
          </button>
        </div>
      </div>
    );
  }

  const handleOpenActions = (service: Service, position: { x: number; y: number }) => {
    setSelectedService(service);
    setPopupPosition(position);
    setIsPopupOpen(true);
  };

  const handleAction = (action: string, serviceId: string) => {
    console.log(`Action: ${action} for service: ${serviceId}`);
    
    // Handle different actions
    switch (action) {
      case 'activar':
        toggleServiceActive(categoryId, serviceId);
        showToast('Servicio activado exitosamente', 'success');
        break;
      case 'desactivar':
        toggleServiceActive(categoryId, serviceId);
        showToast('Servicio desactivado', 'info');
        break;
      case 'configurar':
        showToast('Abriendo configuración...', 'info');
        // TODO: Navigate to configuration page
        break;
      case 'ver_docs':
        showToast('Abriendo documentación...', 'info');
        // TODO: Open documentation
        break;
      case 'asignar_plan':
        showToast('Abriendo asignación de plan...', 'info');
        // TODO: Open plan assignment
        break;
      case 'integrar':
        showToast('Iniciando integración...', 'info');
        // TODO: Start integration process
        break;
      case 'probar':
        showToast('Iniciando prueba...', 'info');
        // TODO: Start test
        break;
      case 'metricas':
        showToast('Cargando métricas...', 'info');
        // TODO: Navigate to metrics
        break;
      default:
        showToast(`Acción ${action} ejecutada`, 'info');
    }
  };

  const activeCount = category.services.filter(s => s.active).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/services')}
                  className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      {category.name}
                    </h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.gradient} text-white`}>
                      {category.services.length} servicios
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{activeCount}</div>
                  <div className="text-xs text-gray-400">Activos</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-500">{category.services.length - activeCount}</div>
                  <div className="text-xs text-gray-400">Inactivos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats cards mobile */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">{activeCount}</div>
              <div className="text-xs text-gray-400">Servicios Activos</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <div className="text-2xl font-bold text-gray-400 mb-1">{category.services.length - activeCount}</div>
              <div className="text-xs text-gray-400">Servicios Inactivos</div>
            </div>
          </div>

          {/* Services list */}
          <div className="space-y-3">
            {category.services.map((service, index) => (
              <ServiceListItem
                key={service.id}
                service={service}
                index={index}
                onOpenActions={handleOpenActions}
              />
            ))}
          </div>

          {/* Empty state */}
          {category.services.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No hay servicios disponibles
              </h3>
              <p className="text-gray-500">
                Próximamente agregaremos más servicios a esta categoría
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions Popup */}
      {selectedService && (
        <ServiceActionsPopup
          service={selectedService}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          position={popupPosition}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
