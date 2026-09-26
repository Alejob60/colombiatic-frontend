// src/hooks/useRestoreContextOnMount.ts
"use client";

import { useEffect, useRef } from 'react';
import { usePendingPurchase } from './usePendingPurchase';

interface UseRestoreContextOptions {
  isAuthenticated: boolean;
  sendMessage: (text: string, intent?: string) => Promise<void>;
  isInDashboard?: boolean;
}

/**
 * Hook para restaurar el contexto de compra después del login
 * Se ejecuta una sola vez al montar el componente Dashboard
 */
export function useRestoreContextOnMount(options: UseRestoreContextOptions) {
  const { isAuthenticated, sendMessage, isInDashboard = false } = options;
  const { getPendingPurchase, clearPendingPurchase } = usePendingPurchase();
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    // Solo ejecutar si:
    // 1. El usuario está autenticado
    // 2. Estamos en el dashboard
    // 3. No hemos restaurado el contexto todavía
    if (!isAuthenticated || !isInDashboard || hasRestoredRef.current) {
      return;
    }

    const pendingPurchase = getPendingPurchase();

    if (pendingPurchase) {
      console.log('[useRestoreContextOnMount] Restoring pending purchase context:', pendingPurchase);

      // Marcar como restaurado para evitar loops
      hasRestoredRef.current = true;

      // Esperar un momento para que el chat se monte correctamente
      setTimeout(() => {
        const restoreMessage = `El usuario acaba de iniciar sesión. Teníamos un contexto previo de compra del servicio ${pendingPurchase.selectedServiceId}. Resumen de la conversación: "${pendingPurchase.conversationSummary || 'El usuario quería comprar un servicio'}". Por favor, retoma la conversación y ofrece continuar con la compra.`;

        sendMessage(restoreMessage, 'purchase')
          .then(() => {
            // Limpiar el pending purchase después de restaurar
            clearPendingPurchase();
            console.log('[useRestoreContextOnMount] Context restored successfully');
          })
          .catch((error) => {
            console.error('[useRestoreContextOnMount] Error restoring context:', error);
          });
      }, 500);
    }
  }, [isAuthenticated, isInDashboard, sendMessage, getPendingPurchase, clearPendingPurchase]);

  return {
    hasRestored: hasRestoredRef.current,
  };
}
