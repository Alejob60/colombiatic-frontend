// src/app/(dashboard)/legal/page.tsx
// Legal documents dashboard

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import ConsentManagement from '@/components/dashboard/ConsentManagement';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

const LegalDashboard = () => {
  const { user } = useAuth();
  const [acceptedPolicies, setAcceptedPolicies] = useState<Record<string, boolean>>({
    tos: false,
    privacy: false,
    consent: false,
    dpa: false
  });
  
  const [showDocument, setShowDocument] = useState<string | null>(null);

  const handleAcceptPolicy = (policy: string) => {
    setAcceptedPolicies(prev => ({
      ...prev,
      [policy]: !prev[policy]
    }));
  };

  const handleConsentChange = (consentType: string, granted: boolean) => {
    // Handle consent change if needed
    console.log(`Consent ${consentType} ${granted ? 'granted' : 'withdrawn'}`);
  };

  const legalDocuments = [
    {
      id: 'tos',
      title: 'Terms of Service',
      description: 'Scope, responsibilities, and limitations of service',
      version: 'v1.0',
      lastUpdated: '2025-11-26'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Collected data, purpose, and third parties',
      version: 'v1.0',
      lastUpdated: '2025-11-26'
    },
    {
      id: 'consent',
      title: 'Explicit Consent',
      description: 'Details of use within the ecosystem',
      version: 'v1.0',
      lastUpdated: '2025-11-26'
    },
    {
      id: 'dpa',
      title: 'Data Processing Agreement',
      description: 'Obligations as data processor',
      version: 'v1.0',
      lastUpdated: '2025-11-26'
    }
  ];

  const documentContent: Record<string, string> = {
    tos: `Terms of Service

1. Scope of Service
   - ColombiaTIC AI provides artificial intelligence services for business automation
   - Services include chatbots, data analysis, and customer support automation

2. Responsibilities
   - Users are responsible for the accuracy of data provided to the system
   - Users must comply with applicable laws and regulations
   - ColombiaTIC AI is responsible for maintaining service availability and security

3. Limitations
   - ColombiaTIC AI is not liable for decisions made based on AI recommendations
   - Service availability is subject to maintenance schedules
   - ColombiaTIC AI reserves the right to modify services with notice`,
    
    privacy: `Privacy Policy

1. Collected Data
   - Personal information (name, email, organization)
   - Usage data (interactions with AI services)
   - Customer data (provided for AI processing)

2. Purpose of Data Collection
   - To provide and improve AI services
   - To personalize user experience
   - To comply with legal obligations

3. Third Parties
   - Data may be processed by trusted cloud providers
   - Analytics services may process usage data
   - No personal data is sold to third parties`,
    
    consent: `Explicit Consent

1. Data Usage
   - Consent to process customer data for AI training
   - Consent to store data for service provision
   - Consent to use data for analytics and improvement

2. Rights
   - Right to access personal data
   - Right to rectify inaccurate data
   - Right to erase personal data
   - Right to data portability`,
    
    dpa: `Data Processing Agreement

1. Roles
   - ColombiaTIC AI acts as Data Processor
   - Customer acts as Data Controller

2. Obligations
   - ColombiaTIC AI will process data only as instructed
   - ColombiaTIC AI will implement appropriate security measures
   - ColombiaTIC AI will assist with data subject requests
   - ColombiaTIC AI will notify of data breaches`
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <FileText className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl font-bold text-white">Legal Documents</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalDocuments.map((doc) => (
              <div key={doc.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">{doc.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{doc.description}</p>
                  </div>
                  {acceptedPolicies[doc.id] && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-gray-700 px-2 py-1 rounded mr-2">{doc.version}</span>
                  <span>Updated: {doc.lastUpdated}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowDocument(doc.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleAcceptPolicy(doc.id)}
                    variant={acceptedPolicies[doc.id] ? "default" : "outline"}
                    size="sm"
                  >
                    {acceptedPolicies[doc.id] ? 'Accepted' : 'Accept'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          {user?.id && (
            <ConsentManagement 
              userId={user.id} 
              onConsentChange={handleConsentChange}
            />
          )}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {showDocument && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {legalDocuments.find(d => d.id === showDocument)?.title}
              </h2>
              <Button
                onClick={() => setShowDocument(null)}
                variant="ghost"
                size="sm"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-gray-300">
                {documentContent[showDocument]}
              </pre>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setShowDocument(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(LegalDashboard);