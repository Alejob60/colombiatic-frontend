// src/app/dashboard/web-builder/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import TemplateSelector from './templates/page';
import WebsiteBuilder from '@/components/website-builder/WebsiteBuilder';
import WebsitePreview from '@/components/website-builder/WebsitePreview';

export default function WebBuilderPage() {
  const { t } = useTranslations();
  const { website, createWebsite, loading } = useWebsiteBuilder();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [domain, setDomain] = useState('');

  useEffect(() => {
    if (!website) {
      setShowTemplateSelector(true);
    }
  }, [website]);

  const handleCreateWebsite = async () => {
    if (siteName && domain) {
      const success = await createWebsite(siteName, domain);
      if (success) {
        setShowTemplateSelector(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-400">{t('webBuilder.loading')}</p>
        </div>
      </div>
    );
  }

  if (showTemplateSelector || !website) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">{t('webBuilder.title')}</h1>
          <p className="text-gray-400 mb-8">{t('webBuilder.description')}</p>
          
          <div className="bg-surface rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{t('webBuilder.createSite')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('webBuilder.siteName')}
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t('webBuilder.siteNamePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('webBuilder.domain')}
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="midominio.com"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleCreateWebsite}
                disabled={!siteName || !domain}
                className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {t('webBuilder.createButton')}
              </button>
            </div>
          </div>
          
          <TemplateSelector />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('webBuilder.editorTitle')}</h1>
            <p className="text-gray-400">{t('webBuilder.editorDescription')}</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              {t('webBuilder.preview')}
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              {t('webBuilder.publish')}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WebsiteBuilder />
          </div>
          <div className="lg:col-span-1">
            <WebsitePreview />
          </div>
        </div>
      </div>
    </div>
  );
}