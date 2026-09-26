// src/app/(dashboard)/process-history/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';

// Mock data for process history
const mockProcessHistory = [
  {
    id: '1',
    name: 'Customer Data Import',
    description: 'Bulk import of 1,247 customer records from CSV file',
    status: 'completed',
    timestamp: '2023-06-15T14:30:00Z',
    duration: '2m 15s',
    user: 'Alejandro Rodriguez',
    details: {
      records_processed: 1247,
      records_success: 1245,
      records_failed: 2,
      file_size: '2.4 MB'
    }
  },
  {
    id: '2',
    name: 'AI Model Training',
    description: 'Training customer sentiment analysis model',
    status: 'completed',
    timestamp: '2023-06-14T09:15:00Z',
    duration: '45m 32s',
    user: 'Alejandro Rodriguez',
    details: {
      model_version: 'v2.1.4',
      training_data: '12,450 conversations',
      accuracy: '92.5%'
    }
  },
  {
    id: '3',
    name: 'Data Analytics Sync',
    description: 'Synchronization with Misybot analytics platform',
    status: 'completed',
    timestamp: '2023-06-13T16:45:00Z',
    duration: '1m 42s',
    user: 'System',
    details: {
      records_synced: 5421,
      platform: 'Misybot v3.2',
      endpoint: '/api/analytics/sync'
    }
  },
  {
    id: '4',
    name: 'Website Content Update',
    description: 'Updating marketing content based on analytics insights',
    status: 'failed',
    timestamp: '2023-06-12T11:20:00Z',
    duration: '0m 15s',
    user: 'Alejandro Rodriguez',
    details: {
      error: 'API rate limit exceeded',
      retry_count: 3,
      failed_at: 'Content generation step'
    }
  },
  {
    id: '5',
    name: 'Customer Segmentation',
    description: 'AI-powered customer segmentation analysis',
    status: 'completed',
    timestamp: '2023-06-11T13:10:00Z',
    duration: '8m 57s',
    user: 'System',
    details: {
      segments_created: 12,
      customers_analyzed: 2450,
      algorithm: 'K-means clustering'
    }
  },
  {
    id: '6',
    name: 'Email Campaign Generation',
    description: 'Automated creation of personalized email campaigns',
    status: 'completed',
    timestamp: '2023-06-10T10:05:00Z',
    duration: '3m 28s',
    user: 'System',
    details: {
      emails_generated: 1247,
      templates_used: 3,
      personalization_level: 'High'
    }
  }
];

function ProcessHistoryPage() {
  const { user } = useAuth();
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [processes, setProcesses] = useState(mockProcessHistory);
  const [filteredProcesses, setFilteredProcesses] = useState(mockProcessHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Filter processes based on search term and status
    let result = processes;
    
    if (searchTerm) {
      result = result.filter(process => 
        process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        process.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(process => process.status === statusFilter);
    }
    
    setFilteredProcesses(result);
  }, [searchTerm, statusFilter, processes]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
      }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDownloadReport = () => {
    alert('Downloading process history report...');
    // In a real implementation, this would generate and download a CSV/PDF report
  };

  // Show loading state on server side to avoid hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center mb-6">
              <div className="h-6 w-24 bg-gray-800 rounded mr-4"></div>
              <div className="h-8 w-48 bg-gray-800 rounded"></div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 mb-6 animate-pulse">
              <div className="h-10 bg-gray-700 rounded"></div>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
              <div className="h-96 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href={`/${locale}/dashboard`} 
              className="flex items-center text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-semibold text-white">Process History</h1>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search processes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Process History List */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Process
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredProcesses.length > 0 ? (
                    filteredProcesses.map((process) => (
                      <tr key={process.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-700 rounded-lg">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{process.name}</div>
                              <div className="text-sm text-gray-400">{process.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(process.status)}
                            <span className={`ml-2 text-sm font-medium ${getStatusColor(process.status)}`}>
                              {getStatusText(process.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {process.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(process.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {process.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => alert(`Viewing details for process: ${process.name}`)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                        No processes found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-300">Total Processes</p>
                  <p className="text-2xl font-semibold text-white">{processes.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-300">Completed</p>
                  <p className="text-2xl font-semibold text-white">
                    {processes.filter(p => p.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-2">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-300">Failed</p>
                  <p className="text-2xl font-semibold text-white">
                    {processes.filter(p => p.status === 'failed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProcessHistoryPage);