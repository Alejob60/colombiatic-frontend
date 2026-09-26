// src/services/misybot/inventoryService.ts
// Inventory service for Misybot integration

import axios from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

// Create axios instance for Misybot Inventory endpoints
const inventoryApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
inventoryApiClient.interceptors.request.use(
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
export interface InventoryItem {
  id: string;
  product_id: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  warehouse_location?: string;
  last_restock_date?: string;
  threshold: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateInventoryDto {
  product_id: string;
  quantity: number;
  warehouse_location?: string;
  threshold?: number;
}

export interface UpdateInventoryDto extends Partial<CreateInventoryDto> {}

export interface ReserveInventoryDto {
  quantity: number;
  order_id?: string;
}

export interface InventoryForecast {
  product_id: string;
  current_stock: number;
  predicted_demand: number;
  recommended_restock: number;
  forecast_period: string;
}

/**
 * Get all inventory items
 */
export async function getInventoryItems(tenantId: string): Promise<InventoryItem[]> {
  try {
    const response = await inventoryApiClient.get(`/api/tenants/${tenantId}/inventory`);
    return response.data;
  } catch (error) {
    console.error('Get inventory items error:', error);
    throw error;
  }
}

/**
 * Get inventory item by ID
 */
export async function getInventoryItem(tenantId: string, itemId: string): Promise<InventoryItem> {
  try {
    const response = await inventoryApiClient.get(`/api/tenants/${tenantId}/inventory/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Get inventory item error:', error);
    throw error;
  }
}

/**
 * Create new inventory item
 */
export async function createInventoryItem(
  tenantId: string,
  data: CreateInventoryDto
): Promise<InventoryItem> {
  try {
    const response = await inventoryApiClient.post(`/api/tenants/${tenantId}/inventory`, data);
    return response.data;
  } catch (error) {
    console.error('Create inventory item error:', error);
    throw error;
  }
}

/**
 * Update inventory item
 */
export async function updateInventoryItem(
  tenantId: string,
  itemId: string,
  data: UpdateInventoryDto
): Promise<InventoryItem> {
  try {
    const response = await inventoryApiClient.put(
      `/api/tenants/${tenantId}/inventory/${itemId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Update inventory item error:', error);
    throw error;
  }
}

/**
 * Delete inventory item
 */
export async function deleteInventoryItem(tenantId: string, itemId: string): Promise<void> {
  try {
    await inventoryApiClient.delete(`/api/tenants/${tenantId}/inventory/${itemId}`);
  } catch (error) {
    console.error('Delete inventory item error:', error);
    throw error;
  }
}

/**
 * Reserve inventory
 */
export async function reserveInventory(
  tenantId: string,
  itemId: string,
  data: ReserveInventoryDto
): Promise<InventoryItem> {
  try {
    const response = await inventoryApiClient.post(
      `/api/tenants/${tenantId}/inventory/${itemId}/reserve`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Reserve inventory error:', error);
    throw error;
  }
}

/**
 * Get inventory forecast for a product
 */
export async function getInventoryForecast(
  tenantId: string,
  productId: string
): Promise<InventoryForecast> {
  try {
    const response = await inventoryApiClient.get(
      `/api/tenants/${tenantId}/inventory/${productId}/forecast`
    );
    return response.data;
  } catch (error) {
    console.error('Get inventory forecast error:', error);
    throw error;
  }
}

export default {
  getInventoryItems,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  reserveInventory,
  getInventoryForecast,
};
