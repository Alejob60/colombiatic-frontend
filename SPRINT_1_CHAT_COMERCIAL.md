# Sprint 1 - Chat Comercial ColombiaTIC 🚀

## 📋 Resumen Ejecutivo

**Sprint 1** implementa el flujo de venta rápida para ColombiaTIC, integrando un chat conversacional con el **Meta-Agente V2** que actúa como **Asesor IA Personal** del usuario.

**Objetivo**: Permitir que usuarios no autenticados exploren servicios mediante chat, y al intentar comprar, se guarde el contexto y se reanude la conversación después del login.

---

## ✅ Historias de Usuario Implementadas

### Story 1.1: Chat Frontdesk en Landing ✅

**Como** visitante de la landing page  
**Quiero** ver un chat de IA abierto automáticamente  
**Para** recibir asesoría personalizada sobre los servicios de ColombiaTIC

**Criterios de Aceptación:**
- ✅ Chat visible y abierto por defecto en landing (`/`)
- ✅ Posicionado en esquina inferior derecha (400x600px)
- ✅ Mensaje de bienvenida del Asesor IA ColombiaTIC
- ✅ 5 respuestas rápidas como botones interactivos
- ✅ Comunicación con Meta-Agente V2 en `http://localhost:3007`
- ✅ Payload con `commercialMode.enabled: true`

**Archivos creados:**
- [`src/components/chat/FrontdeskChat.tsx`](src/components/chat/FrontdeskChat.tsx) - Componente principal del chat (260 líneas)
- [`src/hooks/useChatSession.ts`](src/hooks/useChatSession.ts) - Hook de gestión de chat (242 líneas)

**Archivos modificados:**
- [`src/components/pages/IaLandingPage.tsx`](src/components/pages/IaLandingPage.tsx) - Integración del chat

---

### Story 1.2: Guardado de Contexto Pre-Login ✅

**Como** usuario no autenticado que quiere comprar  
**Quiero** que se guarde mi intención de compra  
**Para** continuar el proceso después de hacer login

**Criterios de Aceptación:**
- ✅ Detectar intención de compra sin autenticación
- ✅ Guardar `pending_purchase` en localStorage
- ✅ Redirigir automáticamente a `/login`
- ✅ Incluir contexto completo: serviceId, intent, conversationSummary

**Archivos creados:**
- [`src/hooks/usePendingPurchase.ts`](src/hooks/usePendingPurchase.ts) - Hook de gestión de compras pendientes (74 líneas)

**Estructura del Pending Purchase:**
```typescript
interface PendingPurchase {
  selectedServiceId: string;
  intent: 'purchase';
  origin: 'landing' | 'dashboard';
  timestamp: string;
  conversationSummary?: string;
}
```

---

### Story 1.3: Restaurar Contexto Tras Login ✅

**Como** usuario que acaba de hacer login  
**Quiero** que el chat reanude mi conversación anterior  
**Para** continuar con mi compra sin perder el contexto

**Criterios de Aceptación:**
- ✅ Detectar `pending_purchase` al cargar dashboard
- ✅ Enviar mensaje de restauración al Meta-Agente
- ✅ Mostrar mensaje del Asesor IA retomando la conversación
- ✅ Limpiar `pending_purchase` después de restaurar

**Archivos creados:**
- [`src/hooks/useRestoreContextOnMount.ts`](src/hooks/useRestoreContextOnMount.ts) - Hook de restauración de contexto (60 líneas)

**Archivos modificados:**
- [`src/components/dashboard-v2/AIAssistantChat.tsx`](src/components/dashboard-v2/AIAssistantChat.tsx) - Integración de restauración de contexto

---

## 🏗️ Arquitectura Técnica

### Flujo de Datos

```
Landing (/)
  ↓
FrontdeskChat
  ↓
useChatSession
  ↓
POST http://localhost:3007/v2/agents/meta-agent/process
  ↓
Meta-Agente V2 (Backend)
  ↓
Respuesta con responseText + actions
  ↓
Chat muestra respuesta


Si intent = 'purchase' && !isAuthenticated:
  ↓
usePendingPurchase.savePendingPurchase()
  ↓
localStorage['colombiatic_pending_purchase']
  ↓
router.push('/login')
  ↓
Login exitoso
  ↓
Dashboard carga
  ↓
useRestoreContextOnMount detecta pending_purchase
  ↓
sendMessage("El usuario acaba de iniciar sesión...")
  ↓
Meta-Agente retoma conversación
  ↓
clearPendingPurchase()
```

---

## 🔧 Componentes y Hooks

### 1. `FrontdeskChat` Component

**Ubicación**: `src/components/chat/FrontdeskChat.tsx`

**Props:**
```typescript
interface FrontdeskChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  autoOpen?: boolean; // Default: true
}
```

**Features:**
- ✅ Chat flotante 400x600px
- ✅ Header con logo del Asesor IA
- ✅ Scroll automático a último mensaje
- ✅ Input con soporte Enter para enviar
- ✅ Quick replies interactivos
- ✅ Loading states
- ✅ Animaciones Framer Motion

---

### 2. `useChatSession` Hook

**Ubicación**: `src/hooks/useChatSession.ts`

**API:**
```typescript
const {
  messages,        // ChatMessage[]
  isLoading,       // boolean
  sessionId,       // string (persistent UUID)
  error,           // string | null
  sendMessage,     // (text: string, intent?: string) => Promise<void>
  clearMessages,   // () => void
  addSystemMessage // (text: string) => void
} = useChatSession(options);
```

**Options:**
```typescript
interface UseChatSessionOptions {
  isAuthenticated?: boolean;
  currentLocation?: 'landing' | 'dashboard';
  onIntentDetected?: (intent: string, data?: any) => void;
}
```

**Features:**
- ✅ Gestión de sessionId persistente en localStorage
- ✅ Persistencia de mensajes en localStorage
- ✅ Comunicación con Meta-Agente V2
- ✅ Detección automática de intenciones
- ✅ Manejo de errores robusto

---

### 3. `usePendingPurchase` Hook

**Ubicación**: `src/hooks/usePendingPurchase.ts`

**API:**
```typescript
const {
  savePendingPurchase,   // (data: Omit<PendingPurchase, 'timestamp'>) => boolean
  getPendingPurchase,    // () => PendingPurchase | null
  clearPendingPurchase,  // () => boolean
  hasPendingPurchase     // () => boolean
} = usePendingPurchase();
```

**Storage Key:** `colombiatic_pending_purchase`

---

### 4. `useRestoreContextOnMount` Hook

**Ubicación**: `src/hooks/useRestoreContextOnMount.ts`

**API:**
```typescript
const { hasRestored } = useRestoreContextOnMount({
  isAuthenticated: boolean,
  sendMessage: (text: string, intent?: string) => Promise<void>,
  isInDashboard?: boolean
});
```

**Features:**
- ✅ Solo se ejecuta una vez al montar
- ✅ Verifica pending_purchase automáticamente
- ✅ Envía mensaje de restauración al Meta-Agente
- ✅ Limpia pending_purchase después de restaurar
- ✅ Timeout de 500ms para asegurar montaje del chat

---

## 📡 Integración con Meta-Agente V2

### Endpoint

```
POST http://localhost:3007/v2/agents/meta-agent/process
```

### Payload Enviado

```json
{
  "tenantId": "colombiatic-001",
  "sessionId": "<uuid-estable>",
  "correlationId": "<uuid-por-mensaje>",
  "channel": "web",
  "input": {
    "type": "text",
    "text": "Mensaje del usuario"
  },
  "metadata": {
    "commercialMode": {
      "enabled": true,
      "catalogAvailable": true,
      "userFlowContext": {
        "isAuthenticated": false,
        "currentLocation": "landing",
        "intent": "explore"
      }
    }
  }
}
```

### Respuesta Esperada

```json
{
  "responseText": "Respuesta del Asesor IA...",
  "actions": ["ACTION_1", "ACTION_2"],
  "intent": "purchase",
  "metadata": {
    "serviceId": "ai-assistant-pro"
  }
}
```

---

## 🎨 UX/UI del Chat

### Mensaje de Bienvenida

> "Hola, soy tu Asesor IA de ColombiaTIC. Estoy aquí para ayudarte a transformar tu negocio con tecnología de última generación. ¿Qué tienes en mente hoy?"

### Quick Replies (5 Botones)

1. **"Quiero actualizar mi sitio web"** → intent: `website_update`
2. **"Quiero integrar IA en mi negocio"** → intent: `ai_integration`
3. **"Quiero ver los servicios"** → intent: `view_services`
4. **"Tengo un proyecto y quiero asesoría"** → intent: `project_consultation`
5. **"Quiero comprar un servicio"** → intent: `purchase`

### Estilo Visual

- **Posición**: Fixed, bottom-right, z-50
- **Dimensiones**: 400px × 600px
- **Colores**:
  - Header: Gradiente azul-morado (`from-primary to-blue-600`)
  - Mensajes usuario: `bg-primary`
  - Mensajes IA: `bg-gray-700`
  - Mensajes sistema: `bg-gradient purple/blue con border`
- **Animaciones**: Framer Motion
  - Entrada: opacity + scale + translateY
  - Mensajes: stagger con delay
- **Iconos**: Lucide React (Bot, Send, X, Loader2)

---

## 🧪 Testing Manual

### Test 1: Chat en Landing

1. Abrir `http://localhost:3000/`
2. ✅ Chat debe aparecer abierto automáticamente
3. ✅ Ver mensaje de bienvenida del Asesor IA
4. ✅ Ver 5 botones de respuestas rápidas
5. Escribir "Hola" y enviar
6. ✅ Ver mensaje del usuario en azul a la derecha
7. ✅ Ver loading indicator
8. ✅ Ver respuesta de la IA en gris a la izquierda

### Test 2: Intención de Compra sin Login

1. En la landing, click en **"Quiero comprar un servicio"**
2. ✅ Chat envía mensaje al Meta-Agente
3. ✅ Se guarda `pending_purchase` en localStorage
4. ✅ Redirección automática a `/login`
5. Verificar localStorage:
   ```javascript
   localStorage.getItem('colombiatic_pending_purchase')
   // Debe contener: { selectedServiceId, intent: 'purchase', ... }
   ```

