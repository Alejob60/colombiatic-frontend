// src/components/ErrorBoundary.tsx
"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Actualiza el estado para mostrar la interfaz de recuperación
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de recuperación
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-white mb-4">¡Ups! Algo salió mal</h2>
              <p className="text-gray-300 mb-4">
                Ocurrió un error inesperado. Esto puede deberse a un problema de carga de recursos.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error?.message || 'Error desconocido'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Recargar página
                </button>
                <button
                  onClick={() => {
                    // Limpiar el estado y volver a intentar
                    this.setState({ hasError: false, error: undefined });
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export function ChunkLoadErrorBoundary({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Problema de Carga</h2>
            <p className="text-gray-300 mb-4">
              No se pudieron cargar algunos recursos de la aplicación. Esto puede deberse a un problema de red o caché.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Recargar página
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundary;