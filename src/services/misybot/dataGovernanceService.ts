// src/services/misybot/dataGovernanceService.ts
// Data governance service for Misybot integration

import { apiClient } from '@/lib/apiClient';

// Types for data governance
export interface DataSettings {
  id: string;
  instance_id: string;
  use_conversation_data: boolean;
  use_sales_data: boolean;
  use_customer_data: boolean;
  anonymize_data: boolean;
  retention_period_days: number;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  instance_id: string;
  user_id: string;
  user_name: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, any>;
  timestamp: string;
}

export interface DataPurgeRequest {
  instance_id: string;
  data_types: ('conversations' | 'sales' | 'customers' | 'all')[];
}

export interface DataPurgeResponse {
  success: boolean;
  message: string;
  purged_records: number;
}

// Role and permission types
export interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
  created_at: string;
  updated_at: string;
}

export interface UserRoleAssignment {
  id: string;
  user_id: string;
  role_id: string;
  instance_id: string;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

/**
 * Get data settings for an instance
 */
export async function getDataSettings(instanceId: string): Promise<DataSettings> {
  try {
    const response = await apiClient.get<DataSettings>(`/instances/${instanceId}/data-settings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data settings:', error);
    throw error;
  }
}

/**
 * Update data settings for an instance
 */
export async function updateDataSettings(instanceId: string, settings: Partial<DataSettings>): Promise<DataSettings> {
  try {
    const response = await apiClient.put<DataSettings>(`/instances/${instanceId}/data-settings`, settings);
    return response.data;
  } catch (error) {
    console.error('Error updating data settings:', error);
    throw error;
  }
}

/**
 * Purge data for an instance
 */
export async function purgeData(request: DataPurgeRequest): Promise<DataPurgeResponse> {
  try {
    const response = await apiClient.post<DataPurgeResponse>(`/instances/${request.instance_id}/data/purge`, request);
    return response.data;
  } catch (error) {
    console.error('Error purging data:', error);
    throw error;
  }
}

/**
 * Get audit logs for an instance
 */
export async function getAuditLogs(instanceId: string, limit: number = 50): Promise<AuditLog[]> {
  try {
    const response = await apiClient.get<AuditLog[]>(`/audit?instance_id=${instanceId}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
}

/**
 * Get audit logs with filtering
 */
export async function getFilteredAuditLogs(
  instanceId: string,
  filters: {
    user_id?: string;
    action?: string;
    resource_type?: string;
    start_date?: string;
    end_date?: string;
  }
): Promise<AuditLog[]> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set('instance_id', instanceId);
    
    if (filters.user_id) queryParams.set('user_id', filters.user_id);
    if (filters.action) queryParams.set('action', filters.action);
    if (filters.resource_type) queryParams.set('resource_type', filters.resource_type);
    if (filters.start_date) queryParams.set('start_date', filters.start_date);
    if (filters.end_date) queryParams.set('end_date', filters.end_date);
    
    const response = await apiClient.get<AuditLog[]>(`/audit?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered audit logs:', error);
    throw error;
  }
}

/**
 * Get all roles for an instance
 */
export async function getInstanceRoles(instanceId: string): Promise<Role[]> {
  try {
    const response = await apiClient.get<Role[]>(`/instances/${instanceId}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instance roles:', error);
    throw error;
  }
}

/**
 * Create a new role
 */
export async function createRole(instanceId: string, roleData: Omit<Role, 'id' | 'created_at' | 'updated_at'>): Promise<Role> {
  try {
    const response = await apiClient.post<Role>(`/instances/${instanceId}/roles`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
}

/**
 * Update a role
 */
export async function updateRole(instanceId: string, roleId: string, roleData: Partial<Role>): Promise<Role> {
  try {
    const response = await apiClient.put<Role>(`/instances/${instanceId}/roles/${roleId}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
}

/**
 * Delete a role
 */
export async function deleteRole(instanceId: string, roleId: string): Promise<void> {
  try {
    await apiClient.delete(`/instances/${instanceId}/roles/${roleId}`);
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
}

/**
 * Assign a role to a user
 */
export async function assignRoleToUser(instanceId: string, assignment: Omit<UserRoleAssignment, 'id' | 'created_at' | 'updated_at'>): Promise<UserRoleAssignment> {
  try {
    const response = await apiClient.post<UserRoleAssignment>(`/instances/${instanceId}/role-assignments`, assignment);
    return response.data;
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw error;
  }
}

/**
 * Get all role assignments for an instance
 */
export async function getRoleAssignments(instanceId: string): Promise<UserRoleAssignment[]> {
  try {
    const response = await apiClient.get<UserRoleAssignment[]>(`/instances/${instanceId}/role-assignments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role assignments:', error);
    throw error;
  }
}

/**
 * Remove a role assignment
 */
export async function removeRoleAssignment(instanceId: string, assignmentId: string): Promise<void> {
  try {
    await apiClient.delete(`/instances/${instanceId}/role-assignments/${assignmentId}`);
  } catch (error) {
    console.error('Error removing role assignment:', error);
    throw error;
  }
}

/**
 * Get all available permissions
 */
export async function getAvailablePermissions(): Promise<Permission[]> {
  try {
    const response = await apiClient.get<Permission[]>('/permissions');
    return response.data;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
}

export default {
  getDataSettings,
  updateDataSettings,
  purgeData,
  getAuditLogs,
  getFilteredAuditLogs,
  getInstanceRoles,
  createRole,
  updateRole,
  deleteRole,
  assignRoleToUser,
  getRoleAssignments,
  removeRoleAssignment,
  getAvailablePermissions
};