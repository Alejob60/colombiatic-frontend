// src/hooks/useAgentActions.ts
import { useRouter } from 'next/navigation';
import { useChatSession } from './useChatSession';

export type AgentAction = 
  | { type: 'navigate'; payload: string }
  | { type: 'show_service_detail'; payload: string }
  | { type: 'checkout_link'; payload: string }
  | { type: 'save_context'; payload: any }
  | { type: 'create_order'; payload: any };

export const useAgentActions = () => {
  const router = useRouter();
  const { saveContext } = useChatSession();

  const parseAction = (actionString: string): AgentAction | null => {
    try {
      const action = JSON.parse(actionString);
      return action;
    } catch (error) {
      console.error('Error parsing agent action:', error);
      return null;
    }
  };

  const executeAction = (action: AgentAction) => {
    switch (action.type) {
      case 'navigate':
        router.push(action.payload);
        break;
        
      case 'show_service_detail':
        router.push(`/services/${action.payload}`);
        break;
        
      case 'checkout_link':
        // Abrir enlace de checkout en una nueva pestaña
        if (typeof window !== 'undefined') {
          window.open(action.payload, '_blank');
        }
        break;
        
      case 'save_context':
        saveContext(action.payload);
        break;
        
      case 'create_order':
        // Lógica para crear orden
        console.log('Creating order:', action.payload);
        // Aquí iría la llamada a la API para crear la orden
        break;
        
      default:
        console.warn('Unknown action type:', action);
    }
  };

  return {
    parseAction,
    executeAction
  };
};