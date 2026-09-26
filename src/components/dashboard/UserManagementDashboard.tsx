// src/components/dashboard/UserManagementDashboard.tsx
"use client";

import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { User, CreateUserDto, UpdateUserDto } from '@/services/misybot/userService';
import UserTable from './UserTable';
import UserForm from './UserForm';
import { Search, Plus, Users as UsersIcon, UserCheck, UserX, Shield } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

export default function UserManagementDashboard() {
  const {
    users,
    loading,
    error,
    total,
    page,
    limit,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    suspendUser,
    reactivateUser,
  } = useUsers();

  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<User | null>(null);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    admins: users.filter(u => u.role === 'tenantadmin' || u.role === 'systemadmin').length,
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CreateUserDto | UpdateUserDto) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data as UpdateUserDto);
        showToast('Usuario actualizado exitosamente', 'success');
      } else {
        await createUser(data as CreateUserDto);
        showToast('Usuario creado exitosamente', 'success');
      }
      setIsFormOpen(false);
    } catch (err) {
      showToast('Error al guardar usuario', 'error');
    }
  };

  const handleDeleteUser = async (user: User) => {
    setShowDeleteConfirm(user);
  };

  const confirmDelete = async () => {
    if (showDeleteConfirm) {
      const success = await deleteUser(showDeleteConfirm.id);
      if (success) {
        showToast('Usuario eliminado exitosamente', 'success');
      } else {
        showToast('Error al eliminar usuario', 'error');
      }
      setShowDeleteConfirm(null);
    }
  };

  const handleSuspendUser = async (user: User) => {
    const result = await suspendUser(user.id);
    if (result) {
      showToast('Usuario suspendido exitosamente', 'success');
    } else {
      showToast('Error al suspender usuario', 'error');
    }
  };

  const handleReactivateUser = async (user: User) => {
    const result = await reactivateUser(user.id);
    if (result) {
      showToast('Usuario reactivado exitosamente', 'success');
    } else {
      showToast('Error al reactivar usuario', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
        <p className="text-gray-400 mt-1">Administra usuarios, roles y permisos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Usuarios</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Activos</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.active}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Suspendidos</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.suspended}</p>
            </div>
            <UserX className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Administradores</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.admins}</p>
            </div>
            <Shield className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos los roles</option>
            <option value="systemadmin">Admin Sistema</option>
            <option value="tenantadmin">Admin Tenant</option>
            <option value="merchant_user">Comerciante</option>
            <option value="agent">Agente</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="suspended">Suspendido</option>
          </select>

          <button
            onClick={handleCreateUser}
            className="flex items-center px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 rounded p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <UserTable
          users={filteredUsers}
          loading={loading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onSuspend={handleSuspendUser}
          onReactivate={handleReactivateUser}
        />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Mostrando {filteredUsers.length} de {total} usuarios
        </p>
        {/* Add pagination controls here if needed */}
      </div>

      {/* User Form Modal */}
      <UserForm
        user={selectedUser}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar al usuario <strong>{showDeleteConfirm.name}</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
