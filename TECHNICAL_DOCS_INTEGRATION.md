# Documentación Técnica - Componentes de Integración ColombiaTIC AI

## Descripción General

Esta documentación describe los componentes de integración desarrollados para conectar el frontend de ColombiaTIC AI con el backend principal y el Meta-Agent. Los componentes siguen los principios de diseño de ColombiaTIC AI con una paleta de colores metalizada y estilos consistentes.

## Estructura del Proyecto

```
src/
├── components/
│   └── ui/
│       └── integration/
├── services/
│   ├── auth/
│   │   └── integration/
│   ├── api/
│   │   └── integration/
│   └── websocket/
│       └── integration/
├── styles/
│   └── integration/
└── lib/
```

## Componentes UI

### PromptInput
Componente para ingresar prompts de IA con auto-resize y envío con Enter.

**Props:**
- `onSubmit` (func): Función llamada al enviar el prompt
- `placeholder` (string): Texto de ayuda (opcional)
- `isLoading` (bool): Estado de carga (opcional)
- `className` (string): Clases CSS adicionales (opcional)

### LoadingSpinner
Spinner de carga con diferentes tamaños y colores.

**Props:**
- `size` ('sm'|'md'|'lg'): Tamaño del spinner (opcional, por defecto 'md')
- `color` (string): Color del spinner (opcional, por defecto '#3BA5FF')
- `className` (string): Clases CSS adicionales (opcional)
- `message` (string): Mensaje de texto (opcional)

### ResultDisplay
Componente para mostrar resultados de texto con opciones de copiar y descargar.

**Props:**
- `content` (string): Contenido a mostrar
- `title` (string): Título del componente (opcional)
- `onCopy` (func): Función llamada al copiar (opcional)
- `onDownload` (func): Función llamada al descargar (opcional)
- `className` (string): Clases CSS adicionales (opcional)

### ImageResultDisplay
Componente para mostrar imágenes generadas con opciones de descarga y regeneración.

**Props:**
- `imageUrl` (string): URL de la imagen
- `title` (string): Título del componente (opcional)
- `onDownload` (func): Función llamada al descargar (opcional)
- `onRegenerate` (func): Función llamada al regenerar (opcional)
- `isLoading` (bool): Estado de carga (opcional)
- `className` (string): Clases CSS adicionales (opcional)

### HistoryPanel
Panel de historial con filtrado por tipo de contenido.

**Props:**
- `items` (HistoryItem[]): Lista de elementos del historial
- `onSelectItem` (func): Función llamada al seleccionar un elemento
- `onDeleteItem` (func): Función llamada al eliminar un elemento
- `className` (string): Clases CSS adicionales (opcional)

### CreditsDisplay
Componente para mostrar el balance de créditos del usuario.

**Props:**
- `balance` (number): Balance de créditos
- `plan` (string): Nombre del plan
- `onUpgrade` (func): Función llamada al recargar créditos (opcional)
- `className` (string): Clases CSS adicionales (opcional)

### UserProfile
Componente para mostrar información del perfil de usuario.

**Props:**
- `user` (object): Información del usuario
- `onLogout` (func): Función llamada al cerrar sesión (opcional)
- `className` (string): Clases CSS adicionales (opcional)

### GalleryGrid
Cuadrícula para mostrar imágenes de la galería con vista previa.

**Props:**
- `items` (GalleryItem[]): Lista de elementos de la galería
- `onView` (func): Función llamada al ver una imagen (opcional)
- `onDownload` (func): Función llamada al descargar una imagen (opcional)
- `onDelete` (func): Función llamada al eliminar una imagen (opcional)
- `className` (string): Clases CSS adicionales (opcional)

### NotificationToast
Notificación toast con diferentes tipos y auto-cierre.

**Props:**
- `id` (string): ID único de la notificación
- `type` ('success'|'error'|'info'|'warning'): Tipo de notificación
- `title` (string): Título de la notificación
- `message` (string): Mensaje de la notificación (opcional)
- `duration` (number): Duración en ms (opcional, por defecto 5000)
- `onClose` (func): Función llamada al cerrar
- `className` (string): Clases CSS adicionales (opcional)

