// src/components/dashboard/BulkImportWizard.tsx
// Bulk import wizard for customer data

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  X,
  Play,
  Pause,
  Link,
  Database
} from 'lucide-react';
import * as bulkImportService from '@/services/misybot/bulkImportService';

interface BulkImportWizardProps {
  instanceId: string;
  onImportStart: (
    file: File | null, 
    columnMapping: Record<string, string>,
    connectorType: 'csv' | 'google-sheets' | 'api',
    googleSheetUrl?: string,
    apiEndpoint?: string,
    apiHeaders?: Record<string, string>
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  previewData: {
    headers: string[];
    sampleData: any[][];
    suggestedMapping: Record<string, string>;
  } | null;
  onPreviewCSV: (file: File) => Promise<void>;
}

const BulkImportWizard: React.FC<BulkImportWizardProps> = ({ 
  instanceId,
  onImportStart,
  loading,
  error,
  previewData,
  onPreviewCSV
}) => {
  const [step, setStep] = useState<'connector' | 'upload' | 'preview' | 'mapping' | 'processing'>('connector');
  const [file, setFile] = useState<File | null>(null);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [connectorType, setConnectorType] = useState<'csv' | 'google-sheets' | 'api'>('csv');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiHeaders, setApiHeaders] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Preview the CSV file
    try {
      await onPreviewCSV(selectedFile);
      setStep('preview');
    } catch (err) {
      console.error('Error previewing file:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;
    
    setFile(droppedFile);
    
    // Preview the CSV file
    try {
      await onPreviewCSV(droppedFile);
      setStep('preview');
    } catch (err) {
      console.error('Error previewing file:', err);
    }
  };

  const handleNext = () => {
    if (step === 'connector') {
      if (connectorType === 'csv') {
        setStep('upload');
      } else if (connectorType === 'google-sheets') {
        // For Google Sheets, we would need to implement OAuth flow
        // For now, we'll just move to processing step
        setStep('processing');
      } else if (connectorType === 'api') {
        // For API, we would need to validate the endpoint
        // For now, we'll just move to processing step
        setStep('processing');
      }
    } else if (step === 'upload') {
      fileInputRef.current?.click();
    } else if (step === 'preview') {
      // Initialize column mapping with suggested mappings
      if (previewData?.suggestedMapping) {
        setColumnMapping(previewData.suggestedMapping);
      }
      setStep('mapping');
    } else if (step === 'mapping') {
      setStep('processing');
      // Start the import process
      if (connectorType === 'csv' && file) {
        onImportStart(file, columnMapping, connectorType);
      } else if (connectorType === 'google-sheets') {
        onImportStart(null, columnMapping, connectorType, googleSheetUrl);
      } else if (connectorType === 'api') {
        onImportStart(null, columnMapping, connectorType, undefined, apiEndpoint, apiHeaders);
      }
    }
  };

  const handleBack = () => {
    if (step === 'connector') {
      return;
    } else if (step === 'upload') {
      setStep('connector');
    } else if (step === 'preview') {
      setStep('upload');
      setFile(null);
    } else if (step === 'mapping') {
      setStep('preview');
    } else if (step === 'processing') {
      setStep('mapping');
    }
  };

  const handleMappingChange = (header: string, value: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [header]: value
    }));
  };

  const addApiHeader = () => {
    setApiHeaders(prev => ({ ...prev, '': '' }));
  };

  const updateApiHeader = (index: number, key: string, value: string) => {
    const entries = Object.entries(apiHeaders);
    if (index < entries.length) {
      entries[index] = [key, value];
      setApiHeaders(Object.fromEntries(entries));
    }
  };

  const removeApiHeader = (index: number) => {
    const entries = Object.entries(apiHeaders);
    if (index < entries.length) {
      entries.splice(index, 1);
      setApiHeaders(Object.fromEntries(entries));
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'connector': return 'Select Data Source';
      case 'upload': return 'Upload CSV File';
      case 'preview': return 'Preview Data';
      case 'mapping': return 'Map Columns';
      case 'processing': return 'Import Data';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'connector': return 'Choose where your customer data is coming from';
      case 'upload': return 'Upload a CSV file with your customer data';
      case 'preview': return 'Review the first few rows of your data';
      case 'mapping': return 'Map your CSV columns to customer fields';
      case 'processing': return 'Importing your customer data';
      default: return '';
    }
  };

  const isNextDisabled = () => {
    if (step === 'connector') {
      if (connectorType === 'csv') return false;
      if (connectorType === 'google-sheets') return !googleSheetUrl;
      if (connectorType === 'api') return !apiEndpoint;
    }
    if (step === 'upload') {
      return !file;
    }
    if (step === 'mapping') {
      // Check if all required fields are mapped
      const requiredFields = ['name', 'email'];
      return !requiredFields.every(field => 
        Object.values(columnMapping).includes(field)
      );
    }
    return false;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Upload className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-bold text-white">Bulk Import Wizard</h2>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {(['connector', 'upload', 'preview', 'mapping', 'processing'] as const).map((s, index) => (
          <React.Fragment key={s}>
            <div className={`flex flex-col items-center ${step === s ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === s ? 'bg-primary text-white' : 
                index < ['connector', 'upload', 'preview', 'mapping', 'processing'].indexOf(step) ? 'bg-green-500 text-white' : 'bg-gray-700'
              }`}>
                {index < ['connector', 'upload', 'preview', 'mapping', 'processing'].indexOf(step) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-xs mt-2 capitalize">{s.replace('-', ' ')}</div>
            </div>
            {index < 4 && (
              <div className={`flex-1 h-1 mx-2 ${
                index < ['connector', 'upload', 'preview', 'mapping', 'processing'].indexOf(step) ? 'bg-primary' : 'bg-gray-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">{getStepTitle()}</h3>
        <p className="text-gray-400">{getStepDescription()}</p>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-900/50 border-red-700">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Connector Selection Step */}
      {step === 'connector' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                connectorType === 'csv' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-600 hover:border-primary'
              }`}
              onClick={() => setConnectorType('csv')}
            >
              <div className="flex items-center mb-2">
                <FileText className="h-6 w-6 text-primary mr-2" />
                <h4 className="font-medium text-white">CSV File</h4>
              </div>
              <p className="text-sm text-gray-400">
                Upload a CSV file from your computer
              </p>
            </div>
            
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                connectorType === 'google-sheets' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-600 hover:border-primary'
              }`}
              onClick={() => setConnectorType('google-sheets')}
            >
              <div className="flex items-center mb-2">
                <Link className="h-6 w-6 text-primary mr-2" />
                <h4 className="font-medium text-white">Google Sheets</h4>
              </div>
              <p className="text-sm text-gray-400">
                Import data from Google Sheets (OAuth required)
              </p>
            </div>
            
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                connectorType === 'api' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-600 hover:border-primary'
              }`}
              onClick={() => setConnectorType('api')}
            >
              <div className="flex items-center mb-2">
                <Database className="h-6 w-6 text-primary mr-2" />
                <h4 className="font-medium text-white">API</h4>
              </div>
              <p className="text-sm text-gray-400">
                Import data from a REST API endpoint
              </p>
            </div>
          </div>
          
          {/* Google Sheets Form */}
          {connectorType === 'google-sheets' && (
            <div className="mt-6 p-4 bg-gray-750 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-3">Google Sheets Configuration</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Google Sheets URL</label>
                  <Input
                    value={googleSheetUrl}
                    onChange={(e) => setGoogleSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="text-xs text-gray-400">
                  Note: You'll need to authenticate with Google after starting the import.
                </div>
              </div>
            </div>
          )}
          
          {/* API Form */}
          {connectorType === 'api' && (
            <div className="mt-6 p-4 bg-gray-750 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-3">API Configuration</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">API Endpoint</label>
                  <Input
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    placeholder="https://api.example.com/customers"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm text-gray-300">Headers</label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addApiHeader}
                      className="text-xs"
                    >
                      Add Header
                    </Button>
                  </div>
                  
                  {Object.entries(apiHeaders).map(([key, value], index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={key}
                        onChange={(e) => updateApiHeader(index, e.target.value, value)}
                        placeholder="Header name"
                        className="bg-gray-700 border-gray-600 text-white flex-1"
                      />
                      <Input
                        value={value}
                        onChange={(e) => updateApiHeader(index, key, e.target.value)}
                        placeholder="Header value"
                        className="bg-gray-700 border-gray-600 text-white flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeApiHeader(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Step */}
      {step === 'upload' && (
        <div 
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">
            Drag and drop your CSV file here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports CSV files up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Preview Step */}
      {step === 'preview' && previewData && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">File: {file?.name}</p>
              <p className="text-sm text-gray-400">
                {previewData.sampleData.length} rows previewed
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Change File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {previewData.headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {previewData.sampleData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mapping Step */}
      {step === 'mapping' && previewData && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">CSV Columns</h4>
              <div className="space-y-2">
                {previewData.headers.map((header) => (
                  <div key={header} className="flex items-center p-2 bg-gray-700 rounded">
                    <span className="text-sm text-white flex-1">{header}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Map to Customer Fields</h4>
              <div className="space-y-2">
                {previewData.headers.map((header) => (
                  <div key={header} className="flex items-center p-2 bg-gray-700 rounded">
                    <Select 
                      value={columnMapping[header] || ''} 
                      onValueChange={(value: string) => handleMappingChange(header, value)}
                    >
                      <SelectTrigger className="bg-gray-600 border-gray-600 text-white">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="meta">Other (Meta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 mt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Mapping Preview</h4>
            <div className="text-sm text-gray-400">
              {Object.entries(columnMapping).map(([csvColumn, customerField]) => (
                <div key={csvColumn} className="flex justify-between py-1">
                  <span>{csvColumn}</span>
                  <span className="text-primary">→</span>
                  <span>{customerField}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Processing Step */}
      {step === 'processing' && (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Importing Data</h3>
          <p className="text-gray-400">
            Your customer data is being imported. This may take a few minutes...
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {connectorType === 'csv' && 'Importing from CSV file...'}
            {connectorType === 'google-sheets' && 'Importing from Google Sheets...'}
            {connectorType === 'api' && 'Importing from API endpoint...'}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={handleBack}
          variant="outline"
          disabled={step === 'connector' || loading}
        >
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={isNextDisabled() || loading}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {step === 'processing' ? 'Importing...' : 'Processing...'}
            </>
          ) : step === 'processing' ? (
            'Finish'
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  );
};

export default BulkImportWizard;