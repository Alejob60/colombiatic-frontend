// src/components/services/ServiceActionsPopup.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Power, 
  Settings, 
  FileText, 
  CreditCard, 
  Link2, 
  Play, 
  BarChart3,
  X
} from 'lucide-react';
import { Service } from '@/hooks/useServicesData';

interface ServiceActionsPopupProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onAction: (action: string, serviceId: string) => void;
}

const actionConfig: { [key: string]: { icon: any; label: string; color: string } } = {
  activar: { icon: Power, label: 'Activar servicio', color: 'text-green-400' },
  desactivar: { icon: Power, label: 'Desactivar servicio', color: 'text-red-400' },
  configurar: { icon: Settings, label: 'Configurar', color: 'text-blue-400' },
  ver_docs: { icon: FileText, label: 'Ver documentación', color: 'text-purple-400' },
  asignar_plan: { icon: CreditCard, label: 'Asignar plan', color: 'text-yellow-400' },
  integrar: { icon: Link2, label: 'Integrar al tenant', color: 'text-cyan-400' },
  probar: { icon: Play, label: 'Probar', color: 'text-pink-400' },
  metricas: { icon: BarChart3, label: 'Ver métricas', color: 'text-orange-400' }
};

export default function ServiceActionsPopup({ 
  service, 
  isOpen, 
  onClose, 
  position,
  onAction 
}: ServiceActionsPopupProps) {
  
  const handleAction = (action: string) => {
    onAction(action, service.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", duration: 0.3 }}
            style={{
              position: 'fixed',
              left: Math.min(position.x, window.innerWidth - 280),
              top: Math.min(position.y, window.innerHeight - 400),
            }}
            className="z-50 w-72"
          >
            {/* Glass morphism container */}
            <div className="rounded-2xl bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-700/50 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Acciones</h3>
                  <p className="text-xs text-gray-400 truncate">{service.name}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Actions list */}
              <div className="p-2 max-h-96 overflow-y-auto">
                {service.actions.map((action, index) => {
                  const config = actionConfig[action];
                  if (!config) return null;

                  const Icon = config.icon;

                  return (
                    <motion.button
                      key={action}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAction(action)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-700/50 transition-all duration-200 group"
                    >
                      <div className={`p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-700 transition-colors ${config.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {config.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-700/50 bg-gray-900/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Estado:</span>
                  <span className={`px-2 py-1 rounded-full ${
                    service.active 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    {service.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
