// src/hooks/useAnalytics.ts
import { apiClient } from '@/lib/apiClient';

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  user_id?: string;
  session_id?: string;
}

export function useAnalytics() {
  const trackEvent = async (event: AnalyticsEvent) => {
    try {
      await apiClient.post('/analytics/event', {
        ...event,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  };

  const trackPageView = (page: string) => {
    trackEvent({
      event_type: 'page_view',
      event_data: { page },
    });
  };

  const trackUserAction = (action: string, data?: Record<string, any>) => {
    trackEvent({
      event_type: 'user_action',
      event_data: { action, ...data },
    });
  };

  const trackLogin = () => {
    trackEvent({
      event_type: 'login',
    });
  };

  const trackRegistration = () => {
    trackEvent({
      event_type: 'registration',
    });
  };

  const trackDemoUsage = (demoType: string, duration: number) => {
    trackEvent({
      event_type: 'demo_usage',
      event_data: { demoType, duration },
    });
  };

  const trackLeadGeneration = (source: string) => {
    trackEvent({
      event_type: 'lead_generation',
      event_data: { source },
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackUserAction,
    trackLogin,
    trackRegistration,
    trackDemoUsage,
    trackLeadGeneration,
  };
}