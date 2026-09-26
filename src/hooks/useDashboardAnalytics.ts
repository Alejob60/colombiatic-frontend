// src/hooks/useDashboardAnalytics.ts
// Custom hook for dashboard analytics data

import { useState, useEffect } from 'react';
import * as dashboardService from '@/services/misybot/dashboardServiceV2';

export interface DashboardData {
  summary: dashboardService.DashboardSummary | null;
  conversations: dashboardService.ConversationMetric[] | null;
  sales: dashboardService.SalesMetric[] | null;
  insights: dashboardService.LearningInsight[] | null;
  recommendations: dashboardService.CrossBusinessRecommendation[] | null;
  loading: boolean;
  error: string | null;
}

export const useDashboardAnalytics = () => {
  const [data, setData] = useState<DashboardData>({
    summary: null,
    conversations: null,
    sales: null,
    insights: null,
    recommendations: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        // Fetch all dashboard data in parallel
        const [
          summary,
          conversations,
          sales,
          insights,
          recommendations
        ] = await Promise.all([
          dashboardService.getDashboardSummary(),
          dashboardService.getConversationMetrics(),
          dashboardService.getSalesMetrics(),
          dashboardService.getLearningInsights(),
          dashboardService.getCrossBusinessRecommendations()
        ]);
        
        setData({
          summary,
          conversations,
          sales,
          insights,
          recommendations,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load dashboard data'
        }));
      }
    };
    
    fetchData();
  }, []);
  
  const refreshData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch all dashboard data in parallel
      const [
        summary,
        conversations,
        sales,
        insights,
        recommendations
      ] = await Promise.all([
        dashboardService.getDashboardSummary(),
        dashboardService.getConversationMetrics(),
        dashboardService.getSalesMetrics(),
        dashboardService.getLearningInsights(),
        dashboardService.getCrossBusinessRecommendations()
      ]);
      
      setData({
        summary,
        conversations,
        sales,
        insights,
        recommendations,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh dashboard data'
      }));
    }
  };
  
  return {
    ...data,
    refreshData
  };
};

export default useDashboardAnalytics;