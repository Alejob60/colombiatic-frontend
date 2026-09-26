// src/components/dashboard/AuditLogTable.tsx
// Audit log table for data governance

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { 
  History, 
  Search, 
  Filter,
  User,
  Database,
  Settings,
  Trash2,
  RefreshCw
} from 'lucide-react';
import * as dataGovernanceService from '@/services/misybot/dataGovernanceService';

interface AuditLogTableProps {
  logs: dataGovernanceService.AuditLog[];
  onRefresh: () => void;
  onFilter: (filters: {
    user_id?: string;
    action?: string;
    resource_type?: string;
    start_date?: string;
    end_date?: string;
  }) => Promise<void>;
  loading: boolean;
}

const AuditLogTable: React.FC<AuditLogTableProps> = ({ 
  logs, 
  onRefresh, 
  onFilter,
  loading 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterResource, setFilterResource] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    // In a real implementation, this would filter the local data
    // For now, we'll just trigger the onFilter callback
  };

  const handleApplyFilters = async () => {
    const filters: any = {};
    if (filterUser) filters.user_id = filterUser;
    if (filterAction) filters.action = filterAction;
    if (filterResource) filters.resource_type = filterResource;
    
    await onFilter(filters);
  };

  const handleClearFilters = async () => {
    setFilterUser('');
    setFilterAction('');
    setFilterResource('');
    
    await onFilter({});
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return <Database className="h-4 w-4 text-green-500" />;
      case 'update':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'delete':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      default:
        return <History className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'text-green-400';
      case 'update':
        return 'text-blue-400';
      case 'delete':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <History className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-xl font-bold text-white">Audit Logs</h2>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">
                User
              </label>
              <Input
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                placeholder="User ID or name"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">
                Action
              </label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">
                Resource Type
              </label>
              <Select value={filterResource} onValueChange={setFilterResource}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select resource" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversation">Conversation</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="setting">Setting</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button onClick={handleApplyFilters} disabled={loading}>
              Apply Filters
            </Button>
            <Button onClick={handleClearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Resource
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {logs && logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-750">
                  <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center">
                      <div className="bg-gray-700 rounded-full p-1 mr-2">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium">{log.user_name}</div>
                        <div className="text-xs text-gray-400">{log.user_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      {getActionIcon(log.action)}
                      <span className={`ml-2 ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {log.resource_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">
                    {log.details ? JSON.stringify(log.details) : 'No details'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  {loading ? (
                    <div className="flex justify-center">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    </div>
                  ) : (
                    'No audit logs found'
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {logs && logs.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          Showing {logs.length} of {logs.length} entries
        </div>
      )}
    </div>
  );
};

export default AuditLogTable;