// src/components/dashboard/UserTable.tsx
"use client";

import { User } from '@/services/misybot/userService';
import { Edit, Trash2, UserX, UserCheck, Shield, Mail, Calendar } from 'lucide-react';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSuspend: (user: User) => void;
  onReactivate: (user: User) => void;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  onSuspend,
  onReactivate,
}: UserTableProps) {
  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      systemadmin: 'bg-purple-900 text-purple-300',
      tenantadmin: 'bg-blue-900 text-blue-300',
      merchant_user: 'bg-green-900 text-green-300',
      agent: 'bg-yellow-900 text-yellow-300',
    };

    const roleLabels: Record<string, string> = {
      systemadmin: 'Admin Sistema',
      tenantadmin: 'Admin Tenant',
      merchant_user: 'Comerciante',
      agent: 'Agente',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[role] || 'bg-gray-900 text-gray-300'}`}>
        <Shield className="h-3 w-3 mr-1" />
        {roleLabels[role] || role}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-900 text-green-300',
      inactive: 'bg-gray-900 text-gray-300',
      suspended: 'bg-red-900 text-red-300',
    };

    const statusLabels: Record<string, string> = {
      active: 'Activo',
      inactive: 'Inactivo',
      suspended: 'Suspendido',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-900 text-gray-300'}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-12 text-center">
        <p className="text-gray-400">No se encontraron usuarios</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Usuario
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Rol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Último Acceso
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Creado
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(user.role)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(user.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(user.last_login)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {formatDate(user.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title="Editar usuario"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  {user.status === 'active' ? (
                    <button
                      onClick={() => onSuspend(user)}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors p-1"
                      title="Suspender usuario"
                    >
                      <UserX className="h-4 w-4" />
                    </button>
                  ) : user.status === 'suspended' ? (
                    <button
                      onClick={() => onReactivate(user)}
                      className="text-green-400 hover:text-green-300 transition-colors p-1"
                      title="Reactivar usuario"
                    >
                      <UserCheck className="h-4 w-4" />
                    </button>
                  ) : null}
                  
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Eliminar usuario"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
