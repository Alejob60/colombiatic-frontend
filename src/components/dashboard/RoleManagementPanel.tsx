// src/components/dashboard/RoleManagementPanel.tsx
// Role management panel for data governance

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Shield
} from 'lucide-react';
import * as dataGovernanceService from '@/services/misybot/dataGovernanceService';

interface RoleManagementPanelProps {
  roles: dataGovernanceService.Role[] | null;
  permissions: dataGovernanceService.Permission[] | null;
  roleAssignments: dataGovernanceService.UserRoleAssignment[] | null;
  onCreateRole: (roleData: Omit<dataGovernanceService.Role, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onUpdateRole: (roleId: string, roleData: Partial<dataGovernanceService.Role>) => Promise<void>;
  onDeleteRole: (roleId: string) => Promise<void>;
  onAssignRole: (assignment: Omit<dataGovernanceService.UserRoleAssignment, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onRemoveAssignment: (assignmentId: string) => Promise<void>;
  loading: boolean;
  canManageRoles?: boolean;
}

const RoleManagementPanel: React.FC<RoleManagementPanelProps> = ({ 
  roles, 
  permissions, 
  roleAssignments,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
  onAssignRole,
  onRemoveAssignment,
  loading,
  canManageRoles = true
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });
  const [editRole, setEditRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });
  const [newAssignment, setNewAssignment] = useState({
    user_id: '',
    role_id: ''
  });

  const handleCreateRole = async () => {
    if (!newRole.name.trim()) return;
    
    try {
      await onCreateRole(newRole);
      setNewRole({
        name: '',
        description: '',
        permissions: []
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdateRole = async (roleId: string) => {
    try {
      await onUpdateRole(roleId, editRole);
      setEditingRoleId(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    
    try {
      await onDeleteRole(roleId);
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleAssignRole = async () => {
    if (!newAssignment.user_id || !newAssignment.role_id) return;
    
    try {
      await onAssignRole(newAssignment);
      setNewAssignment({
        user_id: '',
        role_id: ''
      });
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  const togglePermission = (permissionId: string, isEditing: boolean = false) => {
    if (isEditing) {
      setEditRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(id => id !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    } else {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(id => id !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    }
  };

  const startEditing = (role: dataGovernanceService.Role) => {
    setEditingRoleId(role.id);
    setEditRole({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
  };

  const cancelEditing = () => {
    setEditingRoleId(null);
  };

  const getRoleName = (roleId: string) => {
    const role = roles?.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  };

  const getUserEmail = (userId: string) => {
    // In a real app, this would come from a user service
    return `user-${userId.substring(0, 8)}@example.com`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-bold text-white">Role Management</h2>
        {!canManageRoles && (
          <span className="ml-2 text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">
            Read-only
          </span>
        )}
      </div>

      {/* Create Role Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Create New Role</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Role Name</label>
              <Input
                value={newRole.name}
                onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
                className="bg-gray-700 border-gray-600 text-white"
                disabled={!canManageRoles}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Input
                value={newRole.description}
                onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter role description"
                className="bg-gray-700 border-gray-600 text-white"
                disabled={!canManageRoles}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-700 rounded">
                {permissions?.map(permission => (
                  <div key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`perm-${permission.id}`}
                      checked={newRole.permissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      disabled={!canManageRoles}
                      className="mr-2 h-4 w-4 text-primary"
                    />
                    <label htmlFor={`perm-${permission.id}`} className="text-sm text-gray-300">
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleCreateRole}
                disabled={!newRole.name.trim() || !canManageRoles || loading}
              >
                <Save className="h-4 w-4 mr-2" />
                Create Role
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Role Assignment Form */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-4">Assign Role to User</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">User ID</label>
            <Input
              value={newAssignment.user_id}
              onChange={(e) => setNewAssignment(prev => ({ ...prev, user_id: e.target.value }))}
              placeholder="Enter user ID"
              className="bg-gray-700 border-gray-600 text-white"
              disabled={!canManageRoles}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
            <Select 
              value={newAssignment.role_id} 
              onValueChange={(value) => setNewAssignment(prev => ({ ...prev, role_id: value }))}
              disabled={!canManageRoles}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles?.map(role => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={handleAssignRole}
              disabled={!newAssignment.user_id || !newAssignment.role_id || !canManageRoles || loading}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Assign Role
            </Button>
          </div>
        </div>
      </div>

      {/* Roles List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Roles</h3>
          {canManageRoles && (
            <Button
              onClick={() => setShowCreateForm(true)}
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          {roles?.map(role => (
            <div key={role.id} className="bg-gray-900 rounded-lg p-4">
              {editingRoleId === role.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Role Name</label>
                    <Input
                      value={editRole.name}
                      onChange={(e) => setEditRole(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      disabled={!canManageRoles}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <Input
                      value={editRole.description}
                      onChange={(e) => setEditRole(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      disabled={!canManageRoles}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Permissions</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-700 rounded">
                      {permissions?.map(permission => (
                        <div key={permission.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`edit-perm-${permission.id}`}
                            checked={editRole.permissions.includes(permission.id)}
                            onChange={() => togglePermission(permission.id, true)}
                            disabled={!canManageRoles}
                            className="mr-2 h-4 w-4 text-primary"
                          />
                          <label htmlFor={`edit-perm-${permission.id}`} className="text-sm text-gray-300">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleUpdateRole(role.id)}
                      disabled={!canManageRoles || loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      variant="outline"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{role.name}</h4>
                      <p className="text-sm text-gray-400">{role.description}</p>
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Permissions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {role.permissions.map(permId => {
                            const perm = permissions?.find(p => p.id === permId);
                            return (
                              <span 
                                key={permId} 
                                className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded"
                              >
                                {perm?.name || permId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {canManageRoles && (
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => startEditing(role)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteRole(role.id)}
                          variant="destructive"
                          size="sm"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {roles && roles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No roles found. Create your first role to get started.
            </div>
          )}
        </div>
      </div>

      {/* Role Assignments List */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Role Assignments</h3>
        <div className="space-y-3">
          {roleAssignments?.map(assignment => (
            <div key={assignment.id} className="bg-gray-900 rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="font-medium text-white">
                  {getUserEmail(assignment.user_id)}
                </div>
                <div className="text-sm text-gray-400">
                  Role: {getRoleName(assignment.role_id)}
                </div>
              </div>
              {canManageRoles && (
                <Button
                  onClick={() => onRemoveAssignment(assignment.id)}
                  variant="destructive"
                  size="sm"
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          {roleAssignments && roleAssignments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No role assignments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPanel;