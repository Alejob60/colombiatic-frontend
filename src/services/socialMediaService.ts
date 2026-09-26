import { api } from './api';

// Tipos para las publicaciones
export interface SocialPost {
  id: string;
  title: string;
  content: string;
  date: Date;
  platform: string;
  status: 'scheduled' | 'published' | 'draft';
  imageUrl?: string;
  linkPreview?: {
    url: string;
    title: string;
    description: string;
    image: string;
  };
}

// Tipos para los comentarios
export interface SocialComment {
  id: string;
  platform: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  isReplied: boolean;
}

// Tipos para las métricas
export interface SocialMetrics {
  totalReach: number;
  engagement: number;
  interactions: number;
  shares: number;
  followerGrowth: {
    name: string;
    followers: number;
  }[];
  engagementByPlatform: {
    name: string;
    facebook: number;
    instagram: number;
    twitter: number;
  }[];
}

// Tipos para los SmartLinks
export interface SmartLink {
  id: string;
  title: string;
  originalUrl: string;
  smartUrl: string;
  clicks: number;
  conversions: number;
  conversionRate: string;
  createdAt: string;
  utmParams?: {
    source: string;
    medium: string;
    campaign: string;
  };
}

// Tipos para los reportes
export interface SocialReport {
  id: string;
  title: string;
  period: string;
  status: 'generated' | 'pending' | 'failed';
  createdAt: string;
  format: 'PDF' | 'Excel' | 'CSV';
  recipients: string[];
  frequency?: string;
  nextRun?: string;
}

// Servicio para manejar las publicaciones en redes sociales
export const socialMediaService = {
  // Obtener todas las publicaciones
  async getPosts(): Promise<SocialPost[]> {
    try {
      const response = await api.get<SocialPost[]>('/social/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching social posts:', error);
      throw error;
    }
  },

  // Crear una nueva publicación
  async createPost(post: Omit<SocialPost, 'id'>): Promise<SocialPost> {
    try {
      const response = await api.post<SocialPost>('/social/posts', post);
      return response.data;
    } catch (error) {
      console.error('Error creating social post:', error);
      throw error;
    }
  },

  // Actualizar una publicación
  async updatePost(id: string, post: Partial<SocialPost>): Promise<SocialPost> {
    try {
      const response = await api.put<SocialPost>(`/social/posts/${id}`, post);
      return response.data;
    } catch (error) {
      console.error('Error updating social post:', error);
      throw error;
    }
  },

  // Eliminar una publicación
  async deletePost(id: string): Promise<void> {
    try {
      await api.delete(`/social/posts/${id}`);
    } catch (error) {
      console.error('Error deleting social post:', error);
      throw error;
    }
  },

  // Mover una publicación a una nueva fecha
  async movePost(id: string, newDate: Date): Promise<SocialPost> {
    try {
      const response = await api.patch<SocialPost>(`/social/posts/${id}/move`, { newDate });
      return response.data;
    } catch (error) {
      console.error('Error moving social post:', error);
      throw error;
    }
  }
};

// Servicio para manejar los comentarios de redes sociales
export const socialCommentsService = {
  // Obtener todos los comentarios
  async getComments(): Promise<SocialComment[]> {
    try {
      const response = await api.get<SocialComment[]>('/social/comments');
      return response.data;
    } catch (error) {
      console.error('Error fetching social comments:', error);
      throw error;
    }
  },

  // Dar like a un comentario
  async likeComment(id: string): Promise<void> {
    try {
      await api.post(`/social/comments/${id}/like`);
    } catch (error) {
      console.error('Error liking social comment:', error);
      throw error;
    }
  },

  // Responder a un comentario
  async replyToComment(id: string, reply: { text: string; isPrivate: boolean }): Promise<void> {
    try {
      await api.post(`/social/comments/${id}/reply`, reply);
    } catch (error) {
      console.error('Error replying to social comment:', error);
      throw error;
    }
  }
};

// Servicio para manejar las métricas de redes sociales
export const socialMetricsService = {
  // Obtener métricas generales
  async getMetrics(): Promise<SocialMetrics> {
    try {
      const response = await api.get<SocialMetrics>('/social/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching social metrics:', error);
      throw error;
    }
  }
};

// Servicio para manejar los SmartLinks
export const smartLinksService = {
  // Obtener todos los SmartLinks
  async getLinks(): Promise<SmartLink[]> {
    try {
      const response = await api.get<SmartLink[]>('/social/smartlinks');
      return response.data;
    } catch (error) {
      console.error('Error fetching smart links:', error);
      throw error;
    }
  },

  // Crear un nuevo SmartLink
  async createLink(link: Omit<SmartLink, 'id' | 'clicks' | 'conversions' | 'conversionRate' | 'createdAt'>): Promise<SmartLink> {
    try {
      const response = await api.post<SmartLink>('/social/smartlinks', link);
      return response.data;
    } catch (error) {
      console.error('Error creating smart link:', error);
      throw error;
    }
  },

  // Actualizar un SmartLink
  async updateLink(id: string, link: Partial<SmartLink>): Promise<SmartLink> {
    try {
      const response = await api.put<SmartLink>(`/social/smartlinks/${id}`, link);
      return response.data;
    } catch (error) {
      console.error('Error updating smart link:', error);
      throw error;
    }
  },

  // Eliminar un SmartLink
  async deleteLink(id: string): Promise<void> {
    try {
      await api.delete(`/social/smartlinks/${id}`);
    } catch (error) {
      console.error('Error deleting smart link:', error);
      throw error;
    }
  },

  // Copiar un SmartLink
  async copyLink(id: string): Promise<string> {
    try {
      const response = await api.post<{ url: string }>(`/social/smartlinks/${id}/copy`);
      return response.data.url;
    } catch (error) {
      console.error('Error copying smart link:', error);
      throw error;
    }
  }
};

// Servicio para manejar los reportes
export const socialReportsService = {
  // Obtener todos los reportes
  async getReports(): Promise<SocialReport[]> {
    try {
      const response = await api.get<SocialReport[]>('/social/reports');
      return response.data;
    } catch (error) {
      console.error('Error fetching social reports:', error);
      throw error;
    }
  },

  // Generar un nuevo reporte
  async generateReport(report: { type: string; startDate: string; endDate: string; format: string }): Promise<SocialReport> {
    try {
      const response = await api.post<SocialReport>('/social/reports/generate', report);
      return response.data;
    } catch (error) {
      console.error('Error generating social report:', error);
      throw error;
    }
  },

  // Programar un reporte automático
  async scheduleReport(report: { title: string; frequency: string; recipients: string[] }): Promise<SocialReport> {
    try {
      const response = await api.post<SocialReport>('/social/reports/schedule', report);
      return response.data;
    } catch (error) {
      console.error('Error scheduling social report:', error);
      throw error;
    }
  },

  // Descargar un reporte
  async downloadReport(id: string): Promise<Blob> {
    try {
      const response = await api.get(`/social/reports/${id}/download`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Error downloading social report:', error);
      throw error;
    }
  }
};