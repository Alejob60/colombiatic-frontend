# SPRINT 1 - INTEGRACIÓN CORE Y AUTENTICACIÓN COMPARTIDA

## 🎯 Objetivo
Conectar el frontend ColombiaTIC al backend Misybot, utilizando la misma base de usuarios, roles y autenticación.

## 🏗️ Estructura de Directorios
```
src/
├── services/
│   └── misybot/
│       ├── types.ts              # Tipos compartidos de Misybot
│       ├── authService.ts        # Servicio de autenticación
│       ├── middlewareService.ts  # Middleware para permisos y branding
│       ├── dashboardService.ts   # Servicio para métricas del dashboard
│       └── aiAgentService.ts     # Servicio para agentes IA
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticación actualizado
└── features/
    └── omnichannel-ai-agent/    # Componentes del agente IA (ya implementados)
```

## 🔌 Endpoints de la API

### Autenticación
```
POST   /auth/login               # Iniciar sesión
POST   /auth/register            # Registrar nuevo usuario
GET    /auth/me                 # Obtener perfil del usuario
POST   /auth/logout              # Cerrar sesión
POST   /auth/refresh             # Refrescar token
```

### Endpoints ColombiaTIC
```
GET    /colombiatic/dashboard/summary        # Resumen del dashboard
GET    /colombiatic/analytics/conversations  # Métricas de conversaciones
GET    /colombiatic/analytics/sales          # Métricas de ventas
GET    /colombiatic/analytics/ads            # Métricas de campañas
GET    /colombiatic/learning/insights        # Insights de aprendizaje
GET    /colombiatic/recommendations/cross-business  # Recomendaciones cross-business
POST   /colombiatic/sync/misybot             # Sincronización con Misybot
```

### Endpoints del Agente IA
```
POST   /colombiatic/agent/create             # Crear nuevo agente IA
GET    /colombiatic/agent/{id}               # Obtener configuración del agente
PUT    /colombiatic/agent/{id}               # Actualizar configuración del agente
POST   /colombiatic/agent/{id}/webhooks      # Configurar webhooks
GET    /colombiatic/agent/{id}/webhooks      # Obtener configuración de webhooks
```

## 🧱 Entidades

### User (MisybotUser)
```typescript
interface MisybotUser {
  id: string;
  name: string;
  email: string;
  organization_id: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | 'ROLE_CLIENT_COLOMBIATIC';
  created_at: string;
  updated_at: string;
  last_login?: string;
}
```

### Organization (MisybotOrganization)
```typescript
interface MisybotOrganization {
  id: string;
  name: string;
  plan: 'starter' | 'business' | 'enterprise';
  created_at: string;
  updated_at: string;
}
```

### UserProfile (MisybotUserProfile)
```typescript
interface MisybotUserProfile {
  id: string;
  name: string;
  email: string;
  organization_id: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer' | 'ROLE_CLIENT_COLOMBIATIC';
  organization: MisybotOrganization;
  permissions: string[];
  branding_config: {
    primary_color: string;
    logo_url?: string;
    theme: 'light' | 'dark';
  };
}
```

## 🔐 Roles y Permisos

### ROLE_CLIENT_COLOMBIATIC
Rol específico para clientes de ColombiaTIC con permisos limitados:
- view_dashboard
- view_analytics
- view_conversations
- view_sales_metrics
- create_chat_agent
- configure_webhook

### Otros roles (heredados de Misybot)
- owner: Todos los permisos
- admin: Gestión de usuarios y configuración
- editor: Creación y edición de contenido
- viewer: Solo lectura

## 🎨 Branding Dinámico

Los usuarios con rol `ROLE_CLIENT_COLOMBIATIC` tendrán branding personalizado:
- Colores primarios configurables
- Logo personalizado
- Tema claro/oscuro

## 🧪 Variables de Entorno

```bash
# Misybot API Configuration
NEXT_PUBLIC_MISYBOT_API_URL=https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net

# ColombiaTIC Specific Endpoints
COLOMBIATIC_NAMESPACE=/colombiatic
COLOMBIATIC_AGENT_ENDPOINT=/colombiatic/agent
COLOMBIATIC_DASHBOARD_ENDPOINT=/colombiatic/dashboard
COLOMBIATIC_ANALYTICS_ENDPOINT=/colombiatic/analytics
COLOMBIATIC_WEBSITE_ENDPOINT=/colombiatic/website
```

## 🚀 Entregables

### ✅ Login/registro 100% funcional con backend Misybot
- Integración con endpoints de autenticación de Misybot
- Uso del rol `ROLE_CLIENT_COLOMBIATIC` para nuevos usuarios
- Manejo de tokens JWT con HttpOnly cookies y localStorage fallback

### ✅ Control de sesiones y branding ColombiaTIC
- Middleware para identificar usuarios de ColombiaTIC
- Configuración de branding dinámico
- Permisos específicos por rol

### ✅ Base de datos compartida, con aislamiento lógico por organization_id
- Uso del campo `organization_id` para aislamiento
- Consultas filtradas por organización
- Seguridad a nivel de API

## 🛠️ Componentes Técnicos Implementados

1. **AuthService** - Manejo de autenticación con Misybot
2. **MiddlewareService** - Control de permisos y branding
3. **DashboardService** - Integración con métricas de Misybot
4. **AIAgentService** - Configuración de agentes IA omnicanal
5. **AuthContext** - Contexto de React actualizado para Misybot

##  future>
- Implementación de webhooks para canales sociales
- Generación del script universal para el chat web
- Conexión directa al IA Orchestrator de Misybot
- Dashboard inteligente de conversaciones y ventas