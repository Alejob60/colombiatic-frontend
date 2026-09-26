// src/app/dashboard/web-builder/domain/dns-verifier.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function DNSVerifier() {
  const { t } = useTranslations();
  const { website } = useWebsiteBuilder();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState([
    { id: 1, record: 'A record', status: 'verified', detail: 'Points to 192.0.2.1' },
    { id: 2, record: 'CNAME www', status: 'pending', detail: 'Points to proxy.colombiatic.com' },
    { id: 3, record: 'TXT verification', status: 'error', detail: 'Missing TXT record' },
    { id: 4, record: 'SSL certificate', status: 'pending', detail: 'Awaiting DNS propagation' }
  ]);

  const handleVerifyDNS = async () => {
    setIsVerifying(true);
    // Simulate DNS verification
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update verification results randomly
    const updatedResults = verificationResults.map(result => {
      if (result.status === 'pending') {
        // Randomly set status for pending records
        const statuses = ['verified', 'error'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return { ...result, status: newStatus };
      }
      return result;
    });
    
    setVerificationResults(updatedResults);
    setIsVerifying(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <div className="w-5 h-5 rounded-full bg-yellow-500 animate-pulse"></div>;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-500"></div>;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return t('webBuilder.domain.dnsVerifier.status.verified');
      case 'error':
        return t('webBuilder.domain.dnsVerifier.status.error');
      case 'pending':
        return t('webBuilder.domain.dnsVerifier.status.pending');
      default:
        return status;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          {t('webBuilder.domain.dnsVerifier.title')}
        </h3>
        <button
          onClick={handleVerifyDNS}
          disabled={isVerifying}
          className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isVerifying ? 'animate-spin' : ''}`} />
          {isVerifying ? t('webBuilder.domain.dnsVerifier.verifying') : t('webBuilder.domain.dnsVerifier.verify')}
        </button>
      </div>

      <div className="space-y-4">
        {verificationResults.map((result) => (
          <div key={result.id} className="flex items-center p-3 bg-gray-750 rounded-lg">
            <div className="flex-shrink-0 mr-3">
              {getStatusIcon(result.status)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium">{result.record}</p>
              <p className="text-sm text-gray-400 truncate">{result.detail}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                result.status === 'verified' 
                  ? 'bg-green-900 text-green-300' 
                  : result.status === 'error' 
                    ? 'bg-red-900 text-red-300' 
                    : 'bg-yellow-900 text-yellow-300'
              }`}>
                {getStatusText(result.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-750 rounded-lg">
        <h4 className="font-medium text-white mb-2">{t('webBuilder.domain.dnsVerifier.help.title')}</h4>
        <p className="text-sm text-gray-400">
          {t('webBuilder.domain.dnsVerifier.help.description')}
        </p>
        <div className="mt-2 text-sm">
          <p className="text-gray-400">
            <span className="text-green-400">✓</span> {t('webBuilder.domain.dnsVerifier.help.tip1')}
          </p>
          <p className="text-gray-400">
            <span className="text-yellow-400">⚠</span> {t('webBuilder.domain.dnsVerifier.help.tip2')}
          </p>
          <p className="text-gray-400">
            <span className="text-red-400">✗</span> {t('webBuilder.domain.dnsVerifier.help.tip3')}
          </p>
        </div>
      </div>
    </div>
  );
}