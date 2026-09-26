// src/app/dashboard/web-builder/seo/robots-txt.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Save, FileText, Download } from 'lucide-react';

export default function RobotsTxtGenerator() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [isSaving, setIsSaving] = useState(false);
  const [robotsContent, setRobotsContent] = useState(`User-agent: *
Disallow: /admin/
Disallow: /private/

User-agent: Googlebot
Allow: /

Sitemap: https://${website?.domain || 'example.com'}/sitemap.xml`);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving robots.txt
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const downloadRobotsTxt = () => {
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          {t('webBuilder.seo.robots.title')}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={downloadRobotsTxt}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            <Download className="h-4 w-4 mr-1" />
            {t('webBuilder.seo.robots.download')}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? t('webBuilder.seo.robots.saving') : t('webBuilder.seo.robots.save')}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t('webBuilder.seo.robots.content')}
        </label>
        <textarea
          value={robotsContent}
          onChange={(e) => setRobotsContent(e.target.value)}
          rows={12}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="mt-4 p-3 bg-gray-750 rounded-lg">
        <h4 className="font-medium text-white mb-2">{t('webBuilder.seo.robots.help.title')}</h4>
        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
          <li>{t('webBuilder.seo.robots.help.userAgent')}</li>
          <li>{t('webBuilder.seo.robots.help.disallow')}</li>
          <li>{t('webBuilder.seo.robots.help.allow')}</li>
          <li>{t('webBuilder.seo.robots.help.sitemap')}</li>
        </ul>
      </div>
    </div>
  );
}