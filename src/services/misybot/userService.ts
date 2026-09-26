// src/services/misybot/userService.ts
// User service for Misybot integration

import axios from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

// Create axios instance for Misybot User endpoints
const userApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
userApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const tenantId = localStorage.getItem('tenant_id') || process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID;
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'systemadmin' | 'tenantadmin' | 'merchant_user' | 'agent';
  tenant_id?: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: User['role'];
  tenant_id?: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  role?: User['role'];
  status?: User['status'];
}

export interface UserResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Get all users (with pagination)
 */
export async function getUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
}): Promise<UserResponse> {
  try {
    const response = await userApiClient.get('/api/users', { params });
    return response.data;
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
}

/**
 * Get user by ID
 */
export async function getUser(userId: string): Promise<User> {
  try {
    const response = await userApiClient.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
}

/**
 * Create new user
 */
export async function createUser(data: CreateUserDto): Promise<User> {
  try {
    const response = await userApiClient.post('/api/users', data);
    return response.data;
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
}

/**
 * Update user
 */
export async function updateUser(userId: string, data: UpdateUserDto): Promise<User> {
  try {
    const response = await userApiClient.put(`/api/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}

/**
 * Delete user
 */
export async function deleteUser(userId: string): Promise<void> {
  try {
    await userApiClient.delete(`/api/users/${userId}`);
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
}

/**
 * Change user password
 */
export async function changePassword(
  userId: string,
  data: { old_password: string; new_password: string }
): Promise<void> {
  try {
    await userApiClient.post(`/api/users/${userId}/change-password`, data);
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
}

/**
 * Suspend user
 */
export async function suspendUser(userId: string): Promise<User> {
  try {
    const response = await userApiClient.post(`/api/users/${userId}/suspend`);
    return response.data;
  } catch (error) {
    console.error('Suspend user error:', error);
    throw error;
  }
}

/**
 * Reactivate user
 */
export async function reactivateUser(userId: string): Promise<User> {
  try {
    const response = await userApiClient.post(`/api/users/${userId}/reactivate`);
    return response.data;
  } catch (error) {
    console.error('Reactivate user error:', error);
    throw error;
  }
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  suspendUser,
  reactivateUser,
};
