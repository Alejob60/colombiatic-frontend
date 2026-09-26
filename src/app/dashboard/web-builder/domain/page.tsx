// src/app/dashboard/web-builder/domain/page.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Save, CheckCircle, AlertCircle, RefreshCw, Shield } from 'lucide-react';

export default function DomainManagement() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [domainStatus, setDomainStatus] = useState<'pending' | 'verified' | 'error'>('pending');
  const [customDomain, setCustomDomain] = useState(website?.domain || '');
  const [dnsRecords, setDnsRecords] = useState([
    { type: 'A', name: '@', value: '192.0.2.1', status: 'pending' },
    { type: 'CNAME', name: 'www', value: 'proxy.colombiatic.com', status: 'pending' }
  ]);

  const handleVerifyDomain = async () => {
    setIsVerifying(true);
    // Simulate DNS verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly set verification status for demo purposes
    const isSuccess = Math.random() > 0.3;
    setDomainStatus(isSuccess ? 'verified' : 'error');
    setIsVerifying(false);
  };

  const handleSaveDomain = async () => {
    setIsSaving(true);
    // Simulate saving domain
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleRefreshDNS = async () => {
    setIsVerifying(true);
    // Simulate DNS refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsVerifying(false);
  };

  if (!website) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('webBuilder.domain.noWebsite')}</h2>
        <p className="text-gray-400 mb-6">
          {t('webBuilder.domain.createWebsiteFirst')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t('webBuilder.domain.title')}</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleRefreshDNS}
            disabled={isVerifying}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isVerifying ? 'animate-spin' : ''}`} />
            {t('webBuilder.domain.refreshDNS')}
          </button>
          <button
            onClick={handleSaveDomain}
            disabled={isSaving}
            className="flex items-center bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? t('webBuilder.domain.saving') : t('webBuilder.domain.save')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Configuration */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.domain.configuration.title')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.domain.configuration.currentDomain')}
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={website.domain}
                  readOnly
                  className="flex-1 bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white"
                />
                <div className="ml-2 flex items-center">
                  {domainStatus === 'verified' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {domainStatus === 'error' && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {domainStatus === 'pending' && (
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                  )}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                {domainStatus === 'verified' 
                  ? t('webBuilder.domain.configuration.verified') 
                  : domainStatus === 'error' 
                    ? t('webBuilder.domain.configuration.notVerified') 
                    : t('webBuilder.domain.configuration.pendingVerification')}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('webBuilder.domain.configuration.customDomain')}
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={t('webBuilder.domain.configuration.customDomainPlaceholder')}
              />
              <p className="mt-1 text-sm text-gray-400">
                {t('webBuilder.domain.configuration.customDomainHelp')}
              </p>
            </div>
            
            <button
              onClick={handleVerifyDomain}
              disabled={isVerifying}
              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              <Shield className="h-4 w-4 mr-2" />
              {isVerifying 
                ? t('webBuilder.domain.configuration.verifying') 
                : t('webBuilder.domain.configuration.verifyDomain')}
            </button>
          </div>
        </div>

        {/* DNS Records */}
        <div className="bg-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.domain.dns.title')}</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-sm font-medium text-gray-400 pb-2">{t('webBuilder.domain.dns.type')}</th>
                  <th className="text-left text-sm font-medium text-gray-400 pb-2">{t('webBuilder.domain.dns.name')}</th>
                  <th className="text-left text-sm font-medium text-gray-400 pb-2">{t('webBuilder.domain.dns.value')}</th>
                  <th className="text-left text-sm font-medium text-gray-400 pb-2">{t('webBuilder.domain.dns.status')}</th>
                </tr>
              </thead>
              <tbody>
                {dnsRecords.map((record, index) => (
                  <tr key={index} className="border-b border-gray-750 last:border-0">
                    <td className="py-3 text-white">{record.type}</td>
                    <td className="py-3 text-white">{record.name}</td>
                    <td className="py-3 text-white font-mono text-sm">{record.value}</td>
                    <td className="py-3">
                      {record.status === 'verified' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {t('webBuilder.domain.dns.verified')}
                        </span>
                      )}
                      {record.status === 'pending' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1 animate-pulse"></div>
                          {t('webBuilder.domain.dns.pending')}
                        </span>
                      )}
                      {record.status === 'error' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-300">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {t('webBuilder.domain.dns.error')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-gray-750 rounded-lg">
            <h4 className="font-medium text-white mb-2">{t('webBuilder.domain.dns.help.title')}</h4>
            <p className="text-sm text-gray-400">
              {t('webBuilder.domain.dns.help.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}