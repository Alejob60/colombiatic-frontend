// src/app/(dashboard)/data-rights/page.tsx
// Data rights management (Right to Access / Right to Erasure)

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { useAuth } from '@/contexts/AuthContext';
import { useDataRights } from '@/hooks/useDataRights';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Database, 
  Download, 
  Trash2, 
  Lock,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { DataExportRequest } from '@/services/misybot/dataRightsService';

const DataRightsDashboard = () => {
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    exportStatus, 
    deletionStatus, 
    requestExport, 
    requestDeletion 
  } = useDataRights(user?.id || '');
  
  const [activeTab, setActiveTab] = useState<'export' | 'delete'>('export');
  const [exportRequest, setExportRequest] = useState<Omit<DataExportRequest, 'user_id'>>({
    email: '',
    format: 'json',
    include: {
      profile: true,
      conversations: true,
      documents: true,
      settings: true
    }
  });
  const [deleteRequest, setDeleteRequest] = useState({
    email: '',
    confirmEmail: '',
    reason: ''
  });
  const [success, setSuccess] = useState<string | null>(null);

  const handleExportRequest = async () => {
    if (!exportRequest.email) {
      setSuccess(null);
      // Error handling is done in the hook
      return;
    }
    
    try {
      await requestExport(exportRequest);
      setSuccess('Data export request submitted successfully. You will receive an email with your data within 24 hours.');
    } catch (err) {
      setSuccess(null);
      // Error is handled by the hook
    }
  };

  const handleDeleteRequest = async () => {
    if (!deleteRequest.email) {
      setSuccess(null);
      return;
    }
    
    if (deleteRequest.email !== deleteRequest.confirmEmail) {
      setSuccess(null);
      return;
    }
    
    try {
      await requestDeletion({
        email: deleteRequest.email,
        reason: deleteRequest.reason
      });
      setSuccess('Account deletion request submitted successfully. You will receive a confirmation email with next steps.');
    } catch (err) {
      setSuccess(null);
      // Error is handled by the hook
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Lock className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl font-bold text-white">Data Rights Management</h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Your Rights Under Data Protection Laws</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Right to Access</h3>
              <p className="text-sm text-gray-400">Request a copy of your personal data</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Right to Erasure</h3>
              <p className="text-sm text-gray-400">Request deletion of your personal data</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Right to Rectification</h3>
              <p className="text-sm text-gray-400">Request correction of inaccurate data</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Right to Data Portability</h3>
              <p className="text-sm text-gray-400">Request transfer of your data to another service</p>
            </div>
          </div>
        </div>
      </div>

      {(error || success) && (
        <Alert className={`mb-6 ${error ? 'bg-red-900/50 border-red-700' : 'bg-green-900/50 border-green-700'}`}>
          {error ? (
            <>
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-300">
                {success}
              </AlertDescription>
            </>
          )}
        </Alert>
      )}

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'export'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('export')}
            >
              <Download className="h-4 w-4 inline mr-2" />
              Export Data
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'delete'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('delete')}
            >
              <Trash2 className="h-4 w-4 inline mr-2" />
              Delete Account
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'export' ? (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Request Data Export</h3>
              <p className="text-gray-400 mb-6">
                Request a copy of your personal data. You will receive an email with your data within 24 hours.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={exportRequest.email}
                    onChange={(e) => setExportRequest(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Export Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['json', 'csv', 'pdf'] as const).map((format) => (
                      <button
                        key={format}
                        className={`py-2 px-3 rounded text-sm ${
                          exportRequest.format === format
                            ? 'bg-primary text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setExportRequest(prev => ({ ...prev, format }))}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Data to Include
                  </label>
                  <div className="space-y-2">
                    {Object.entries(exportRequest.include).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`include-${key}`}
                          checked={value}
                          onChange={(e) => setExportRequest(prev => ({
                            ...prev,
                            include: {
                              ...prev.include,
                              [key]: e.target.checked
                            }
                          }))}
                          className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                        />
                        <label htmlFor={`include-${key}`} className="ml-2 text-sm text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleExportRequest}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Request Data Export
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Request Account Deletion</h3>
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <h4 className="font-medium text-red-400">Important Notice</h4>
                </div>
                <p className="text-sm text-red-300 mt-2">
                  Deleting your account is permanent and cannot be undone. All your data will be permanently removed from our systems within 30 days.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={deleteRequest.email}
                    onChange={(e) => setDeleteRequest(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Email Address
                  </label>
                  <Input
                    type="email"
                    value={deleteRequest.confirmEmail}
                    onChange={(e) => setDeleteRequest(prev => ({ ...prev, confirmEmail: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Reason for Deletion (Optional)
                  </label>
                  <textarea
                    value={deleteRequest.reason}
                    onChange={(e) => setDeleteRequest(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Tell us why you're deleting your account..."
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button
                  onClick={handleDeleteRequest}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Request Account Deletion
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(DataRightsDashboard);