// src/components/dashboard/inventory/InventoryFilters.tsx
import { Filter } from 'lucide-react';

interface InventoryFiltersProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function InventoryFilters({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter
}: InventoryFiltersProps) {
  // Mock categories - in a real app, these would come from the backend
  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'Electrónica', label: 'Electrónica' },
    { value: 'Ropa', label: 'Ropa' },
    { value: 'Hogar', label: 'Hogar' },
    { value: 'Deportes', label: 'Deportes' }
  ];

  const statuses = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'out_of_stock', label: 'Sin stock' },
    { value: 'low_stock', label: 'Stock bajo' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white appearance-none"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white appearance-none"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}