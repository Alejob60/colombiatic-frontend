// src/app/(dashboard)/bulk-import/test-page.tsx
// Test page for bulk import functionality

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const BulkImportTestPage = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Generate sample CSV data for testing
  const generateSampleCSV = () => {
    const headers = ['name', 'email', 'phone', 'company', 'position'];
    const sampleData = [
      ['John Doe', 'john@example.com', '1234567890', 'Tech Corp', 'Developer'],
      ['Jane Smith', 'jane@example.com', '0987654321', 'Innovate Inc', 'Designer'],
      ['Bob Johnson', 'bob@example.com', '5555555555', 'Global Solutions', 'Manager'],
      ['Alice Williams', 'alice@example.com', '4444444444', 'Future Tech', 'Analyst'],
      ['Charlie Brown', 'charlie@example.com', '6666666666', 'Digital Systems', 'Engineer']
    ];
    
    const csvContent = [
      headers.join(','),
      ...sampleData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const sampleFile = new File([blob], 'sample_customers.csv', { type: 'text/csv' });
    setFile(sampleFile);
    
    // Preview the data
    setPreviewData({
      headers,
      sampleData
    });
    
    // Initialize mapping
    const initialMapping: Record<string, string> = {};
    headers.forEach(header => {
      if (header === 'name' || header === 'email' || header === 'phone') {
        initialMapping[header] = header;
      } else {
        initialMapping[header] = `meta.${header}`;
      }
    });
    setMapping(initialMapping);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Read and preview the file
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;
      
      const lines = content.split('\n');
      if (lines.length === 0) return;
      
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const sampleData = lines.slice(1, 6).map(line => 
        line.split(',').map(cell => cell.trim().replace(/"/g, ''))
      );
      
      setPreviewData({
        headers,
        sampleData
      });
      
      // Initialize mapping
      const initialMapping: Record<string, string> = {};
      headers.forEach(header => {
        const lowerHeader = header.toLowerCase();
        if (lowerHeader.includes('name')) {
          initialMapping[header] = 'name';
        } else if (lowerHeader.includes('email')) {
          initialMapping[header] = 'email';
        } else if (lowerHeader.includes('phone') || lowerHeader.includes('tel')) {
          initialMapping[header] = 'phone';
        } else {
          initialMapping[header] = `meta.${header}`;
        }
      });
      setMapping(initialMapping);
    };
    reader.readAsText(selectedFile);
  };

  const handleMappingChange = (header: string, value: string) => {
    setMapping(prev => ({
      ...prev,
      [header]: value
    }));
  };

  const simulateImport = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Simulate successful import
        setResult({
          success: true,
          message: 'Import completed successfully',
          job: {
            id: 'job-' + Date.now(),
            status: 'completed',
            total_rows: previewData?.sampleData.length || 0,
            processed_rows: previewData?.sampleData.length || 0,
            failed_rows: 0,
            file_name: file?.name || 'sample.csv'
          }
        });
      } catch (err) {
        setError('Failed to process import');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Upload className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl font-bold text-white">Bulk Import Test</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Upload Customer Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CSV File
                </label>
                <Input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <Button onClick={generateSampleCSV} variant="outline">
                Generate Sample CSV
              </Button>
              
              {file && (
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    Selected file: <span className="text-white">{file.name}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Size: {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Preview Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {previewData ? (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        {previewData.headers.map((header: string, index: number) => (
                          <th 
                            key={index} 
                            className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {previewData.sampleData.map((row: string[], rowIndex: number) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex} 
                              className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                Upload a CSV file to preview data
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Mapping Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Column Mapping</CardTitle>
          </CardHeader>
          <CardContent>
            {previewData ? (
              <div className="space-y-3">
                {previewData.headers.map((header: string) => (
                  <div key={header} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-sm text-white">{header}</span>
                    <select
                      value={mapping[header] || ''}
                      onChange={(e) => handleMappingChange(header, e.target.value)}
                      className="bg-gray-600 border-gray-600 text-white rounded px-2 py-1 text-sm"
                    >
                      <option value="name">Name</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="meta">Other (Meta)</option>
                    </select>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                Upload a CSV file to configure column mapping
              </p>
            )}
          </CardContent>
        </Card>
        
        {/* Import Section */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Import Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={simulateImport}
                disabled={!file || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Start Import'
                )}
              </Button>
              
              {result && (
                <div className={`p-4 rounded ${result.success ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
                  <div className="flex items-center">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    )}
                    <span className={result.success ? 'text-green-300' : 'text-red-300'}>
                      {result.message}
                    </span>
                  </div>
                  
                  {result.job && (
                    <div className="mt-3 text-sm">
                      <p className="text-gray-300">
                        Job ID: <span className="text-white">{result.job.id}</span>
                      </p>
                      <p className="text-gray-300">
                        Status: <span className="text-white capitalize">{result.job.status}</span>
                      </p>
                      <p className="text-gray-300">
                        Rows Processed: <span className="text-white">{result.job.processed_rows}/{result.job.total_rows}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-900/30 border border-red-700 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-red-300">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(BulkImportTestPage);