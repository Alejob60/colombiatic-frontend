// src/components/dashboard/ConsentManagement.tsx
// Consent management component

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle
} from 'lucide-react';
import * as consentService from '@/services/misybot/consentService';

interface ConsentManagementProps {
  userId: string;
  onConsentChange?: (consentType: string, granted: boolean) => void;
}

const ConsentManagement: React.FC<ConsentManagementProps> = ({ 
  userId,
  onConsentChange
}) => {
  const [consentHistory, setConsentHistory] = useState<consentService.ConsentHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchConsentHistory();
    }
  }, [userId]);

  const fetchConsentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const history = await consentService.getConsentHistory(userId);
      setConsentHistory(history);
    } catch (err) {
      setError('Failed to load consent history');
      console.error('Error fetching consent history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConsentChange = async (consentType: string, granted: boolean) => {
    try {
      setLoading(true);
      setError(null);
      
      await consentService.recordConsent({
        user_id: userId,
        consent_type: consentType,
        granted
      });
      
      // Refresh consent history
      await fetchConsentHistory();
      
      // Notify parent component
      if (onConsentChange) {
        onConsentChange(consentType, granted);
      }
    } catch (err) {
      setError('Failed to update consent');
      console.error('Error recording consent:', err);
    } finally {
      setLoading(false);
    }
  };

  const getConsentStatus = (consentType: string) => {
    const consent = consentHistory.find(c => c.consent_type === consentType);
    return consent ? consent.granted : false;
  };

  const getLastUpdated = (consentType: string) => {
    const consent = consentHistory.find(c => c.consent_type === consentType);
    return consent ? new Date(consent.timestamp).toLocaleString() : 'Never';
  };

  const consentTypes = [
    {
      id: 'data-processing',
      title: 'Data Processing Consent',
      description: 'Consent to process your personal data for service provision'
    },
    {
      id: 'marketing',
      title: 'Marketing Communications',
      description: 'Consent to receive marketing emails and communications'
    },
    {
      id: 'analytics',
      title: 'Analytics and Tracking',
      description: 'Consent to track usage for analytics and improvement'
    },
    {
      id: 'third-party-sharing',
      title: 'Third-Party Sharing',
      description: 'Consent to share data with trusted third-party partners'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <CheckCircle className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-bold text-white">Consent Management</h2>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
            <span className="text-sm text-red-300">{error}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {consentTypes.map((consent) => (
          <div key={consent.id} className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white">{consent.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{consent.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {getLastUpdated(consent.id)}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {getConsentStatus(consent.id) ? (
                  <>
                    <span className="text-green-500 text-sm">Granted</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </>
                ) : (
                  <>
                    <span className="text-red-500 text-sm">Denied</span>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Button
                onClick={() => handleConsentChange(consent.id, true)}
                disabled={loading || getConsentStatus(consent.id)}
                size="sm"
              >
                {loading ? (
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Grant
              </Button>
              
              <Button
                onClick={() => handleConsentChange(consent.id, false)}
                variant="outline"
                disabled={loading || !getConsentStatus(consent.id)}
                size="sm"
              >
                {loading ? (
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Withdraw
              </Button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center">
            <Clock className="h-4 w-4 mr-2 animate-spin text-gray-400" />
            <span className="text-sm text-gray-400">Updating consent...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentManagement;