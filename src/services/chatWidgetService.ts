// src/services/chatWidgetService.ts
// Universal chat widget service for ColombiaTIC AI

import axios from 'axios';

/**
 * Generate universal chat widget script
 * @param clientId - The client ID for the widget
 * @param options - Additional configuration options
 * @returns The HTML script tag for the chat widget
 */
export function generateChatWidgetScript(
  clientId: string,
  options?: {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    theme?: 'light' | 'dark';
    primaryColor?: string;
  }
): string {
  const params = new URLSearchParams();
  params.set('client', clientId);
  
  if (options?.position) {
    params.set('position', options.position);
  }
  
  if (options?.theme) {
    params.set('theme', options.theme);
  }
  
  if (options?.primaryColor) {
    params.set('primaryColor', options.primaryColor);
  }
  
  const queryString = params.toString();
  const src = `https://cdn.colombiatic.ai/widget.js${queryString ? `?${queryString}` : ''}`;
  
  return `<script src="${src}" async></script>`;
}

/**
 * Get chat widget configuration for a client
 * @param clientId - The client ID
 * @returns The widget configuration
 */
export async function getWidgetConfig(clientId: string): Promise<any> {
  try {
    const response = await axios.get(`https://cdn.colombiatic.ai/config/${clientId}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching widget config:', error);
    // Return default configuration
    return {
      position: 'bottom-right',
      theme: 'dark',
      primaryColor: '#3b82f6',
      greeting: '¡Hola! ¿En qué puedo ayudarte?',
      language: 'es'
    };
  }
}

/**
 * Validate client ID format
 * @param clientId - The client ID to validate
 * @returns Whether the client ID is valid
 */
export function validateClientId(clientId: string): boolean {
  // Client ID should be a non-empty string
  return typeof clientId === 'string' && clientId.length > 0 && clientId.length <= 100;
}

/**
 * Generate multiple widget scripts for different configurations
 * @param clientId - The client ID
 * @param configurations - Array of configuration options
 * @returns Array of HTML script tags
 */
export function generateMultipleWidgetScripts(
  clientId: string,
  configurations: Array<{
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    theme?: 'light' | 'dark';
    primaryColor?: string;
  }>
): string[] {
  return configurations.map(config => generateChatWidgetScript(clientId, config));
}

/**
 * Generate widget script with custom domain
 * @param clientId - The client ID
 * @param domain - Custom domain for the widget
 * @param options - Additional configuration options
 * @returns The HTML script tag for the chat widget
 */
export function generateCustomDomainWidgetScript(
  clientId: string,
  domain: string,
  options?: {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    theme?: 'light' | 'dark';
    primaryColor?: string;
  }
): string {
  const params = new URLSearchParams();
  params.set('client', clientId);
  
  if (options?.position) {
    params.set('position', options.position);
  }
  
  if (options?.theme) {
    params.set('theme', options.theme);
  }
  
  if (options?.primaryColor) {
    params.set('primaryColor', options.primaryColor);
  }
  
  const queryString = params.toString();
  const src = `${domain}/widget.js${queryString ? `?${queryString}` : ''}`;
  
  return `<script src="${src}" async></script>`;
}

export default {
  generateChatWidgetScript,
  getWidgetConfig,
  validateClientId,
  generateMultipleWidgetScripts,
  generateCustomDomainWidgetScript
};