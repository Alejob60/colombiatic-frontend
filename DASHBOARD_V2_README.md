# Dashboard ColombiaTIC AI Ecosystem - V2

## 🎯 Arquitectura Implementada

Sistema de Dashboard modular con **3 paneles fijos**:
- **Panel Izquierdo**: Sidebar de navegación (colapsable)
- **Panel Central**: Área dinámica controlada por Meta-Agente + rutas Next.js
- **Panel Derecho**: Chat IA permanente con historial persistente

---

## 📁 Estructura de Archivos

```
src/
├── store/
│   └── useDashboardStore.ts          # Zustand store global
├── hooks/
│   └── useChatSocket.ts              # WebSocket hook para Meta-Agente
├── components/
│   └── dashboard-v2/
│       ├── DashboardLayoutV2.tsx     # Layout principal (3 paneles)
│       ├── SidebarLeft.tsx           # Sidebar con navegación
│       ├── AIAssistantChat.tsx       # Chat permanente (derecha)
│       ├── DynamicRenderer.tsx       # Renderizador dinámico
│       └── views/                    # Vistas dinámicas
│           ├── ServiceDetailView.tsx
│           ├── ProductDetailView.tsx
│           ├── ServiceActivationView.tsx
│           └── CatalogListView.tsx
```

---

## 🚀 Uso del Dashboard

### 1. Integrar el Layout

```typescript
// En tu app/(dashboard)/layout.tsx
import DashboardLayoutV2 from '@/components/dashboard-v2/DashboardLayoutV2';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutV2>{children}</DashboardLayoutV2>;
}
```

### 2. Usar el Store Global

```typescript
import { useDashboardStore } from '@/store/useDashboardStore';

function MyComponent() {
  const { messages, setCurrentView, addMessage } = useDashboardStore();
  
  // Cambiar vista dinámica
  setCurrentView({
    type: 'service_detail',
    data: { serviceId: 'misybot_ai', serviceName: 'Misybot AI' }
  });
}
```

### 3. Conectar con Meta-Agente

```typescript
import { useChatSocket } from '@/hooks/useChatSocket';

function ChatComponent() {
  const { user } = useAuth();
  const { sendMessage, executeAction, isConnected } = useChatSocket(user?.id);
  
  // Enviar mensaje
  sendMessage('Quiero activar Misybot AI');
  
  // Ejecutar acción
  executeAction('activate_service', { serviceId: 'misybot_ai' });
}
```

---

## 🔌 Comandos del Meta-Agente

El Meta-Agente puede enviar comandos via WebSocket que el frontend interpreta automáticamente:

### 1. Navegación Interna
```json
{
  "type": "navigate",
  "target": "/dashboard/services"
}
```

### 2. Navegación Externa
```json
{
  "type": "navigate",
  "target": "https://checkout.colombiatic.com/..."
}
```

### 3. Renderizar Vista Dinámica
```json
{
  "type": "render_view",
  "view": "service_detail",
  "serviceId": "misybot_ai"
}
```

### 4. Ejecutar Acción
```json
{
  "type": "action",
  "action": "activate_service",
  "data": { "serviceId": "adn_web" }
}
```

---

## 💾 Persistencia

### LocalStorage
- `dashboard-storage`: Estado del store (messages, conversationId, sidebarCollapsed)

### Estado Persistente
- Historial de chat se mantiene entre navegaciones
- conversationId se preserva entre sesiones
- Sidebar colapsado recuerda preferencia del usuario

---

## 🎨 Características UI

### Sidebar
- ✅ Colapsable a modo mini (solo iconos)
- ✅ Highlight del ítem activo
- ✅ Animaciones smooth con Framer Motion
- ✅ Menú completo: Dashboard, Servicios, Comprar, Settings, Perfil, Logout

### Chat IA
- ✅ Permanente (no desaparece al cambiar de ruta)
- ✅ Historial persistente
- ✅ Quick replies y botones de acción
- ✅ Indicador de conexión en tiempo real
- ✅ Minimizable
- ✅ Indicador de typing

### Panel Dinámico
- ✅ Renderiza vistas generadas por IA
- ✅ Transiciones suaves
- ✅ Estados: loading, error, empty
- ✅ Botón de cerrar para volver a contenido por defecto

---

## 🌐 Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_METAAGENT_URL=http://localhost:3001
```

---

## 📦 Dependencias Instaladas

```bash
npm install socket.io-client zustand
```

---

## 🔧 Próximos Pasos

1. ✅ Configurar WebSocket en backend (NestJS + Socket.IO)
2. ✅ Implementar Meta-Agente que envíe comandos
3. ✅ Expandir vistas dinámicas (ServiceActivationView, etc.)
4. ✅ Implementar autenticación JWT en WebSocket
5. ✅ Agregar notificaciones push del Meta-Agente

---

## 💡 Ejemplo Completo de Flujo

**Usuario en Landing** → Pregunta al chat sobre Misybot AI

**Meta-Agente** → Envía comando:
```json
{
  "type": "render_view",
  "view": "service_detail",
  "serviceId": "misybot_ai",
  "data": {
    "serviceName": "Misybot AI",
    "description": "Chatbot omnicanal inteligente",
    "features": ["WhatsApp", "Web", "Instagram"],
    "price": 99
  }
}
```

**Frontend** → DynamicRenderer renderiza ServiceDetailView en panel central

**Usuario** → Click en "Activar Servicio"

**Frontend** → executeAction('activate_service', { serviceId: 'misybot_ai' })

**Meta-Agente** → Procesa activación y responde en chat

**Chat** → Muestra confirmación: "✅ Misybot AI activado correctamente"

---

## 🎯 Arquitectura de Estado

```
Zustand Store (useDashboardStore)
├── Chat State
│   ├── conversationId
│   ├── messages[]
│   └── isTyping
├── UI State
│   ├── currentView (DynamicView)
│   ├── sidebarCollapsed
│   └── currentRoute
└── WebSocket State
    ├── isConnected
    └── pendingAction
```

---

**Dashboard implementado exitosamente!** 🚀
