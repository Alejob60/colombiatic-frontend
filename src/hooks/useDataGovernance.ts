// src/hooks/useDataGovernance.ts
// Custom hook for data governance functionality

import { useState, useEffect } from 'react';
import * as dataGovernanceService from '@/services/misybot/dataGovernanceService';

export interface DataGovernanceState {
  settings: dataGovernanceService.DataSettings | null;
  auditLogs: dataGovernanceService.AuditLog[] | null;
  roles: dataGovernanceService.Role[] | null;
  permissions: dataGovernanceService.Permission[] | null;
  roleAssignments: dataGovernanceService.UserRoleAssignment[] | null;
  loading: boolean;
  error: string | null;
}

export const useDataGovernance = (instanceId: string) => {
  const [state, setState] = useState<DataGovernanceState>({
    settings: null,
    auditLogs: null,
    roles: null,
    permissions: null,
    roleAssignments: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Fetch data settings, audit logs, roles, permissions, and role assignments in parallel
        const [settings, auditLogs, roles, permissions, roleAssignments] = await Promise.all([
          dataGovernanceService.getDataSettings(instanceId),
          dataGovernanceService.getAuditLogs(instanceId),
          dataGovernanceService.getInstanceRoles(instanceId),
          dataGovernanceService.getAvailablePermissions(),
          dataGovernanceService.getRoleAssignments(instanceId)
        ]);
        
        setState({
          settings,
          auditLogs,
          roles,
          permissions,
          roleAssignments,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching data governance data:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load data governance data'
        }));
      }
    };
    
    if (instanceId) {
      fetchData();
    }
  }, [instanceId]);
  
  const updateSettings = async (settings: Partial<dataGovernanceService.DataSettings>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const updatedSettings = await dataGovernanceService.updateDataSettings(instanceId, settings);
      
      setState(prev => ({
        ...prev,
        settings: updatedSettings,
        loading: false,
        error: null
      }));
      
      return updatedSettings;
    } catch (error) {
      console.error('Error updating data settings:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update data settings'
      }));
      throw error;
    }
  };
  
  const purgeData = async (request: dataGovernanceService.DataPurgeRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const result = await dataGovernanceService.purgeData(request);
      
      // Refresh audit logs after purge
      const auditLogs = await dataGovernanceService.getAuditLogs(instanceId);
      
      setState(prev => ({
        ...prev,
        auditLogs,
        loading: false,
        error: null
      }));
      
      return result;
    } catch (error) {
      console.error('Error purging data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to purge data'
      }));
      throw error;
    }
  };
  
  const refreshAuditLogs = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const auditLogs = await dataGovernanceService.getAuditLogs(instanceId);
      
      setState(prev => ({
        ...prev,
        auditLogs,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error refreshing audit logs:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh audit logs'
      }));
    }
  };
  
  const getFilteredAuditLogs = async (filters: {
    user_id?: string;
    action?: string;
    resource_type?: string;
    start_date?: string;
    end_date?: string;
  }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const auditLogs = await dataGovernanceService.getFilteredAuditLogs(instanceId, filters);
      
      setState(prev => ({
        ...prev,
        auditLogs,
        loading: false,
        error: null
      }));
      
      return auditLogs;
    } catch (error) {
      console.error('Error fetching filtered audit logs:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch filtered audit logs'
      }));
      throw error;
    }
  };
  
  // Role management functions
  const fetchRoles = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const roles = await dataGovernanceService.getInstanceRoles(instanceId);
      
      setState(prev => ({
        ...prev,
        roles,
        loading: false,
        error: null
      }));
      
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch roles'
      }));
      throw error;
    }
  };
  
  const createRole = async (roleData: Omit<dataGovernanceService.Role, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const newRole = await dataGovernanceService.createRole(instanceId, roleData);
      
      // Refresh roles list
      const roles = await dataGovernanceService.getInstanceRoles(instanceId);
      
      setState(prev => ({
        ...prev,
        roles,
        loading: false,
        error: null
      }));
      
      return newRole;
    } catch (error) {
      console.error('Error creating role:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create role'
      }));
      throw error;
    }
  };
  
  const updateRole = async (roleId: string, roleData: Partial<dataGovernanceService.Role>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const updatedRole = await dataGovernanceService.updateRole(instanceId, roleId, roleData);
      
      // Refresh roles list
      const roles = await dataGovernanceService.getInstanceRoles(instanceId);
      
      setState(prev => ({
        ...prev,
        roles,
        loading: false,
        error: null
      }));
      
      return updatedRole;
    } catch (error) {
      console.error('Error updating role:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update role'
      }));
      throw error;
    }
  };
  
  const deleteRole = async (roleId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await dataGovernanceService.deleteRole(instanceId, roleId);
      
      // Refresh roles list
      const roles = await dataGovernanceService.getInstanceRoles(instanceId);
      
      setState(prev => ({
        ...prev,
        roles,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error deleting role:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to delete role'
      }));
      throw error;
    }
  };
  
  const assignRoleToUser = async (assignment: Omit<dataGovernanceService.UserRoleAssignment, 'id' | 'created_at' | 'updated_at' | 'instance_id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const newAssignment = await dataGovernanceService.assignRoleToUser(instanceId, assignment);
      
      // Refresh role assignments
      const roleAssignments = await dataGovernanceService.getRoleAssignments(instanceId);
      
      setState(prev => ({
        ...prev,
        roleAssignments,
        loading: false,
        error: null
      }));
      
      return newAssignment;
    } catch (error) {
      console.error('Error assigning role to user:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to assign role to user'
      }));
      throw error;
    }
  };
  
  const removeRoleAssignment = async (assignmentId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      await dataGovernanceService.removeRoleAssignment(instanceId, assignmentId);
      
      // Refresh role assignments
      const roleAssignments = await dataGovernanceService.getRoleAssignments(instanceId);
      
      setState(prev => ({
        ...prev,
        roleAssignments,
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error removing role assignment:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to remove role assignment'
      }));
      throw error;
    }
  };
  
  const fetchPermissions = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const permissions = await dataGovernanceService.getAvailablePermissions();
      
      setState(prev => ({
        ...prev,
        permissions,
        loading: false,
        error: null
      }));
      
      return permissions;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch permissions'
      }));
      throw error;
    }
  };
  
  return {
    ...state,
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
  };
};

export default useDataGovernance;