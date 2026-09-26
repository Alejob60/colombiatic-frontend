// src/app/dashboard/web-builder/domain/ssl-manager.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Lock, CheckCircle, AlertCircle, RefreshCw, Upload } from 'lucide-react';

export default function SSLManager() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [isInstalling, setIsInstalling] = useState(false);
  const [sslStatus, setSslStatus] = useState<'active' | 'pending' | 'error' | 'expired'>('pending');
  const [certificateInfo, setCertificateInfo] = useState({
    issuer: 'Colombiatic SSL Authority',
    validFrom: '2025-01-01',
    validTo: '2026-01-01',
    domain: website?.domain || 'example.com'
  });

  const handleInstallSSL = async () => {
    setIsInstalling(true);
    // Simulate SSL installation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Randomly set SSL status
    const statuses: ('active' | 'pending' | 'error' | 'expired')[] = ['active', 'error'];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setSslStatus(newStatus);
    setIsInstalling(false);
  };

  const handleRenewSSL = async () => {
    setIsInstalling(true);
    // Simulate SSL renewal
    await new Promise(resolve => setTimeout(resolve, 2500));
    setSslStatus('active');
    setIsInstalling(false);
  };

  const handleUploadCertificate = () => {
    // In a real implementation, this would open a file upload dialog
    console.log('Upload certificate clicked');
  };

  const getStatusColor = () => {
    switch (sslStatus) {
      case 'active':
        return 'text-green-500';
      case 'error':
      case 'expired':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (sslStatus) {
      case 'active':
        return t('webBuilder.domain.ssl.active');
      case 'error':
        return t('webBuilder.domain.ssl.error');
      case 'expired':
        return t('webBuilder.domain.ssl.expired');
      case 'pending':
        return t('webBuilder.domain.ssl.pending');
      default:
        return t('webBuilder.domain.ssl.unknown');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Lock className="h-5 w-5 mr-2 text-primary" />
          {t('webBuilder.domain.ssl.title')}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleUploadCertificate}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            <Upload className="h-4 w-4 mr-1" />
            {t('webBuilder.domain.ssl.upload')}
          </button>
          <button
            onClick={sslStatus === 'expired' ? handleRenewSSL : handleInstallSSL}
            disabled={isInstalling}
            className="flex items-center bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isInstalling ? 'animate-spin' : ''}`} />
            {isInstalling 
              ? t('webBuilder.domain.ssl.installing') 
              : sslStatus === 'expired' 
                ? t('webBuilder.domain.ssl.renew') 
                : t('webBuilder.domain.ssl.install')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SSL Status */}
        <div className="bg-gray-750 rounded-lg p-4">
          <h4 className="font-medium text-white mb-3">{t('webBuilder.domain.ssl.status')}</h4>
          <div className="flex items-center">
            <div className={`mr-3 ${getStatusColor()}`}>
              {sslStatus === 'active' && <CheckCircle className="h-8 w-8" />}
              {(sslStatus === 'error' || sslStatus === 'expired') && <AlertCircle className="h-8 w-8" />}
              {sslStatus === 'pending' && <div className="w-8 h-8 rounded-full bg-yellow-500 animate-pulse"></div>}
            </div>
            <div>
              <p className={`text-lg font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </p>
              <p className="text-sm text-gray-400">
                {sslStatus === 'active' 
                  ? t('webBuilder.domain.ssl.secureConnection') 
                  : t('webBuilder.domain.ssl.insecureConnection')}
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Information */}
        <div className="bg-gray-750 rounded-lg p-4">
          <h4 className="font-medium text-white mb-3">{t('webBuilder.domain.ssl.certificate')}</h4>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-400">{t('webBuilder.domain.ssl.issuer')}</p>
              <p className="text-white">{certificateInfo.issuer}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">{t('webBuilder.domain.ssl.validity')}</p>
              <p className="text-white">{certificateInfo.validFrom} - {certificateInfo.validTo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">{t('webBuilder.domain.ssl.domain')}</p>
              <p className="text-white">{certificateInfo.domain}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-750 rounded-lg">
        <h4 className="font-medium text-white mb-2">{t('webBuilder.domain.ssl.help.title')}</h4>
        <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
          <li>{t('webBuilder.domain.ssl.help.autoRenewal')}</li>
          <li>{t('webBuilder.domain.ssl.help.manualUpload')}</li>
          <li>{t('webBuilder.domain.ssl.help.expirationWarning')}</li>
        </ul>
      </div>
    </div>
  );
}