### Test 3: Restauración de Contexto

1. Después de hacer login exitoso
2. ✅ Usuario es redirigido a `/dashboard`
3. ✅ Dashboard carga con DashboardLayoutV2
4. ✅ Chat en panel derecho envía mensaje de restauración
5. ✅ Meta-Agente responde retomando la conversación
6. ✅ Ver mensaje tipo: *"Perfecto, ya estás dentro. Estábamos revisando el servicio X. ¿Quieres continuar con la compra?"*
7. ✅ `pending_purchase` es eliminado de localStorage

### Test 4: SessionId Persistente

1. Abrir DevTools → Application → LocalStorage
2. ✅ Verificar `colombiatic_chat_sessionId` existe
3. ✅ Copiar el UUID
4. Recargar la página (F5)
5. ✅ Verificar que el sessionId es el mismo
6. ✅ Mensajes anteriores se restauran

---

## 📦 Variables de Entorno

Añadidas en `.env.local`:

```bash
# Meta-Agent V2 Configuration (Sprint 1)
NEXT_PUBLIC_META_AGENT_V2_URL=http://localhost:3007
```

---

## 🚀 Comandos de Ejecución

### Frontend (Next.js)

```bash
npm run dev
# Corre en http://localhost:3000
```

### Backend (Meta-Agente V2)

```bash
# Desde el directorio del backend
npm start
# Debe correr en http://localhost:3007
```

---

## 📊 Métricas de Implementación

| Métrica | Valor |
|---------|-------|
| **Archivos creados** | 4 |
| **Archivos modificados** | 3 |
| **Líneas de código** | ~640 |
| **Hooks creados** | 3 |
| **Componentes creados** | 1 |
| **Historias completadas** | 3/3 (100%) |
| **Tiempo estimado** | Sprint 1 completo |

---

## 🔄 Flujo Completo Usuario Final

### Escenario Completo

1. **Landing**: Usuario entra a `http://localhost:3000/`
   - Chat abierto automáticamente
   - Mensaje de bienvenida del Asesor IA

2. **Exploración**: Usuario pregunta por servicios
   - Chat responde con información
   - Ofrece quick replies

3. **Intención de compra**: Click en "Quiero comprar un servicio"
   - Chat confirma interés
   - Se guarda contexto en localStorage
   - Redirección a `/login`

4. **Login**: Usuario ingresa credenciales
   - Login exitoso
   - Redirección a `/dashboard`

5. **Dashboard**: Carga con contexto restaurado
   - Chat en panel derecho
   - Mensaje: *"Perfecto, ya estás dentro. Estábamos revisando servicio X..."*
   - Usuario continúa conversación sin perder contexto

---

## 📝 Notas Técnicas

### LocalStorage Keys

```javascript
// Session ID (persistent UUID)
localStorage.getItem('colombiatic_chat_sessionId')

// Chat messages history
localStorage.getItem('colombiatic_chat_messages')

// Pending purchase context
localStorage.getItem('colombiatic_pending_purchase')
```

### Detección de Intenciones

El hook `useChatSession` detecta automáticamente:

```typescript
// Purchase intent sin autenticación
if (!isAuthenticated && 
    (data.intent === 'purchase' || 
     text.includes('comprar') ||
     text.includes('adquirir'))) {
  onIntentDetected('purchase_without_auth', {...})
}
```

### Mensaje de Restauración

```typescript
const restoreMessage = `El usuario acaba de iniciar sesión. Teníamos un contexto previo de compra del servicio ${serviceId}. Resumen: "${conversationSummary}". Por favor, retoma la conversación y ofrece continuar con la compra.`;
```

---

## 🎯 Próximos Pasos (Sprint 2)

- [ ] Manejo de `<ACTION>...</ACTION>` en respuestas
- [ ] Integración con catálogo de servicios real
- [ ] Checkout flow completo
- [ ] Persistencia en backend (no solo localStorage)
- [ ] Analytics de conversaciones
- [ ] A/B testing de mensajes

---

## ✅ Criterios de Aceptación Sprint 1

### Funcionales

- ✅ Chat visible y abierto en landing
- ✅ Comunicación con Meta-Agente V2
- ✅ Guardado de contexto pre-login
- ✅ Restauración de contexto post-login
- ✅ SessionId persistente
- ✅ Mensajes almacenados en localStorage

### No Funcionales

- ✅ Arquitectura modular y escalable
- ✅ TypeScript con tipado completo
- ✅ Manejo de errores robusto
- ✅ UX fluida con animaciones
- ✅ Código documentado
- ✅ Hooks reutilizables

---

## 🎉 Estado del Sprint

**Sprint 1: COMPLETADO ✅**

Todas las historias de usuario implementadas, probadas y documentadas.

---

**Última actualización**: 4 de diciembre de 2025  
**Desarrollado por**: Tu IA Personal - Asesor de ColombiaTIC 🤖
