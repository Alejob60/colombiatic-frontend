// src/components/dashboard/inventory/InventoryKPIs.tsx
import { TrendingUp, AlertTriangle, CheckCircle, Package, DollarSign } from 'lucide-react';

interface KPIs {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  lowStock: number;
  totalValue: number;
}

interface InventoryKPIsProps {
  kpis: KPIs;
  loading: boolean;
}

export default function InventoryKPIs({ kpis, loading }: InventoryKPIsProps) {
  const kpiData = [
    {
      title: "Total Productos",
      value: kpis.totalProducts,
      icon: <Package className="h-6 w-6 text-blue-400" />,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Productos Activos",
      value: kpis.activeProducts,
      icon: <CheckCircle className="h-6 w-6 text-green-400" />,
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Sin Stock",
      value: kpis.outOfStock,
      icon: <AlertTriangle className="h-6 w-6 text-red-400" />,
      change: "+2%",
      changeType: "negative"
    },
    {
      title: "Stock Bajo",
      value: kpis.lowStock,
      icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
      change: "-3%",
      changeType: "positive"
    },
    {
      title: "Valor Total",
      value: `$${kpis.totalValue.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6 text-purple-400" />,
      change: "+8%",
      changeType: "positive"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="h-6 w-6 bg-gray-700 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{kpi.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
            </div>
            {kpi.icon}
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className={`h-4 w-4 ${kpi.changeType === 'positive' ? 'text-green-400' : 'text-red-400'} mr-1`} />
            <span className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change}
            </span>
            <span className="text-sm text-gray-400 ml-1">vs mes anterior</span>
          </div>
        </div>
      ))}
    </div>
  );
}