// src/components/dashboard/inventory/InventoryDashboard.tsx
"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import ProductTable, { Product } from './ProductTable';
import InventoryKPIs from './InventoryKPIs';
import InventoryFilters from './InventoryFilters';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Producto A",
    sku: "SKU-001",
    category: "Electrónica",
    price: 299.99,
    stock: 50,
    status: "active",
    image: "/product-a.jpg"
  },
  {
    id: 2,
    name: "Producto B",
    sku: "SKU-002",
    category: "Ropa",
    price: 49.99,
    stock: 0,
    status: "out_of_stock",
    image: "/product-b.jpg"
  },
  {
    id: 3,
    name: "Producto C",
    sku: "SKU-003",
    category: "Hogar",
    price: 199.99,
    stock: 25,
    status: "low_stock",
    image: "/product-c.jpg"
  },
  {
    id: 4,
    name: "Producto D",
    sku: "SKU-004",
    category: "Electrónica",
    price: 149.99,
    stock: 100,
    status: "active",
    image: "/product-d.jpg"
  }
];

const mockKPIs = {
  totalProducts: 124,
  activeProducts: 98,
  outOfStock: 12,
  lowStock: 14,
  totalValue: 45678.90
};

export default function InventoryDashboard() {
  const [products, setProducts] = useState(mockProducts);
  const [kpis, setKpis] = useState(mockKPIs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Simulate loading data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const handleAddProduct = () => {
    // In a real implementation, this would open a modal or navigate to a product creation page
    console.log("Add product");
  };

  const handleEditProduct = (productId: number) => {
    // In a real implementation, this would open a modal or navigate to a product edit page
    console.log("Edit product", productId);
  };

  const handleDeleteProduct = (productId: number) => {
    // In a real implementation, this would show a confirmation dialog and delete the product
    console.log("Delete product", productId);
  };

  const handleViewProduct = (productId: number) => {
    // In a real implementation, this would navigate to the product detail page
    console.log("View product", productId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventario y Productos</h1>
          <p className="text-gray-400 mt-1">Gestiona tu catálogo de productos y niveles de inventario</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Agregar Producto
        </button>
      </div>

      {/* KPIs */}
      <InventoryKPIs kpis={kpis} loading={loading} />

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
              />
            </div>
          </div>
          <InventoryFilters
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onView={handleViewProduct}
      />
    </div>
  );
}