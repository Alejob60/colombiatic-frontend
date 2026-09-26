// src/app/dashboard/web-builder/publish/page.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Play, CheckCircle, AlertCircle, Loader, ExternalLink, History, Settings } from 'lucide-react';

export default function PublishManager() {
  const { t } = useTranslations();
  const { website, publishWebsite } = useWebsiteBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [publishLogs, setPublishLogs] = useState<string[]>([]);

  const handlePublish = async () => {
    if (!website) return;
    
    setIsPublishing(true);
    setPublishStatus('publishing');
    setPublishLogs([t('webBuilder.publish.started')]);
    
    try {
      // Simulate build process
      setPublishLogs(prev => [...prev, t('webBuilder.publish.building')]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate deployment process
      setPublishLogs(prev => [...prev, t('webBuilder.publish.deploying')]);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Call publish function
      const success = await publishWebsite();
      
      if (success) {
        setPublishStatus('success');
        setPublishLogs(prev => [...prev, t('webBuilder.publish.success')]);
      } else {
        throw new Error(t('webBuilder.publish.error'));
      }
    } catch (error) {
      setPublishStatus('error');
      setPublishLogs(prev => [...prev, t('webBuilder.publish.error')]);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!website) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('webBuilder.publish.noWebsite')}</h2>
        <p className="text-gray-400 mb-6">
          {t('webBuilder.publish.createWebsiteFirst')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t('webBuilder.publish.title')}</h2>
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="flex items-center bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          <Play className="h-4 w-4 mr-2" />
          {isPublishing ? t('webBuilder.publish.publishing') : t('webBuilder.publish.publishButton')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Publish Status */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.publish.status.title')}</h3>
          
          <div className="mb-6 p-4 rounded-lg bg-gray-750">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {publishStatus === 'idle' && (
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                )}
                {publishStatus === 'publishing' && (
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
                )}
                {publishStatus === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                )}
                {publishStatus === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="font-medium text-white">
                  {publishStatus === 'idle' && t('webBuilder.publish.status.idle')}
                  {publishStatus === 'publishing' && t('webBuilder.publish.status.publishing')}
                  {publishStatus === 'success' && t('webBuilder.publish.status.success')}
                  {publishStatus === 'error' && t('webBuilder.publish.status.error')}
                </span>
              </div>
              {website && (
                <a 
                  href={`https://${website.domain}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-blue-400 transition-colors text-sm"
                >
                  {t('webBuilder.publish.visitSite')}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
            </div>
            
            {publishLogs.length > 0 && (
              <div className="mt-4 space-y-2">
                {publishLogs.map((log, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {log.includes(t('webBuilder.publish.error')) ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="ml-2 text-gray-300 text-sm">{log}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <History className="h-4 w-4 mr-2" />
              {t('webBuilder.publish.deploymentHistory')}
            </button>
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <Settings className="h-4 w-4 mr-2" />
              {t('webBuilder.publish.publishSettings')}
            </button>
          </div>
        </div>

        {/* Site Information */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.publish.siteInfo.title')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {t('webBuilder.publish.siteInfo.name')}
              </label>
              <p className="text-white">{website.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {t('webBuilder.publish.siteInfo.domain')}
              </label>
              <p className="text-white">{website.domain}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {t('webBuilder.publish.siteInfo.lastPublished')}
              </label>
              <p className="text-white">
                {website.updatedAt 
                  ? new Date(website.updatedAt).toLocaleString() 
                  : t('webBuilder.publish.siteInfo.never')}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {t('webBuilder.publish.siteInfo.sections')}
              </label>
              <p className="text-white">{website.sections.length}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {t('webBuilder.publish.siteInfo.theme')}
              </label>
              <p className="text-white capitalize">{website.theme}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}