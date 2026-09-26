// src/app/dashboard/web-builder/seo/sitemap-generator.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { RefreshCw, Download, FileText } from 'lucide-react';

export default function SitemapGenerator() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [isGenerating, setIsGenerating] = useState(false);
  const [sitemapContent, setSitemapContent] = useState('');
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const generateSitemap = async () => {
    setIsGenerating(true);
    
    // Simulate sitemap generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample sitemap content
    const baseUrl = `https://${website?.domain || 'example.com'}`;
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    xmlContent += `  <url>\n`;
    xmlContent += `    <loc>${baseUrl}/</loc>\n`;
    xmlContent += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xmlContent += `    <changefreq>daily</changefreq>\n`;
    xmlContent += `    <priority>1.0</priority>\n`;
    xmlContent += `  </url>\n`;
    
    // Add URLs for each section
    website?.sections.forEach((section, index) => {
      xmlContent += `  <url>\n`;
      xmlContent += `    <loc>${baseUrl}/${section.type}</loc>\n`;
      xmlContent += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      xmlContent += `    <changefreq>weekly</changefreq>\n`;
      xmlContent += `    <priority>${0.8 - (index * 0.1)}</priority>\n`;
      xmlContent += `  </url>\n`;
    });
    
    xmlContent += `</urlset>`;
    
    setSitemapContent(xmlContent);
    setLastGenerated(new Date().toLocaleString());
    setIsGenerating(false);
  };

  const downloadSitemap = () => {
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
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
          {t('webBuilder.seo.sitemap.title')}
        </h3>
        <button
          onClick={generateSitemap}
          disabled={isGenerating}
          className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? t('webBuilder.seo.sitemap.generating') : t('webBuilder.seo.sitemap.generate')}
        </button>
      </div>

      {lastGenerated && (
        <div className="mb-4 p-3 bg-gray-750 rounded-lg">
          <p className="text-sm text-gray-400">
            {t('webBuilder.seo.sitemap.lastGenerated')}{' '}
            <span className="text-white">{lastGenerated}</span>
          </p>
        </div>
      )}

      {sitemapContent ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-gray-300">
              {t('webBuilder.seo.sitemap.preview')}
            </h4>
            <button
              onClick={downloadSitemap}
              className="flex items-center bg-primary hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-lg transition-colors text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              {t('webBuilder.seo.sitemap.download')}
            </button>
          </div>
          <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto max-h-60">
            {sitemapContent}
          </pre>
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">
            {t('webBuilder.seo.sitemap.noSitemap')}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {t('webBuilder.seo.sitemap.generateFirst')}
          </p>
        </div>
      )}
    </div>
  );
}