# Integración del Meta-Agent con el Frontend de ColombiaTIC

## 🎯 Objetivo

Este documento describe cómo se ha integrado el Meta-Agent de ColombiaTIC con el frontend para procesar mensajes de clientes a través del chat.

## 🏗️ Arquitectura de Integración

```
┌─────────────────┐    HTTP POST    ┌────────────────────┐    WebSocket    ┌──────────────────┐
│  Frontend       │ ──────────────► │  Front Desk Agent  │ ◄──────────────►│  Dashboard &     │
│  ColombiaTIC    │                 │   (Meta-Agent)     │                 │  Notificaciones  │
└─────────────────┘                 └────────────────────┘                 └──────────────────┘
                                              │
                                              ▼
                                   ┌────────────────────┐
                                   │  Specialized Agent │
                                   │  (video-scriptor,  │
                                   │   post-scheduler,  │
                                   │   etc.)            │
                                   └────────────────────┘
```

## 📁 Estructura de Archivos

```
src/
├── services/
│   └── metaAgentService.ts          # Servicio para comunicarse con el FrontDesk Agent
├── contexts/
│   └── MetaAgentContext.tsx         # Contexto para manejar el estado del chat
├── hooks/
│   └── useMetaAgent.ts              # Hook personalizado para facilitar el uso
├── components/
│   ├── chat/
│   │   ├── ColombiaTICChat.tsx      # Componente principal de chat
│   │   └── ConversationStatus.tsx   # Componente para mostrar el estado
│   └── ...
└── app/
    └── demo/
        └── meta-agent-demo/
            ├── page.tsx             # Página de demostración
            └── layout.tsx           # Layout específico para la demo
```

## 🔧 Componentes Principales

### 1. Servicio (metaAgentService.ts)

Maneja la comunicación HTTP con el FrontDesk Agent:

- **URL Base**: `http://localhost:3007/api`
- **Endpoint**: `POST /api/agents/front-desk`
- **Generación de Session ID**: Automática para cada sesión
- **Manejo de Errores**: Integrado con logging

### 2. Contexto (MetaAgentContext.tsx)

Proporciona estado global para la conversación:

- **Mensajes**: Historial de mensajes del usuario y agente
- **Estado de Procesamiento**: Indica si se está procesando una solicitud
- **Funciones**: `sendMessage`, `clearChat`

### 3. Hook (useMetaAgent.ts)

Hook personalizado que extiende la funcionalidad del contexto:

- **sendWithContext**: Envía mensajes con contexto adicional
- **getConversationHistory**: Obtiene el historial formateado
- **hasActiveConversation**: Verifica si hay una conversación activa
- **getConversationStatus**: Obtiene el estado actual de la conversación

### 4. Componentes

#### ColombiaTICChat.tsx
Componente visual del chat con:
- Área de mensajes con scroll automático
- Campo de entrada con envío por Enter
- Indicador de estado de procesamiento
- Botón para limpiar la conversación

#### ConversationStatus.tsx
Componente que muestra el estado actual de la conversación:
- Listo para ayudar
- Procesando solicitud
- Conversación lista para continuar
- Contador de mensajes

## 🔄 Flujo de Funcionamiento

1. **Inicialización**:
   - El MetaAgentProvider se monta en la aplicación
   - Se genera un Session ID único

2. **Envío de Mensajes**:
   - Usuario escribe y envía un mensaje
   - El mensaje se añade al historial local
   - Se marca como "procesando"
   - Se envía al FrontDesk Agent

3. **Procesamiento por el Agente**:
   - El FrontDesk analiza la intención
   - Extrae entidades y detecta emoción
   - Determina información adicional necesaria
   - Responde con contexto enriquecido

4. **Respuesta al Usuario**:
   - La respuesta se añade al historial
   - Se muestran indicadores de confianza y emoción
   - Si está completa, se indica posibilidad de enrutamiento

## 🎯 Agentes Especializados Disponibles

Cuando el FrontDesk completa la recolección de información, puede enrutar al cliente a:

- **video-scriptor**: Creación de videos virales
- **post-scheduler**: Programación de publicaciones
- **trend-scanner**: Análisis de tendencias
- **faq-responder**: Respuestas a preguntas frecuentes
- **analytics-reporter**: Generación de reportes analíticos

## 🛠️ Configuración

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_META_AGENT_API_URL=http://localhost:3007/api
```

## ✅ Validación de Integración

### Checklist de Verificación
- [x] El frontend puede hacer POST a `/api/agents/front-desk`
- [x] El ID de sesión se mantiene durante la conversación
- [x] Las respuestas del agente se muestran correctamente en el chat
- [x] Se solicitan datos adicionales cuando es necesario
- [x] El enrutamiento a agentes especializados funciona cuando `isComplete` es verdadero
- [x] El manejo de errores está implementado para fallos de API
- [x] La detección de emociones se refleja en las respuestas

## 🚀 Prueba de la Integración

Para probar la integración:

1. Navega a `/demo/meta-agent-demo`
2. Envía mensajes de prueba como:
   - "Quiero crear un video corto para TikTok"
   - "Necesito programar publicaciones para esta semana"
   - "¿Cuáles son las tendencias actuales en redes?"
3. Observa las respuestas y el estado de la conversación

## 📈 Beneficios del Sistema

1. **Atención automatizada 24/7** con inteligencia artificial
2. **Respuestas empáticas** adaptadas a las emociones del cliente
3. **Enrutamiento inteligente** a agentes especializados
4. **Reducción de tiempos de respuesta** al cliente
5. **Experiencia de usuario mejorada** con interacciones contextuales
6. **Escalabilidad** sin incremento proporcional de personal