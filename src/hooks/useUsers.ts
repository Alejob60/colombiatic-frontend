// src/hooks/useUsers.ts
import { useState, useEffect, useCallback } from 'react';
import * as userService from '@/services/misybot/userService';
import type { User, CreateUserDto, UpdateUserDto, UserResponse } from '@/services/misybot/userService';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  fetchUsers: (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
  }) => Promise<void>;
  createUser: (data: CreateUserDto) => Promise<User | null>;
  updateUser: (userId: string, data: UpdateUserDto) => Promise<User | null>;
  deleteUser: (userId: string) => Promise<boolean>;
  suspendUser: (userId: string) => Promise<User | null>;
  reactivateUser: (userId: string) => Promise<User | null>;
  changePassword: (userId: string, oldPassword: string, newPassword: string) => Promise<boolean>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const fetchUsers = useCallback(async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: UserResponse = await userService.getUsers(params);
      setUsers(response.users);
      setTotal(response.total);
      setPage(response.page);
      setLimit(response.limit);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: CreateUserDto): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await userService.createUser(data);
      setUsers(prev => [newUser, ...prev]);
      setTotal(prev => prev + 1);
      return newUser;
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario');
      console.error('Create user error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId: string, data: UpdateUserDto): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userService.updateUser(userId, data);
      setUsers(prev => prev.map(u => u.id === userId ? updatedUser : u));
      return updatedUser;
    } catch (err: any) {
      setError(err.message || 'Error al actualizar usuario');
      console.error('Update user error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await userService.deleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      setTotal(prev => prev - 1);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al eliminar usuario');
      console.error('Delete user error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const suspendUser = useCallback(async (userId: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const suspendedUser = await userService.suspendUser(userId);
      setUsers(prev => prev.map(u => u.id === userId ? suspendedUser : u));
      return suspendedUser;
    } catch (err: any) {
      setError(err.message || 'Error al suspender usuario');
      console.error('Suspend user error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reactivateUser = useCallback(async (userId: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const reactivatedUser = await userService.reactivateUser(userId);
      setUsers(prev => prev.map(u => u.id === userId ? reactivatedUser : u));
      return reactivatedUser;
    } catch (err: any) {
      setError(err.message || 'Error al reactivar usuario');
      console.error('Reactivate user error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await userService.changePassword(userId, {
        old_password: oldPassword,
        new_password: newPassword,
      });
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al cambiar contraseña');
      console.error('Change password error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
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
    changePassword,
  };
}
