// src/components/dashboard/DataControlPanel.tsx
// Data control panel for data governance

import React, { useState } from 'react';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Shield, 
  Database, 
  Trash2, 
  History, 
  Clock, 
  User, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react';
import * as dataGovernanceService from '@/services/misybot/dataGovernanceService';

interface DataControlPanelProps {
  settings: dataGovernanceService.DataSettings;
  onUpdateSettings: (settings: Partial<dataGovernanceService.DataSettings>) => Promise<void>;
  onPurgeData: (request: dataGovernanceService.DataPurgeRequest) => Promise<void>;
  loading: boolean;
  canEdit?: boolean;
  canPurge?: boolean;
}

const DataControlPanel: React.FC<DataControlPanelProps> = ({ 
  settings, 
  onUpdateSettings, 
  onPurgeData,
  loading,
  canEdit = true,
  canPurge = true
}) => {
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false);
  const [purgeType, setPurgeType] = useState<'conversations' | 'sales' | 'customers' | 'all'>('all');
  const [purgeConfirmation, setPurgeConfirmation] = useState('');
  const [purgeSuccess, setPurgeSuccess] = useState(false);
  const [purgeError, setPurgeError] = useState<string | null>(null);

  const handleToggleChange = async (field: keyof dataGovernanceService.DataSettings, value: boolean) => {
    if (!canEdit) {
      return;
    }
    
    try {
      await onUpdateSettings({ [field]: value });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleRetentionChange = async (value: string) => {
    if (!canEdit) {
      return;
    }
    
    try {
      await onUpdateSettings({ retention_period_days: parseInt(value) });
    } catch (error) {
      console.error('Error updating retention period:', error);
    }
  };

  const handlePurgeData = async () => {
    if (!canPurge) {
      setPurgeError('You do not have permission to purge data');
      return;
    }
    
    if (purgeConfirmation !== 'PURGE') {
      setPurgeError('Please type "PURGE" to confirm');
      return;
    }
    
    try {
      setPurgeError(null);
      await onPurgeData({
        instance_id: settings.instance_id,
        data_types: [purgeType]
      });
      
      setPurgeSuccess(true);
      setPurgeDialogOpen(false);
      setPurgeConfirmation('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setPurgeSuccess(false), 3000);
    } catch (error) {
      setPurgeError(error instanceof Error ? error.message : 'Failed to purge data');
    }
  };

  const retentionOptions = [
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '180 days' },
    { value: '365', label: '1 year' },
    { value: '730', label: '2 years' },
    { value: '0', label: 'Indefinite' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-bold text-white">Data Controls</h2>
        {!canEdit && (
          <span className="ml-2 text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            Read-only
          </span>
        )}
      </div>

      {purgeSuccess && (
        <Alert className="mb-6 bg-green-900/50 border-green-700">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-300">
            Data purge completed successfully
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Usage Controls */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-primary" />
              Data Usage
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Conversation Data</p>
                  <p className="text-xs text-gray-400">Use chat conversations for AI training</p>
                </div>
                <Switch
                  checked={settings.use_conversation_data}
                  onCheckedChange={(checked) => handleToggleChange('use_conversation_data', checked)}
                  disabled={loading || !canEdit}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Sales Data</p>
                  <p className="text-xs text-gray-400">Use sales information for analytics</p>
                </div>
                <Switch
                  checked={settings.use_sales_data}
                  onCheckedChange={(checked) => handleToggleChange('use_sales_data', checked)}
                  disabled={loading || !canEdit}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Customer Data</p>
                  <p className="text-xs text-gray-400">Use customer information for personalization</p>
                </div>
                <Switch
                  checked={settings.use_customer_data}
                  onCheckedChange={(checked) => handleToggleChange('use_customer_data', checked)}
                  disabled={loading || !canEdit}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Anonymize Data</p>
                  <p className="text-xs text-gray-400">Remove personally identifiable information</p>
                </div>
                <Switch
                  checked={settings.anonymize_data}
                  onCheckedChange={(checked) => handleToggleChange('anonymize_data', checked)}
                  disabled={loading || !canEdit}
                />
              </div>
            </div>
          </div>
          
          {/* Data Retention */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Data Retention
            </h3>
            <div>
              <p className="text-sm text-gray-400 mb-2">Automatically delete data after:</p>
              <Select 
                value={settings.retention_period_days.toString()} 
                onValueChange={handleRetentionChange}
                disabled={loading || !canEdit}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  {retentionOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Data Purge */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Trash2 className="h-5 w-5 mr-2 text-red-500" />
            Data Purge
          </h3>
          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-4">
              Permanently delete data from the system. This action cannot be undone.
            </p>
            
            {canPurge ? (
              <Button 
                onClick={() => setPurgeDialogOpen(true)}
                variant="destructive"
                disabled={loading}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Purge Data
              </Button>
            ) : (
              <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg">
                <Lock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-500">Purge access restricted</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Purge Confirmation Dialog */}
      {purgeDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-bold text-white">Confirm Data Purge</h3>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">
              This will permanently delete data from the system. This action cannot be undone.
            </p>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-white block mb-2">
                Data to purge
              </label>
              <Select 
                value={purgeType} 
                onValueChange={(value) => setPurgeType(value as any)}
                disabled={!canPurge}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversations">Conversations Only</SelectItem>
                  <SelectItem value="sales">Sales Data Only</SelectItem>
                  <SelectItem value="customers">Customer Data Only</SelectItem>
                  <SelectItem value="all">All Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-white block mb-2">
                Type "PURGE" to confirm
              </label>
              <input
                type="text"
                value={purgeConfirmation}
                onChange={(e) => setPurgeConfirmation(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type PURGE"
                disabled={!canPurge}
              />
            </div>
            
            {purgeError && (
              <Alert className="mb-4 bg-red-900/50 border-red-700">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  {purgeError}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  setPurgeDialogOpen(false);
                  setPurgeConfirmation('');
                  setPurgeError(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePurgeData}
                variant="destructive"
                className="flex-1"
                disabled={purgeConfirmation !== 'PURGE' || loading || !canPurge}
              >
                {loading ? 'Purging...' : 'Purge Data'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataControlPanel;