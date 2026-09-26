// src/app/dashboard/web-builder/seo/page.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Save, RefreshCw, FileText, Link, Image, Hash } from 'lucide-react';

export default function SEOConfiguration() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: website?.name || '',
    description: '',
    keywords: '',
    author: '',
    ogTitle: website?.name || '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: website?.name || '',
    twitterDescription: '',
    twitterImage: '',
    canonicalUrl: website?.domain ? `https://${website.domain}` : '',
    robots: 'index, follow',
    sitemap: true,
    analyticsId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleRefreshSitemap = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  if (!website) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('webBuilder.seo.noWebsite')}</h2>
        <p className="text-gray-400 mb-6">
          {t('webBuilder.seo.createWebsiteFirst')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t('webBuilder.seo.title')}</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleRefreshSitemap}
            disabled={isRefreshing}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {t('webBuilder.seo.refreshSitemap')}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? t('webBuilder.seo.saving') : t('webBuilder.seo.save')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic SEO */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            {t('webBuilder.seo.basic.title')}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.basic.titleField')}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.basic.titlePlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.basic.descriptionField')}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.basic.descriptionPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.basic.keywordsField')}
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.basic.keywordsPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.basic.authorField')}
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.basic.authorPlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* Open Graph */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Link className="h-5 w-5 mr-2 text-primary" />
            {t('webBuilder.seo.openGraph.title')}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.openGraph.titleField')}
              </label>
              <input
                type="text"
                name="ogTitle"
                value={formData.ogTitle}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.openGraph.titlePlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.openGraph.descriptionField')}
              </label>
              <textarea
                name="ogDescription"
                value={formData.ogDescription}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.openGraph.descriptionPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.openGraph.imageField')}
              </label>
              <input
                type="text"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.openGraph.imagePlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* Twitter Card */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Hash className="h-5 w-5 mr-2 text-primary" />
            {t('webBuilder.seo.twitter.title')}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.twitter.titleField')}
              </label>
              <input
                type="text"
                name="twitterTitle"
                value={formData.twitterTitle}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.twitter.titlePlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.twitter.descriptionField')}
              </label>
              <textarea
                name="twitterDescription"
                value={formData.twitterDescription}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.twitter.descriptionPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.twitter.imageField')}
              </label>
              <input
                type="text"
                name="twitterImage"
                value={formData.twitterImage}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.twitter.imagePlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Image className="h-5 w-5 mr-2 text-primary" />
            {t('webBuilder.seo.advanced.title')}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.advanced.canonicalUrlField')}
              </label>
              <input
                type="text"
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.advanced.canonicalUrlPlaceholder')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.advanced.robotsField')}
              </label>
              <select
                name="robots"
                value={formData.robots}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="index, follow">{t('webBuilder.seo.advanced.robotsOptions.indexFollow')}</option>
                <option value="noindex, follow">{t('webBuilder.seo.advanced.robotsOptions.noIndexFollow')}</option>
                <option value="index, nofollow">{t('webBuilder.seo.advanced.robotsOptions.indexNoFollow')}</option>
                <option value="noindex, nofollow">{t('webBuilder.seo.advanced.robotsOptions.noIndexNoFollow')}</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="sitemap"
                checked={formData.sitemap}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded bg-gray-750"
              />
              <label className="ml-2 block text-sm text-gray-300">
                {t('webBuilder.seo.advanced.sitemapField')}
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.seo.advanced.analyticsIdField')}
              </label>
              <input
                type="text"
                name="analyticsId"
                value={formData.analyticsId}
                onChange={handleChange}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.seo.advanced.analyticsIdPlaceholder')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}