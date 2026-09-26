// src/app/dashboard/web-builder/publish/realtime-status.tsx
"use client";

import { useState, useEffect } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Wifi, Server, Database, Cloud, Activity } from 'lucide-react';

export default function RealtimePublishStatus() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [status, setStatus] = useState({
    build: 'completed',
    deploy: 'in-progress',
    cdn: 'active',
    database: 'connected',
    ssl: 'active'
  });
  const [activityLog, setActivityLog] = useState([
    { id: 1, message: t('webBuilder.publish.realtime.log.buildStarted'), time: '10:30:25', status: 'info' },
    { id: 2, message: t('webBuilder.publish.realtime.log.buildCompleted'), time: '10:32:15', status: 'success' },
    { id: 3, message: t('webBuilder.publish.realtime.log.deployStarted'), time: '10:32:20', status: 'info' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new log entries
      if (Math.random() > 0.7) {
        const newLog = {
          id: activityLog.length + 1,
          message: t('webBuilder.publish.realtime.log.deployProgress'),
          time: new Date().toLocaleTimeString(),
          status: 'info'
        };
        setActivityLog(prev => [...prev.slice(-4), newLog]);
      }
      
      // Randomly update status
      if (Math.random() > 0.9) {
        setStatus(prev => ({
          ...prev,
          deploy: 'completed',
          cdn: 'syncing'
        }));
        
        setTimeout(() => {
          setStatus(prev => ({
            ...prev,
            cdn: 'active'
          }));
          
          const completedLog = {
            id: activityLog.length + 2,
            message: t('webBuilder.publish.realtime.log.deployCompleted'),
            time: new Date().toLocaleTimeString(),
            status: 'success'
          };
          setActivityLog(prev => [...prev.slice(-4), completedLog]);
        }, 2000);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activityLog.length, t]);

  const getStatusIcon = (serviceStatus: string) => {
    switch (serviceStatus) {
      case 'active':
      case 'completed':
        return <div className="w-3 h-3 rounded-full bg-green-500"></div>;
      case 'in-progress':
        return <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>;
      case 'error':
        return <div className="w-3 h-3 rounded-full bg-red-500"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-500"></div>;
    }
  };

  const getLogIcon = (logStatus: string) => {
    switch (logStatus) {
      case 'success':
        return <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>;
      case 'error':
        return <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>;
      default:
        return <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 mt-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <Activity className="h-5 w-5 mr-2 text-primary" />
        {t('webBuilder.publish.realtime.title')}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <Wifi className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-xs text-gray-400 mb-1">{t('webBuilder.publish.realtime.services.build')}</p>
          {getStatusIcon(status.build)}
        </div>
        
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <Cloud className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-xs text-gray-400 mb-1">{t('webBuilder.publish.realtime.services.deploy')}</p>
          {getStatusIcon(status.deploy)}
        </div>
        
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <Server className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-xs text-gray-400 mb-1">{t('webBuilder.publish.realtime.services.cdn')}</p>
          {getStatusIcon(status.cdn)}
        </div>
        
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <Database className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-xs text-gray-400 mb-1">{t('webBuilder.publish.realtime.services.database')}</p>
          {getStatusIcon(status.database)}
        </div>
        
        <div className="bg-gray-750 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-1">{t('webBuilder.publish.realtime.services.ssl')}</p>
          {getStatusIcon(status.ssl)}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-white mb-3">{t('webBuilder.publish.realtime.activity')}</h4>
        <div className="space-y-3">
          {activityLog.map((log) => (
            <div key={log.id} className="flex">
              {getLogIcon(log.status)}
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-300">{log.message}</p>
                <p className="text-xs text-gray-500">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}