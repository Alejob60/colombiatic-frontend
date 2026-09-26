// src/components/commercial-landing/OrderStatusIndicator.tsx
"use client";

import { Order, OrderStatus } from '@/types/quickOrder.types';
import { Badge } from '@/components/ui/Badge';

interface OrderStatusIndicatorProps {
  status: OrderStatus;
  order?: Order | null;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-gray-100 text-gray-800',
  pending_payment: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-orange-100 text-orange-800',
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  pending_payment: 'Pago Pendiente',
  paid: 'Pagado',
  confirmed: 'Confirmado',
  processing: 'Procesando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
};

export function OrderStatusIndicator({ status, order }: OrderStatusIndicatorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Estado del Pedido</h3>
        <Badge className={statusColors[status]}>
          {statusLabels[status]}
        </Badge>
      </div>

      {order && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">ID:</span>
            <span>{order.id}</span>
            
            <span className="font-medium">Total:</span>
            <span>${order.total.toFixed(2)} {order.currency.toUpperCase()}</span>
            
            <span className="font-medium">Fecha:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          
          {order.items && order.items.length > 0 && (
            <div className="pt-2">
              <h4 className="font-medium mb-1">Items:</h4>
              <ul className="text-sm space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${item.subtotal.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
