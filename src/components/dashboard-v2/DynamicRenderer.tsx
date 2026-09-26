// src/components/dashboard-v2/DynamicRenderer.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore, DynamicView } from '@/store/useDashboardStore';
import { Loader2, AlertCircle } from 'lucide-react';

// Import view components
import ServiceDetailView from './views/ServiceDetailView';
import ProductDetailView from './views/ProductDetailView';
import ServiceActivationView from './views/ServiceActivationView';
import CatalogListView from './views/CatalogListView';

interface DynamicRendererProps {
  children?: React.ReactNode;
}

export default function DynamicRenderer({ children }: DynamicRendererProps) {
  const { currentView, setCurrentView } = useDashboardStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for view changes
  useEffect(() => {
    if (currentView) {
      setLoading(true);
      setError(null);

      // Simulate loading for smooth transition
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Render dynamic view based on type
  const renderView = (view: DynamicView) => {
    try {
      switch (view.type) {
        case 'service_detail':
          return <ServiceDetailView data={view.data} />;

        case 'product_detail':
          return <ProductDetailView data={view.data} />;

        case 'service_activation':
          return <ServiceActivationView data={view.data} />;

        case 'catalog_list':
          return <CatalogListView data={view.data} />;

        case 'custom':
          // Custom view with raw data
          return (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Vista Personalizada</h2>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-auto text-sm text-gray-300">
                {JSON.stringify(view.data, null, 2)}
              </pre>
            </div>
          );

        default:
          throw new Error(`Tipo de vista desconocido: ${view.type}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al renderizar la vista');
      return null;
    }
  };

  // Loading state
  if (loading && currentView) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando vista...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Error al cargar la vista</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setCurrentView(null);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Volver
          </button>
        </motion.div>
      </div>
    );
  }

  // Dynamic view or children
  return (
    <motion.div
      key={currentView?.type || 'default'}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-auto"
    >
      {currentView ? (
        <div className="relative">
          {/* Close button */}
          <button
            onClick={() => setCurrentView(null)}
            className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
          >
            Cerrar
          </button>

          {renderView(currentView)}
        </div>
      ) : (
        // Default content (children)
        children || (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">Panel dinámico</p>
              <p className="text-sm">El contenido aparecerá aquí cuando interactúes con tu IA Personal</p>
            </div>
          </div>
        )
      )}
    </motion.div>
  );
}