### NotificationContainer
Contenedor para gestionar múltiples notificaciones toast.

**Props:**
- `className` (string): Clases CSS adicionales (opcional)

## Servicios

### AuthService
Servicio para manejar la autenticación de usuarios.

**Métodos:**
- `login(credentials)`: Iniciar sesión con credenciales
- `logout()`: Cerrar sesión
- `refreshToken()`: Renovar token de acceso
- `isAuthenticated()`: Verificar si el usuario está autenticado
- `getCurrentUser()`: Obtener información del usuario actual

### ApiService
Servicio para realizar llamadas HTTP a la API con interceptores.

**Métodos:**
- `get(url, config)`: Realizar solicitud GET
- `post(url, data, config)`: Realizar solicitud POST
- `put(url, data, config)`: Realizar solicitud PUT
- `delete(url, config)`: Realizar solicitud DELETE
- `patch(url, data, config)`: Realizar solicitud PATCH
- `setTenantId(tenantId)`: Actualizar ID de tenant
- `getInstance()`: Obtener instancia de axios

### WebSocketService
Servicio para manejar la conexión WebSocket con el Meta-Agent.

**Métodos:**
- `connect()`: Conectar al servidor WebSocket
- `joinSession(params)`: Unirse a una sesión
- `sendUserMessage(message, context)`: Enviar mensaje del usuario
- `disconnect()`: Desconectar del servidor
- `isConnectedStatus()`: Verificar estado de conexión
- `getSocket()`: Obtener instancia del socket

## Estilos Globales

El archivo `global.css` define variables CSS y clases utilitarias para mantener la consistencia visual:

### Variables CSS
- `--colombiatic-bg-primary`: Color de fondo principal (#0C1116)
- `--colombiatic-text-primary`: Color de texto principal (#E6EDF3)
- `--colombiatic-accent-primary`: Color de acento principal (#3BA5FF)

### Clases Utilitarias
- `.colombiatic-integration`: Clase base para componentes de integración
- `.colombiatic-btn`: Estilo base para botones
- `.colombiatic-card`: Estilo base para tarjetas
- `.colombiatic-dual-panel`: Layout de dos paneles
- `.colombiatic-gradient-text`: Texto con gradiente

## Configuración del Entorno

### Variables de Entorno Requeridas
```
TENANT_ID=7ae71544-d143-4b8f-8ae9-42a8a8c3c6ba
API_BASE_URL=https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net
WEBSOCKET_URL=http://localhost:3007
```

## Pruebas

Cada servicio y componente incluye tests unitarios en carpetas `__tests__` adyacentes.

### Comandos de Prueba
```bash
npm run test            # Ejecutar todos los tests
npm run test:watch      # Ejecutar tests en modo watch
npm run test:coverage   # Generar reporte de cobertura
```

## Integración con Backend

### Endpoints de la API
- `POST /auth/login`: Autenticación de usuario
- `POST /auth/refresh`: Renovación de token
- `GET /auth/me`: Información del usuario
- `POST /prompt-json/generate`: Generación de contenido
- `POST /prompt-json/generate-promo-image`: Generación de imágenes
- `GET /gallery/my-images`: Galería de imágenes
- `GET /credits/balance`: Balance de créditos

### Conexión WebSocket
- URL: `http://localhost:3007`
- Eventos: `join_session`, `user_message`, `agent_message`, `typing_indicator`

## Consideraciones de Seguridad

1. Los tokens de autenticación se almacenan de forma segura usando encriptación XOR
2. Todas las llamadas a la API incluyen el header `x-tenant-id`
3. La conexión WebSocket se autentica con el token de acceso
4. Se implementa manejo de errores para tokens expirados

## Mejores Prácticas

1. Usar siempre el tenant ID en las llamadas a la API
2. Manejar adecuadamente los estados de carga y error en la UI
3. Implementar reconexión automática para WebSocket
4. Seguir la paleta de colores y estilos definidos
5. Usar notificaciones para feedback al usuario
6. Implementar pruebas unitarias para todos los servicios