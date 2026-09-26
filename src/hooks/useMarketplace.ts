// src/hooks/useMarketplace.ts
// Custom hook for marketplace management

import { useState, useEffect } from 'react';
import * as marketplaceService from '@/services/misybot/marketplaceService';

export interface MarketplaceState {
  products: marketplaceService.Product[];
  sales: marketplaceService.Sale[];
  stats: marketplaceService.MarketplaceStats | null;
  loading: boolean;
  error: string | null;
}

export const useMarketplace = () => {
  const [state, setState] = useState<MarketplaceState>({
    products: [],
    sales: [],
    stats: null,
    loading: false,
    error: null
  });

  const fetchProducts = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const products = await marketplaceService.getMyProducts();
      // For now, we'll use mock data
      const mockProducts: marketplaceService.Product[] = [
        {
          id: '1',
          name: 'Customer Support Bot Template',
          description: 'Pre-built template for customer support chatbots',
          type: 'template',
          price: 49.99,
          status: 'published',
          tags: ['support', 'chatbot', 'customer-service'],
          sales_count: 124,
          total_revenue: 6198.76,
          rating: 4.8,
          created_at: '2025-10-15',
          updated_at: '2025-11-01'
        },
        {
          id: '2',
          name: 'E-commerce Assistant Skill',
          description: 'AI skill for e-commerce product recommendations',
          type: 'skill',
          price: 29.99,
          status: 'published',
          tags: ['ecommerce', 'recommendations', 'sales'],
          sales_count: 87,
          total_revenue: 2609.13,
          rating: 4.6,
          created_at: '2025-10-20',
          updated_at: '2025-11-05'
        }
      ];
      
      setState(prev => ({
        ...prev,
        products: mockProducts,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products'
      }));
    }
  };

  const fetchSales = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const sales = await marketplaceService.getMySales();
      // For now, we'll use mock data
      const mockSales: marketplaceService.Sale[] = [
        {
          id: '1001',
          product_id: '1',
          product_name: 'Customer Support Bot Template',
          customer_id: 'c1',
          customer_name: 'Acme Corp',
          amount: 49.99,
          status: 'completed',
          created_at: '2025-11-25'
        },
        {
          id: '1002',
          product_id: '2',
          product_name: 'E-commerce Assistant Skill',
          customer_id: 'c2',
          customer_name: 'Global Retail Inc',
          amount: 29.99,
          status: 'completed',
          created_at: '2025-11-24'
        }
      ];
      
      setState(prev => ({
        ...prev,
        sales: mockSales,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching sales:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch sales'
      }));
    }
  };

  const fetchStats = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would fetch from the API
      // const stats = await marketplaceService.getMarketplaceStats();
      // For now, we'll use mock data
      const mockStats: marketplaceService.MarketplaceStats = {
        total_products: 2,
        total_sales: 211,
        total_revenue: 8807.89,
        total_customers: 42
      };
      
      setState(prev => ({
        ...prev,
        stats: mockStats,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch statistics'
      }));
    }
  };

  const createProduct = async (request: marketplaceService.CreateProductRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const product = await marketplaceService.createProduct(request);
      // For now, we'll simulate the creation
      const newProduct: marketplaceService.Product = {
        id: Date.now().toString(),
        ...request,
        status: 'draft', // Default status for new products
        sales_count: 0,
        total_revenue: 0,
        rating: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        products: [...prev.products, newProduct],
        loading: false
      }));
      
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create product'
      }));
      throw error;
    }
  };

  const updateProduct = async (id: string, request: marketplaceService.UpdateProductRequest) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // const updatedProduct = await marketplaceService.updateProduct(id, request);
      // For now, we'll simulate the update
      const updatedProducts = state.products.map(product => 
        product.id === id 
          ? { ...product, ...request, updated_at: new Date().toISOString() } 
          : product
      );
      
      setState(prev => ({
        ...prev,
        products: updatedProducts,
        loading: false
      }));
      
      return updatedProducts.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Error updating product:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to update product'
      }));
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real implementation, this would call the API
      // await marketplaceService.deleteProduct(id);
      // For now, we'll simulate the deletion
      const updatedProducts = state.products.filter(product => product.id !== id);
      
      setState(prev => ({
        ...prev,
        products: updatedProducts,
        loading: false
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to delete product'
      }));
      throw error;
    }
  };

  return {
    ...state,
    fetchProducts,
    fetchSales,
    fetchStats,
    createProduct,
    updateProduct,
    deleteProduct
  };
};

export default useMarketplace;