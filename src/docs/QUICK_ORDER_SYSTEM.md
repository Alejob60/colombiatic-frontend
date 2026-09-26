# Sistema de Compra Rápida ColombiaTIC

## Descripción
Este sistema permite la creación de órdenes rápidas y procesamiento de pagos integrado con el backend NestJS de ColombiaTIC.

## Componentes Principales

### 1. QuickOrderButton
Botón que inicia el proceso de compra rápida.

```tsx
<QuickOrderButton
  productId="service-premium-001"
  quantity={1}
  context={{ plan: 'premium', source: 'landing' }}
  onOrderCreated={(orderId) => console.log('Orden creada:', orderId)}
  onPaymentComplete={(orderId) => console.log('Pago completado:', orderId)}
  variant="primary"
>
  Comprar Ahora
</QuickOrderButton>
```

### 2. CheckoutModal
Modal que guía al usuario a través del proceso de checkout.

### 3. MockPaymentForm
Formulario para simular pagos en ambiente de desarrollo.

### 4. OrderStatusIndicator
Indicador visual del estado de la orden.

## Hooks Disponibles

### useQuickOrder
Gestiona la creación de órdenes y el proceso de checkout.

```tsx
const { createOrder, initiateCheckout, openCheckout } = useQuickOrder();
```

### usePaymentStatus
Monitorea el estado del pago en tiempo real.

```tsx
const { status, order, isPolling } = usePaymentStatus({ 
  orderId, 
  tenantId 
});
```

## Servicios

### quickOrderService
Servicio para crear órdenes rápidas.

### paymentService
Servicio para procesar pagos.

## Configuración

### Variables de Entorno
```env
NEXT_PUBLIC_API_URL=http://localhost:3007/api
NEXT_PUBLIC_USE_MOCK_PAYMENTS=true
```

## Uso en Páginas

### Ejemplo de Implementación
```tsx
'use client'

import { QuickOrderButton } from '@/components/commercial-landing/QuickOrderButton';

export default function ProductPage() {
  return (
    <div>
      <h1>Servicio Premium</h1>
      <QuickOrderButton
        productId="service-premium-001"
        context={{ source: 'product-page' }}
      >
        Comprar por $99
      </QuickOrderButton>
    </div>
  );
}
```