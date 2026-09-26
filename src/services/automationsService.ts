import api from './api';

// Tipos para las automatizaciones
export interface Automation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
  trigger: {
    type: string;
    conditions: any[];
  };
  actions: any[];
  schedule?: {
    frequency: string;
    time: string;
  };
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  nextRun?: string;
}

// Tipos para los triggers disponibles
export interface TriggerTemplate {
  id: string;
  name: string;
  description: string;
  parameters: string[];
}

// Tipos para las acciones disponibles
export interface ActionTemplate {
  id: string;
  name: string;
  description: string;
  parameters: string[];
}

// Servicio para manejar las automatizaciones
export const automationsService = {
  // Obtener todas las automatizaciones
  async getAutomations(): Promise<Automation[]> {
    try {
      const response = await api.makeRequest('/automations', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching automations:', error);
      throw error;
    }
  },

  // Crear una nueva automatización
  async createAutomation(automation: Omit<Automation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Automation> {
    try {
      const response = await api.makeRequest('/automations', {
        method: 'POST',
        body: JSON.stringify(automation)
      });
      return response;
    } catch (error) {
      console.error('Error creating automation:', error);
      throw error;
    }
  },

  // Actualizar una automatización
  async updateAutomation(id: string, automation: Partial<Automation>): Promise<Automation> {
    try {
      const response = await api.makeRequest(`/automations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(automation)
      });
      return response;
    } catch (error) {
      console.error('Error updating automation:', error);
      throw error;
    }
  },

  // Eliminar una automatización
  async deleteAutomation(id: string): Promise<void> {
    try {
      await api.makeRequest(`/automations/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting automation:', error);
      throw error;
    }
  },

  // Activar/desactivar una automatización
  async toggleAutomationStatus(id: string): Promise<Automation> {
    try {
      const response = await api.makeRequest(`/automations/${id}/toggle`, { method: 'PATCH' });
      return response;
    } catch (error) {
      console.error('Error toggling automation status:', error);
      throw error;
    }
  },

  // Ejecutar una automatización manualmente
  async runAutomation(id: string): Promise<void> {
    try {
      await api.makeRequest(`/automations/${id}/run`, { method: 'POST' });
    } catch (error) {
      console.error('Error running automation:', error);
      throw error;
    }
  }
};

// Servicio para obtener templates de triggers y acciones
export const automationTemplatesService = {
  // Obtener todos los triggers disponibles
  async getTriggerTemplates(): Promise<TriggerTemplate[]> {
    try {
      const response = await api.makeRequest('/automation-templates/triggers', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching trigger templates:', error);
      throw error;
    }
  },

  // Obtener todas las acciones disponibles
  async getActionTemplates(): Promise<ActionTemplate[]> {
    try {
      const response = await api.makeRequest('/automation-templates/actions', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching action templates:', error);
      throw error;
    }
  }
};