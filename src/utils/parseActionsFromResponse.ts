// src/utils/parseActionsFromResponse.ts

export interface AgentAction {
  type: string;
  target?: string;
  params?: Record<string, any>;
}

/**
 * Parsea acciones desde la respuesta del Meta-Agente
 * Soporta dos formatos:
 * 1. Array directo: { actions: [...] }
 * 2. XML tags: <ACTION>{"type":"...", ...}</ACTION>
 */
export function parseActionsFromResponse(response: any): AgentAction[] {
  const actions: AgentAction[] = [];

  // Formato 1: Array directo de acciones
  if (response.actions && Array.isArray(response.actions)) {
    actions.push(...response.actions);
  }

  // Formato 2: Buscar tags <ACTION>...</ACTION> en responseText
  if (response.responseText && typeof response.responseText === 'string') {
    const actionRegex = /<ACTION>(.*?)<\/ACTION>/gs;
    let match;

    while ((match = actionRegex.exec(response.responseText)) !== null) {
      try {
        const actionJson = match[1].trim();
        const action = JSON.parse(actionJson);
        actions.push(action);
      } catch (error) {
        console.error('[parseActions] Error parsing ACTION tag:', match[1], error);
      }
    }
  }

  console.log('[parseActions] Acciones parseadas:', actions);
  return actions;
}

/**
 * Limpia el responseText removiendo los tags <ACTION>...</ACTION>
 * para mostrar solo el texto limpio al usuario
 */
export function cleanResponseText(responseText: string): string {
  if (!responseText) return '';
  
  return responseText
    .replace(/<ACTION>.*?<\/ACTION>/gs, '')
    .trim();
}
