// src/app/(i18n)/[lang]/(dashboard)/monitoring/page.tsx
// System Monitoring Dashboard

"use client";

import React, { useState, useEffect } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { Button } from '@/components/ui/Button';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Database,
  Server,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { enhancedApiClient } from '@/lib/enhancedApiClient';

const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [errorReports, setErrorReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching monitoring data
    const fetchMonitoringData = () => {
      // In a real implementation, this would fetch from the monitoring API
      // For now, we'll use mock data
      
      const mockMetrics = {
        uptime: 99.95,
        responseTime: 124,
        requestsPerMinute: 1250,
        errorRate: 0.02,
        activeUsers: 42,
        cpuUsage: 45,
        memoryUsage: 67,
        databaseConnections: 24
      };
      
      const mockErrorReports = [
        {
          id: '1',
          timestamp: '2025-11-26T10:30:00Z',
          error: 'Timeout Error',
          url: '/api/users/profile',
          method: 'GET',
          statusCode: 504
        },
        {
          id: '2',
          timestamp: '2025-11-26T09:15:00Z',
          error: 'Database Connection Error',
          url: '/api/analytics/data',
          method: 'POST',
          statusCode: 500
        }
      ];
      
      setMetrics(mockMetrics);
      setErrorReports(mockErrorReports);
      setIsLoading(false);
    };
    
    fetchMonitoringData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMonitoringData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRunDiagnostics = () => {
    // Simulate running diagnostics
    alert('Diagnostics started. Results will be available shortly.');
  };

  const handleClearErrors = () => {
    // Clear error reports
    setErrorReports([]);
    enhancedApiClient.clearMetrics();
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-white">System Monitoring</h1>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleClearErrors} variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Clear Logs
          </Button>
          <Button onClick={handleRunDiagnostics}>
            <Activity className="h-4 w-4 mr-2" />
            Run Diagnostics
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Uptime</p>
              <p className="text-2xl font-bold">{metrics?.uptime}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Response Time</p>
              <p className="text-2xl font-bold">{metrics?.responseTime}ms</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Requests/min</p>
              <p className="text-2xl font-bold">{metrics?.requestsPerMinute}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Error Rate</p>
              <p className="text-2xl font-bold">{metrics?.errorRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">CPU Usage</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Current</span>
            <span className="text-white">{metrics?.cpuUsage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${metrics?.cpuUsage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Memory Usage</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Current</span>
            <span className="text-white">{metrics?.memoryUsage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${metrics?.memoryUsage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Active Users</h3>
          <div className="flex items-center justify-center h-16">
            <div className="text-3xl font-bold text-primary">{metrics?.activeUsers}</div>
          </div>
        </div>
      </div>

      {/* Error Reports */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Errors</h3>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {errorReports.length} errors
          </span>
        </div>
        
        {errorReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Error</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Endpoint</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {errorReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {new Date(report.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {report.error}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      <span className="font-mono">{report.method}</span> {report.url}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-300">
                        {report.statusCode}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-400">No errors detected in the last 24 hours</p>
          </div>
        )}
      </div>

      {/* Performance Charts */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Performance Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-900 rounded-lg">
          <p className="text-gray-400">Performance charts would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MonitoringDashboard);