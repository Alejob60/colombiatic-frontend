import api from './api';

// Tipos para las reglas de asignación
export interface AssignmentRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  criteria: AssignmentCriterion[];
  assignee: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

// Tipos para los criterios de asignación
export interface AssignmentCriterion {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

// Tipos para los representantes de ventas
export interface SalesRepresentative {
  id: string;
  name: string;
  email: string;
  leadsAssigned: number;
  capacity: number;
  territories?: string[];
  skills?: string[];
}

// Tipos para la configuración de asignación
export interface AssignmentConfiguration {
  balanceMethod: 'round_robin' | 'weighted' | 'skill_based';
  maxLeadsPerRep: number;
  responseTimeTargetHours: number;
  enableTerritoryAssignment: boolean;
  enableSkillBasedAssignment: boolean;
}

// Servicio para manejar las reglas de asignación
export const leadAssignmentService = {
  // Obtener todas las reglas de asignación
  async getAssignmentRules(): Promise<AssignmentRule[]> {
    try {
      const response = await api.makeRequest('/lead-assignment/rules', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching assignment rules:', error);
      throw error;
    }
  },

  // Crear una nueva regla de asignación
  async createAssignmentRule(rule: Omit<AssignmentRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<AssignmentRule> {
    try {
      const response = await api.makeRequest('/lead-assignment/rules', {
        method: 'POST',
        body: JSON.stringify(rule)
      });
      return response;
    } catch (error) {
      console.error('Error creating assignment rule:', error);
      throw error;
    }
  },

  // Actualizar una regla de asignación
  async updateAssignmentRule(id: string, rule: Partial<AssignmentRule>): Promise<AssignmentRule> {
    try {
      const response = await api.makeRequest(`/lead-assignment/rules/${id}`, {
        method: 'PUT',
        body: JSON.stringify(rule)
      });
      return response;
    } catch (error) {
      console.error('Error updating assignment rule:', error);
      throw error;
    }
  },

  // Eliminar una regla de asignación
  async deleteAssignmentRule(id: string): Promise<void> {
    try {
      await api.makeRequest(`/lead-assignment/rules/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting assignment rule:', error);
      throw error;
    }
  },

  // Activar/desactivar una regla de asignación
  async toggleAssignmentRuleStatus(id: string): Promise<AssignmentRule> {
    try {
      const response = await api.makeRequest(`/lead-assignment/rules/${id}/toggle`, { method: 'PATCH' });
      return response;
    } catch (error) {
      console.error('Error toggling assignment rule status:', error);
      throw error;
    }
  }
};

// Servicio para manejar los representantes de ventas
export const salesRepsService = {
  // Obtener todos los representantes de ventas
  async getSalesReps(): Promise<SalesRepresentative[]> {
    try {
      const response = await api.makeRequest('/sales-reps', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching sales representatives:', error);
      throw error;
    }
  },

  // Crear un nuevo representante de ventas
  async createSalesRep(rep: Omit<SalesRepresentative, 'id' | 'leadsAssigned'>): Promise<SalesRepresentative> {
    try {
      const response = await api.makeRequest('/sales-reps', {
        method: 'POST',
        body: JSON.stringify(rep)
      });
      return response;
    } catch (error) {
      console.error('Error creating sales representative:', error);
      throw error;
    }
  },

  // Actualizar un representante de ventas
  async updateSalesRep(id: string, rep: Partial<SalesRepresentative>): Promise<SalesRepresentative> {
    try {
      const response = await api.makeRequest(`/sales-reps/${id}`, {
        method: 'PUT',
        body: JSON.stringify(rep)
      });
      return response;
    } catch (error) {
      console.error('Error updating sales representative:', error);
      throw error;
    }
  },

  // Eliminar un representante de ventas
  async deleteSalesRep(id: string): Promise<void> {
    try {
      await api.makeRequest(`/sales-reps/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting sales representative:', error);
      throw error;
    }
  }
};

// Servicio para manejar la configuración de asignación
export const assignmentConfigService = {
  // Obtener la configuración de asignación
  async getConfiguration(): Promise<AssignmentConfiguration> {
    try {
      const response = await api.makeRequest('/lead-assignment/config', { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching assignment configuration:', error);
      throw error;
    }
  },

  // Actualizar la configuración de asignación
  async updateConfiguration(config: Partial<AssignmentConfiguration>): Promise<AssignmentConfiguration> {
    try {
      const response = await api.makeRequest('/lead-assignment/config', {
        method: 'PUT',
        body: JSON.stringify(config)
      });
      return response;
    } catch (error) {
      console.error('Error updating assignment configuration:', error);
      throw error;
    }
  }
};