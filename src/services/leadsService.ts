import api from './api';

// Tipos para los leads
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: 'contacto' | 'presentacion' | 'negociacion' | 'cierre';
  value: number;
  lastContact: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para las etapas del pipeline
export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
}

// Servicio para manejar los leads
export const leadsService = {
  // Obtener todos los leads
  async getLeads(): Promise<Lead[]> {
    try {
      const response = await api.makeRequest('/leads', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  // Crear un nuevo lead
  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    try {
      const response = await api.makeRequest('/leads', {
        method: 'POST',
        body: JSON.stringify(lead)
      });
      return response;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Actualizar un lead
  async updateLead(id: string, lead: Partial<Lead>): Promise<Lead> {
    try {
      const response = await api.makeRequest(`/leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify(lead)
      });
      return response;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },

  // Eliminar un lead
  async deleteLead(id: string): Promise<void> {
    try {
      await api.makeRequest(`/leads/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },

  // Mover un lead a una nueva etapa
  async moveLead(id: string, newStage: string): Promise<Lead> {
    try {
      const response = await api.makeRequest(`/leads/${id}/move`, {
        method: 'PATCH',
        body: JSON.stringify({ stage: newStage })
      });
      return response;
    } catch (error) {
      console.error('Error moving lead:', error);
      throw error;
    }
  }
};

// Servicio para manejar las etapas del pipeline
export const pipelineStagesService = {
  // Obtener todas las etapas del pipeline
  async getStages(): Promise<PipelineStage[]> {
    try {
      const response = await api.makeRequest('/pipeline/stages', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching pipeline stages:', error);
      throw error;
    }
  },

  // Crear una nueva etapa
  async createStage(stage: Omit<PipelineStage, 'id'>): Promise<PipelineStage> {
    try {
      const response = await api.makeRequest('/pipeline/stages', {
        method: 'POST',
        body: JSON.stringify(stage)
      });
      return response;
    } catch (error) {
      console.error('Error creating pipeline stage:', error);
      throw error;
    }
  },

  // Actualizar una etapa
  async updateStage(id: string, stage: Partial<PipelineStage>): Promise<PipelineStage> {
    try {
      const response = await api.makeRequest(`/pipeline/stages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(stage)
      });
      return response;
    } catch (error) {
      console.error('Error updating pipeline stage:', error);
      throw error;
    }
  },

  // Eliminar una etapa
  async deleteStage(id: string): Promise<void> {
    try {
      await api.makeRequest(`/pipeline/stages/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting pipeline stage:', error);
      throw error;
    }
  }
};