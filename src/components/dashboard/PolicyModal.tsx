// src/components/dashboard/PolicyModal.tsx
// Policy modal for data governance

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X
} from 'lucide-react';

interface PolicyModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  loading: boolean;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ 
  open, 
  onClose, 
  onAccept,
  loading 
}) => {
  const [accepted, setAccepted] = useState(false);

  if (!open) return null;

  const handleAccept = () => {
    if (accepted) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-xl font-bold text-white">Data Usage Policy</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="prose prose-invert max-w-none mb-6">
          <h3 className="text-lg font-semibold text-white">Data Collection and Usage</h3>
          <p className="text-gray-300">
            ColombiaTIC AI collects and processes data to provide and improve our services. 
            This includes:
          </p>
          <ul className="text-gray-300 list-disc pl-5 space-y-2">
            <li>Conversation data to train and improve our AI models</li>
            <li>Sales data to provide analytics and insights</li>
            <li>Customer information to personalize your experience</li>
            <li>Usage data to understand how our services are being used</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-white mt-6">Data Protection</h3>
          <p className="text-gray-300">
            We implement industry-standard security measures to protect your data:
          </p>
          <ul className="text-gray-300 list-disc pl-5 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Data anonymization where possible</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-white mt-6">Your Rights</h3>
          <p className="text-gray-300">
            You have the following rights regarding your data:
          </p>
          <ul className="text-gray-300 list-disc pl-5 space-y-2">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate personal data</li>
            <li>Right to erase your personal data</li>
            <li>Right to restrict processing of your personal data</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-white mt-6">Data Retention</h3>
          <p className="text-gray-300">
            We retain your data for as long as necessary to provide our services and 
            comply with legal obligations. You can configure retention periods in 
            the Data Controls panel.
          </p>
          
          <h3 className="text-lg font-semibold text-white mt-6">Contact Us</h3>
          <p className="text-gray-300">
            If you have any questions about this policy or your data, please contact 
            our Data Protection Officer at privacy@colombiatic.ai.
          </p>
        </div>
        
        <div className="flex items-start mb-6">
          <Checkbox
            id="policy-accept"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
            className="mt-1"
          />
          <label 
            htmlFor="policy-accept" 
            className="ml-2 text-sm text-gray-300"
          >
            I have read and accept the Data Usage Policy. I understand my rights 
            and how my data will be used and protected.
          </label>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!accepted || loading}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Accepting...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept Policy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;