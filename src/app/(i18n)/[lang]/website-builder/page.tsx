// src/app/(i18n)/[lang]/website-builder/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import WebsiteBuilder from '@/components/website-builder/WebsiteBuilder';
import WebsitePreview from '@/components/website-builder/WebsitePreview';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTenant } from '@/contexts/TenantContext';

export default function WebsiteBuilderPage() {
  const { website, loading, error } = useWebsiteBuilder();
  const { tenant } = useTenant();
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 max-w-md">
          <p className="text-red-300 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Restringido</h2>
          <p className="text-gray-400 mb-6">
            Debes seleccionar un tenant para acceder al constructor de sitios web.
          </p>
          <Link
            href="/tenant-selector"
            className="inline-block bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Seleccionar Tenant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Constructor de Sitios Web</h1>
              {website && (
                <span className="ml-4 text-sm text-gray-400">
                  {website.name}
                </span>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'builder'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Constructor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Vista Previa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'builder' ? (
          <WebsiteBuilder />
        ) : (
          <WebsitePreview />
        )}
      </div>
    </div>
  );
}