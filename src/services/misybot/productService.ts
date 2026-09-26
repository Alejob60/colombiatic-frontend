// src/services/misybot/productService.ts
// Product service for Misybot integration

import axios from 'axios';
import { getAccessToken } from '@/lib/tokenManager';

// Create axios instance for Misybot Product endpoints
const productApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and tenant ID
productApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add tenant ID from localStorage or default
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
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images?: string[];
  sku?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku?: string;
  images?: string[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

/**
 * Get all products for a tenant
 */
export async function getProducts(tenantId: string): Promise<Product[]> {
  try {
    const response = await productApiClient.get(`/api/tenants/${tenantId}/products`);
    return response.data;
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
}

/**
 * Get a single product by ID
 */
export async function getProduct(tenantId: string, productId: string): Promise<Product> {
  try {
    const response = await productApiClient.get(`/api/tenants/${tenantId}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Get product error:', error);
    throw error;
  }
}

/**
 * Create a new product
 */
export async function createProduct(tenantId: string, data: CreateProductDto): Promise<Product> {
  try {
    const response = await productApiClient.post(`/api/tenants/${tenantId}/products`, data);
    return response.data;
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(
  tenantId: string,
  productId: string,
  data: UpdateProductDto
): Promise<Product> {
  try {
    const response = await productApiClient.put(
      `/api/tenants/${tenantId}/products/${productId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(tenantId: string, productId: string): Promise<void> {
  try {
    await productApiClient.delete(`/api/tenants/${tenantId}/products/${productId}`);
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}

/**
 * Upload product image
 */
export async function uploadProductImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await productApiClient.post('/api/upload/product-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.url;
  } catch (error) {
    console.error('Upload product image error:', error);
    throw error;
  }
}

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
};
