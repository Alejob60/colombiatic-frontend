// src/services/misybot/marketplaceService.ts
// Marketplace Management Service

import { apiClient } from '@/lib/apiClient';

// Types for marketplace management
export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'template' | 'skill' | 'flow';
  price: number;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  sales_count: number;
  total_revenue: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Sale {
  id: string;
  product_id: string;
  product_name: string;
  customer_id: string;
  customer_name: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  created_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  type: 'template' | 'skill' | 'flow';
  price: number;
  tags: string[];
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  status?: 'draft' | 'published' | 'archived';
  tags?: string[];
}

export interface MarketplaceStats {
  total_products: number;
  total_sales: number;
  total_revenue: number;
  total_customers: number;
}

/**
 * Create a new product
 */
export async function createProduct(request: CreateProductRequest): Promise<Product> {
  try {
    const response = await apiClient.post<Product>('/marketplace/products', request);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Get all products for the current user
 */
export async function getMyProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<Product[]>('/marketplace/products/my');
    return response.data;
  } catch (error) {
    console.error('Error fetching my products:', error);
    throw error;
  }
}

/**
 * Get product details
 */
export async function getProduct(id: string): Promise<Product> {
  try {
    const response = await apiClient.get<Product>(`/marketplace/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Update product
 */
export async function updateProduct(id: string, request: UpdateProductRequest): Promise<Product> {
  try {
    const response = await apiClient.put<Product>(`/marketplace/products/${id}`, request);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Delete product
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    await apiClient.delete<void>(`/marketplace/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

/**
 * Get recent sales for the current user
 */
export async function getMySales(): Promise<Sale[]> {
  try {
    const response = await apiClient.get<Sale[]>('/marketplace/sales/my');
    return response.data;
  } catch (error) {
    console.error('Error fetching my sales:', error);
    throw error;
  }
}

/**
 * Get marketplace statistics
 */
export async function getMarketplaceStats(): Promise<MarketplaceStats> {
  try {
    const response = await apiClient.get<MarketplaceStats>('/marketplace/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching marketplace stats:', error);
    throw error;
  }
}

export default {
  createProduct,
  getMyProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getMySales,
  getMarketplaceStats
};