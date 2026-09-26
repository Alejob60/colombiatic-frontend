// src/app/(dashboard)/data-governance/page.tsx
// Data governance dashboard

"use client";

import React, { useState, useEffect } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { useAuth } from '@/contexts/AuthContext';
import useDataGovernance from '@/hooks/useDataGovernance';
import DataControlPanel from '@/components/dashboard/DataControlPanel';
import AuditLogTable from '@/components/dashboard/AuditLogTable';
import RoleManagementPanel from '@/components/dashboard/RoleManagementPanel';
import PolicyModal from '@/components/dashboard/PolicyModal';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Lock,
  Users,
  FileText,
  History
} from 'lucide-react';

// Define role permissions
const ROLE_PERMISSIONS = {
  owner: ['view', 'edit', 'delete', 'purge', 'manage_policy', 'manage_roles'],
  admin: ['view', 'edit', 'delete', 'manage_policy', 'manage_roles'],
  editor: ['view', 'edit'],
  viewer: ['view']
};

const DataGovernanceDashboard = () => {
  const { user } = useAuth();
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [acceptingPolicy, setAcceptingPolicy] = useState(false);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  
  // Use a default instance ID for now - in a real app this would come from the user's organization
  const instanceId = user?.organization_id || 'default-instance';
  const {
    settings,
    auditLogs,
    roles,
    permissions,
    roleAssignments,
    loading,
    error,
    updateSettings,
    purgeData,
    refreshAuditLogs,
    getFilteredAuditLogs,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    assignRoleToUser,
    removeRoleAssignment,
    fetchPermissions
  } = useDataGovernance(instanceId);

  // Check user permissions based on role
  useEffect(() => {
    if (user?.role) {
      const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || [];
      setUserPermissions(permissions);
    }
  }, [user]);

  // Check if user has accepted the policy (in a real app this would come from the backend)
  useEffect(() => {
    // Simulate checking policy acceptance
    const hasAccepted = localStorage.getItem('data-policy-accepted') === 'true';
    setPolicyAccepted(hasAccepted);
    
    if (!hasAccepted) {
      setShowPolicyModal(true);
    }
  }, []);

  // Check if user has permission to access this page
  const canAccessPage = userPermissions.includes('view');
  const canEdit = userPermissions.includes('edit');
  const canPurge = userPermissions.includes('purge');
  const canManageRoles = userPermissions.includes('manage_roles');

  const handleAcceptPolicy = async () => {
    try {
      setAcceptingPolicy(true);
      // In a real app, this would call an API to record the acceptance
      localStorage.setItem('data-policy-accepted', 'true');
      setPolicyAccepted(true);
      setShowPolicyModal(false);
    } catch (error) {
      console.error('Error accepting policy:', error);
    } finally {
      setAcceptingPolicy(false);
    }
  };

  // Wrapper functions to match component prop types
  const handleUpdateSettings = async (settings: Partial<any>) => {
    if (!canEdit) {
      throw new Error('Insufficient permissions to update settings');
    }
    
    try {
      await updateSettings(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  const handlePurgeData = async (request: any) => {
    if (!canPurge) {
      throw new Error('Insufficient permissions to purge data');
    }
    
    try {
      await purgeData(request);
    } catch (error) {
      console.error('Error purging data:', error);
      throw error;
    }
  };

  const handleFilterAuditLogs = async (filters: any) => {
    if (!canAccessPage) {
      throw new Error('Insufficient permissions to view audit logs');
    }
    
    try {
      await getFilteredAuditLogs(filters);
    } catch (error) {
      console.error('Error filtering audit logs:', error);
      throw error;
    }
  };

  const handleCreateRole = async (roleData: any) => {
    if (!canManageRoles) {
      throw new Error('Insufficient permissions to create roles');
    }
    
    try {
      await createRole(roleData);
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  };

  const handleUpdateRole = async (roleId: string, roleData: any) => {
    if (!canManageRoles) {
      throw new Error('Insufficient permissions to update roles');
    }
    
    try {
      await updateRole(roleId, roleData);
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!canManageRoles) {
      throw new Error('Insufficient permissions to delete roles');
    }
    
    try {
      await deleteRole(roleId);
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  };

  const handleAssignRole = async (assignment: any) => {
    if (!canManageRoles) {
      throw new Error('Insufficient permissions to assign roles');
    }
    
    try {
      await assignRoleToUser(assignment);
    } catch (error) {
      console.error('Error assigning role:', error);
      throw error;
    }
  };

  const handleRemoveAssignment = async (assignmentId: string) => {
    if (!canManageRoles) {
      throw new Error('Insufficient permissions to remove role assignments');
    }
    
    try {
      await removeRoleAssignment(assignmentId);
    } catch (error) {
      console.error('Error removing role assignment:', error);
      throw error;
    }
  };

  if (!canAccessPage) {
    return (
      <div className="p-6">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <Lock className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">
            You don't have permission to access data governance features. 
            Please contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-white">Data Governance</h1>
          <span className="ml-3 text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
            {user?.role?.toUpperCase() || 'VIEWER'}
          </span>
        </div>
        <Button
          onClick={refreshAuditLogs}
          variant="outline"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {!policyAccepted && (
        <Alert className="mb-6 bg-yellow-900/50 border-yellow-700">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-300">
            Please review and accept the Data Usage Policy to continue using data governance features.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-6 bg-red-900/50 border-red-700">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="data-controls" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data-controls" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Data Controls
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center">
            <History className="h-4 w-4 mr-2" />
            Audit Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-controls">
          <DataControlPanel
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onPurgeData={handlePurgeData}
            loading={loading}
            canEdit={canEdit}
            canPurge={canPurge}
          />
        </TabsContent>
        
        <TabsContent value="roles">
          <RoleManagementPanel
            roles={roles}
            permissions={permissions}
            roleAssignments={roleAssignments}
            onCreateRole={handleCreateRole}
            onUpdateRole={handleUpdateRole}
            onDeleteRole={handleDeleteRole}
            onAssignRole={handleAssignRole}
            onRemoveAssignment={handleRemoveAssignment}
            loading={loading}
            canManageRoles={canManageRoles}
          />
        </TabsContent>
        
        <TabsContent value="audit">
          <AuditLogTable
            logs={auditLogs || []}
            onRefresh={refreshAuditLogs}
            onFilter={handleFilterAuditLogs}
            loading={loading}
          />
        </TabsContent>
      </Tabs>

      <PolicyModal
        open={showPolicyModal}
        onClose={() => {
          if (!policyAccepted) {
            // In a real app, you might want to restrict access if policy isn't accepted
            console.warn('Policy not accepted - access may be restricted');
          }
          setShowPolicyModal(false);
        }}
        onAccept={handleAcceptPolicy}
        loading={acceptingPolicy}
      />
    </div>
  );
};

export default withAuth(DataGovernanceDashboard);