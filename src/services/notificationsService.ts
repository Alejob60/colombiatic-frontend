import api from './api';

// Tipos para las notificaciones
export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'lead_assignment' | 'follow_up' | 'achievement' | 'system_alert' | 'team_update';
  status: 'read' | 'unread';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  channel: 'email' | 'push' | 'sms';
  userId: string;
  relatedEntityId?: string;
}

// Tipos para los recordatorios
export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  userId: string;
  relatedEntityId?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para la configuración de notificaciones
export interface NotificationSettings {
  email: {
    leadAssignments: boolean;
    followUps: boolean;
    achievements: boolean;
    systemAlerts: boolean;
    teamUpdates: boolean;
  };
  push: {
    reminders: boolean;
    teamUpdates: boolean;
    systemAlerts: boolean;
  };
  sms: {
    urgentAlerts: boolean;
    leadAssignments: boolean;
  };
}

// Servicio para manejar las notificaciones
export const notificationsService = {
  // Obtener todas las notificaciones del usuario
  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const response = await api.makeRequest(`/notifications?userId=${userId}`, { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Marcar una notificación como leída
  async markAsRead(id: string): Promise<Notification> {
    try {
      const response = await api.makeRequest(`/notifications/${id}/read`, { method: 'PATCH' });
      return response;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Marcar una notificación como no leída
  async markAsUnread(id: string): Promise<Notification> {
    try {
      const response = await api.makeRequest(`/notifications/${id}/unread`, { method: 'PATCH' });
      return response;
    } catch (error) {
      console.error('Error marking notification as unread:', error);
      throw error;
    }
  },

  // Eliminar una notificación
  async deleteNotification(id: string): Promise<void> {
    try {
      await api.makeRequest(`/notifications/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  // Marcar todas las notificaciones como leídas
  async markAllAsRead(userId: string): Promise<void> {
    try {
      await api.makeRequest(`/notifications/user/${userId}/mark-all-read`, { method: 'PATCH' });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }
};

// Servicio para manejar los recordatorios
export const remindersService = {
  // Obtener todos los recordatorios del usuario
  async getReminders(userId: string): Promise<Reminder[]> {
    try {
      const response = await api.makeRequest(`/reminders?userId=${userId}`, { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching reminders:', error);
      throw error;
    }
  },

  // Crear un nuevo recordatorio
  async createReminder(reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reminder> {
    try {
      const response = await api.makeRequest('/reminders', {
        method: 'POST',
        body: JSON.stringify(reminder)
      });
      return response;
    } catch (error) {
      console.error('Error creating reminder:', error);
      throw error;
    }
  },

  // Actualizar un recordatorio
  async updateReminder(id: string, reminder: Partial<Reminder>): Promise<Reminder> {
    try {
      const response = await api.makeRequest(`/reminders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(reminder)
      });
      return response;
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  },

  // Eliminar un recordatorio
  async deleteReminder(id: string): Promise<void> {
    try {
      await api.makeRequest(`/reminders/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  },

  // Marcar un recordatorio como completado/no completado
  async toggleCompletion(id: string): Promise<Reminder> {
    try {
      const response = await api.makeRequest(`/reminders/${id}/toggle`, { method: 'PATCH' });
      return response;
    } catch (error) {
      console.error('Error toggling reminder completion:', error);
      throw error;
    }
  }
};

// Servicio para manejar la configuración de notificaciones
export const notificationSettingsService = {
  // Obtener la configuración de notificaciones del usuario
  async getSettings(userId: string): Promise<NotificationSettings> {
    try {
      const response = await api.makeRequest(`/notification-settings/${userId}`, { method: 'GET' });
      return response;
    } catch (error) {
      console.error('Error fetching notification settings:', error);
      throw error;
    }
  },

  // Actualizar la configuración de notificaciones del usuario
  async updateSettings(userId: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    try {
      const response = await api.makeRequest(`/notification-settings/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      return response;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  }
};