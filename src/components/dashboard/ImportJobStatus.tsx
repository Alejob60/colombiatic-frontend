// src/components/dashboard/ImportJobStatus.tsx
// Import job status monitoring

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';
import * as bulkImportService from '@/services/misybot/bulkImportService';

interface ImportJobStatusProps {
  jobs: bulkImportService.ImportJob[];
  currentJob: bulkImportService.ImportJob | null;
  jobDetail: bulkImportService.ImportJobDetail | null;
  onRefresh: () => void;
  onCancel: (jobId: string) => Promise<void>;
  onRetry: (jobId: string) => Promise<void>;
  onViewDetail: (jobId: string) => Promise<void>;
  loading: boolean;
}

const ImportJobStatus: React.FC<ImportJobStatusProps> = ({ 
  jobs,
  currentJob,
  jobDetail,
  onRefresh,
  onCancel,
  onRetry,
  onViewDetail,
  loading
}) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getProgressPercentage = (job: bulkImportService.ImportJob) => {
    if (job.total_rows === 0) return 0;
    return Math.round((job.processed_rows / job.total_rows) * 100);
  };

  const toggleExpand = (jobId: string) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
      // Load job detail when expanding
      onViewDetail(jobId);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Import Jobs</h2>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No import jobs found</p>
          <p className="text-sm text-gray-500 mt-2">
            Start an import to see job status here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <div 
                className="flex items-center justify-between p-4 bg-gray-750 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => toggleExpand(job.id)}
              >
                <div className="flex items-center">
                  {getStatusIcon(job.status)}
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-white">{job.file_name}</h3>
                      <Badge className={`ml-2 ${getStatusColor(job.status)}`}>
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(job.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {job.status === 'processing' && (
                    <span className="text-xs text-gray-400">
                      {job.processed_rows} / {job.total_rows}
                    </span>
                  )}
                  <Button variant="ghost" size="sm">
                    {expandedJob === job.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {expandedJob === job.id && (
                <div className="p-4 bg-gray-900 border-t border-gray-700">
                  {/* Progress Bar */}
                  {job.status === 'processing' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-400">{getProgressPercentage(job)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(job)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Job Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-800 p-3 rounded">
                      <p className="text-xs text-gray-400">Total Rows</p>
                      <p className="text-lg font-medium text-white">{job.total_rows}</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <p className="text-xs text-gray-400">Processed</p>
                      <p className="text-lg font-medium text-white">{job.processed_rows}</p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <p className="text-xs text-gray-400">Failed</p>
                      <p className="text-lg font-medium text-white">{job.failed_rows}</p>
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  {job.error && (
                    <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-sm font-medium text-red-400">Error</span>
                      </div>
                      <p className="text-sm text-red-300 mt-1">{job.error}</p>
                    </div>
                  )}
                  
                  {/* Validation Errors */}
                  {jobDetail?.validation_errors && jobDetail.validation_errors.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Validation Errors</h4>
                      <div className="max-h-40 overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-2 py-1 text-left text-xs font-medium text-gray-400 uppercase">Row</th>
                              <th className="px-2 py-1 text-left text-xs font-medium text-gray-400 uppercase">Error</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {jobDetail.validation_errors.slice(0, 10).map((error, index) => (
                              <tr key={index}>
                <td className="px-2 py-1 text-xs text-gray-300">{error.row_number}</td>
                <td className="px-2 py-1 text-xs text-gray-300">{error.error}</td>
              </tr>
            ))}
            {jobDetail.validation_errors.length > 10 && (
              <tr>
                <td colSpan={2} className="px-2 py-1 text-xs text-gray-400 text-center">
                  + {jobDetail.validation_errors.length - 10} more errors
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}
  
  {/* Action Buttons */}
  <div className="flex space-x-2">
    {job.status === 'processing' && (
      <Button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onCancel(job.id);
        }}
        variant="outline"
        size="sm"
      >
        <Pause className="h-4 w-4 mr-2" />
        Cancel
      </Button>
    )}
    
    {job.status === 'failed' && (
      <Button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onRetry(job.id);
        }}
        size="sm"
      >
        <Play className="h-4 w-4 mr-2" />
        Retry
      </Button>
    )}
    
    <Button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onViewDetail(job.id);
      }}
      variant="outline"
      size="sm"
    >
      View Details
    </Button>
  </div>
</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImportJobStatus;