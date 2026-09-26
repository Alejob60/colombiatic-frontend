'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/code-block';

export default function AgentIntegrationDocsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Integración con Agente AI ColombiaTIC</h1>
        <p className="text-muted-foreground">
          Documentación técnica para la integración del frontend con el agente AI de ColombiaTIC
        </p>
      </div>

      <div className="grid gap-6">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle>Visión General</CardTitle>
            <CardDescription>
              Integración completa entre el frontend y el agente AI de ColombiaTIC
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Esta integración permite la comunicación bidireccional entre el frontend y el agente AI de ColombiaTIC, 
              facilitando interacciones en tiempo real con usuarios a través de una interfaz de chat moderna.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">WebSocket</Badge>
              <Badge variant="secondary">HTTP API</Badge>
              <Badge variant="secondary">Real-time</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">React</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Arquitectura */}
        <Card>
          <CardHeader>
            <CardTitle>Arquitectura de Comunicación</CardTitle>
            <CardDescription>
              Diagrama de flujo de la integración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`┌─────────────┐    HTTP POST    ┌────────────────────┐    WebSocket    ┌──────────────┐
│  Frontend   │ ──────────────► │  ColombiaTIC Agent │ ◄──────────────► │  Dashboard   │
│             │                 │                    │                 │              │
│  React/Next │                 │  /api/v2/agents/colombiatic         │ Real-time UI │
└─────────────┘                 └────────────────────┘                 └──────────────┘
                                          │
                                          ▼
                                ┌────────────────────┐
                                │  Specialized Agent │
                                │  (product-finder,  │
                                │   service-matcher, │
                                │   etc.)            │
                                └────────────────────┘`}
            </pre>
          </CardContent>
        </Card>

        {/* Endpoint de Conexión */}
        <Card>
          <CardHeader>
            <CardTitle>Endpoint de Conexión</CardTitle>
            <CardDescription>
              Detalles de la API para la comunicación con el agente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">URL Base</h3>
                <CodeBlock code="http://localhost:3000/api" language="text" />
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Endpoint Principal</h3>
                <CodeBlock code="POST /api/v2/agents/colombiatic" language="text" />
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Estructura del Mensaje</h3>
                <CodeBlock 
                  code={`{
  "message": "Texto del mensaje del usuario",
  "context": {
    "sessionId": "identificador-único-de-sesión",
    "language": "es",
    "tenantId": "id-del-tenant-opcional",
    "userId": "id-del-usuario-opcional"
  }
}`} 
                  language="json" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Componentes Principales */}
        <Card>
          <CardHeader>
            <CardTitle>Componentes Principales</CardTitle>
            <CardDescription>
              Elementos clave de la integración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Servicio de Comunicación</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <code className="bg-muted px-1 rounded">src/services/colombiaticAgentService.ts</code>
                </p>
                <p>
                  Servicio central que maneja la comunicación HTTP y WebSocket con el agente AI.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. Componente de Chat</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <code className="bg-muted px-1 rounded">src/components/chat/ColombiaticChatInterface.tsx</code>
                </p>
                <p>
                  Interfaz de usuario para la interacción con el agente AI con historial de mensajes y estado en tiempo real.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">3. Widget Flotante</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <code className="bg-muted px-1 rounded">src/components/chat/FloatingChatWidget.tsx</code>
                </p>
                <p>
                  Widget de chat flotante que se puede integrar en cualquier parte del dashboard.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">4. Hook de Comunicación</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  <code className="bg-muted px-1 rounded">src/hooks/useAgentCommunication.ts</code>
                </p>
                <p>
                  Hook personalizado que encapsula la lógica de comunicación con el agente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ejemplo de Uso */}
        <Card>
          <CardHeader>
            <CardTitle>Ejemplo de Implementación</CardTitle>
            <CardDescription>
              Cómo integrar el chat en una página personalizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock 
              code={`'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ColombiaticChatInterface from '@/components/chat/ColombiaticChatInterface';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function CustomChatPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {t('dashboard.agentChat.title', 'Chat con Asistente AI')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.agentChat.description', 'Interactúa con el asistente AI de ColombiaTIC')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <ColombiaticChatInterface />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`}
              language="typescript"
            />
          </CardContent>
        </Card>

        {/* Manejo de Errores */}
        <Card>
          <CardHeader>
            <CardTitle>Manejo de Errores</CardTitle>
            <CardDescription>
              Códigos de error y estrategias de recuperación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Códigos de Error Comunes</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><code className="bg-muted px-1 rounded">400</code> - Solicitud mal formada</li>
                  <li><code className="bg-muted px-1 rounded">401</code> - No autorizado</li>
                  <li><code className="bg-muted px-1 rounded">404</code> - Endpoint no encontrado</li>
                  <li><code className="bg-muted px-1 rounded">500</code> - Error interno del servidor</li>
                  <li><code className="bg-muted px-1 rounded">503</code> - Servicio no disponible</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Estrategias de Recuperación</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Reintentos automáticos con backoff exponencial</li>
                  <li>Notificaciones al usuario sobre errores de conexión</li>
                  <li>Almacenamiento local de mensajes no enviados</li>
                  <li>Modo offline con funcionalidad limitada</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}