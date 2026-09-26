// src/components/dashboard/inventory/ProductTable.tsx
import { Eye, Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'out_of_stock' | 'low_stock';
  image: string;
}

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

export default function ProductTable({ products, loading, onEdit, onDelete, onView }: ProductTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Activo
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Sin stock
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Stock bajo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-gray-300">
            Desconocido
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-700"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-800 border-t border-gray-700"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Producto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Categoría
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Precio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onView(product.id)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Ver"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onEdit(product.id)}
                        className="text-yellow-400 hover:text-yellow-300"
                        title="Editar"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Eliminar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-600">
        <div className="text-sm text-gray-300">
          Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
          <span className="font-medium">42</span> resultados
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-gray-600 text-white text-sm hover:bg-gray-500">
            Anterior
          </button>
          <button className="px-3 py-1 rounded-md bg-primary text-white text-sm hover:bg-blue-700">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}