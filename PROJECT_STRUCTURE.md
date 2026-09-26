# Estructura del Proyecto ColombiaTIC

Basándome en el análisis del código, aquí tienes un listado organizado de las páginas, servicios, hooks y secciones del proyecto:

## 📄 Páginas (Pages)

```
src/app/
├── page.tsx                          # Página principal del sitio
├── dashboard/
│   └── page.tsx                      # Dashboard principal del usuario
├── services/
│   ├── page.tsx                      # Catálogo de servicios
│   └── [id]/
│       └── page.tsx                  # Detalle de servicio específico
├── (auth)/
│   ├── login/                        # Página de inicio de sesión
│   ├── register/                     # Página de registro
│   └── ...                           # Otras páginas de autenticación
├── (i18n)/[lang]/                   # Páginas con soporte multilenguaje
│   ├── landing/                      # Landing page
│   ├── services/                     # Servicios (versión i18n)
│   └── ...                           # Otras páginas localizadas
└── ...                               # Otras páginas de la aplicación
```

## ⚙️ Servicios (Services)

```
src/services/
├── metaAgentService.ts               # Comunicación con el Meta-Agent
├── wompi.service.ts                  # Integración con pasarela de pagos Wompi
├── authService.ts                    # Autenticación de usuarios
├── misybot/
│   ├── aiAgentService.ts             # Servicio de agentes IA
│   ├── dashboardServiceV2.ts         # Servicios del dashboard
│   └── orderService.ts               # Gestión de órdenes y pagos
├── chatWidgetService.ts              # Servicio del widget de chat
├── contextService.ts                 # Servicio de contexto de usuario
├── leadsService.ts                   # Gestión de leads
├── notificationsService.ts           # Servicio de notificaciones
└── userStateService.ts               # Gestión del estado del usuario
```

## 🎣 Hooks

```
src/hooks/
├── useAgentActions.ts                # Acciones del agente IA
├── useChatSocket.ts                  # Conexión WebSocket con el chat
├── useChatSession.ts                 # Manejo de sesiones de chat
├── usePendingPurchase.ts             # Gestión de compras pendientes
├── useServices.ts                    # Manejo de datos de servicios
├── useAuthState.ts                   # Estado de autenticación
├── useDashboardAnalytics.ts          # Analíticas del dashboard
├── useDataGovernance.ts              # Gobierno de datos
├── useMarketplace.ts                 # Funcionalidades del marketplace
├── usePaymentStatus.ts               # Estado de pagos
├── useQuickOrder.ts                  # Pedidos rápidos
├── useRestoreContextOnMount.ts       # Restauración de contexto
└── useUsers.ts                       # Gestión de usuarios
```

## 📊 Secciones (Sections)

```
src/components/sections/
├── HeroSection.tsx                   # Sección hero de la landing
├── ServicesSection.tsx               # Sección de servicios
├── WhyChooseUsSection.tsx            # Sección de beneficios
├── PartnersSection.tsx               # Sección de partners
├── SuccessCasesSection.tsx           # Casos de éxito
├── CallToAction.tsx                  # Llamado a la acción
├── ContactSection.tsx                # Sección de contacto
├── FAQSection.tsx                    # Preguntas frecuentes
├── Footer.tsx                        # Pie de página
├── HowItWorks.tsx                    # Cómo funciona
├── PricingSection.tsx                # Sección de precios
├── TestimonialsSection.tsx           # Testimonios
└── Legal.tsx                         # Información legal
```

## 🧩 Componentes Principales

```
src/components/
├── pages/
│   ├── HomePage.tsx                  # Componente de página principal
│   └── IaLandingPage.tsx             # Landing page de IA
├── commercial-landing/
│   ├── CommercialLandingPage.tsx     # Landing comercial
│   ├── WompiCheckout.tsx             # Checkout con Wompi
│   └── ServiceCatalog.tsx            # Catálogo de servicios
├── chat/
│   ├── FrontdeskChat.tsx             # Chat frontal con IA
│   └── ColombiaticChatInterface.tsx  # Interfaz de chat
├── dashboard/
│   ├── DashboardChatPanel.tsx        # Panel de chat del dashboard
│   └── ...                           # Otros componentes del dashboard
├── dashboard-v2/
│   ├── DashboardLayoutV2.tsx         # Layout del dashboard V2
│   ├── AIAssistantChat.tsx           # Asistente IA del dashboard
│   ├── SidebarLeft.tsx               # Sidebar izquierdo
│   └── views/                        # Vistas dinámicas
│       ├── ServiceDetailView.tsx
│       ├── ServiceActivationView.tsx
│       └── ...
└── landing/
    └── ServiceDetailPage.tsx         # Página de detalle de servicio
```

## 🗃️ Stores

```
src/store/
└── useDashboardStore.ts              # Store global del dashboard con Zustand
```

## 🌐 Contextos

```
src/contexts/
├── AuthContext.tsx                   # Contexto de autenticación
├── TenantContext.tsx                 # Contexto de tenant
├── LanguageContext.tsx               # Contexto de idioma
└── ...                               # Otros contextos
```

## 🏗️ Arquitectura General

Esta estructura muestra un sistema bien organizado con separación clara de responsabilidades, integración completa con Wompi para pagos, conexión con Meta-Agent para inteligencia artificial, y una arquitectura de componentes reutilizables.