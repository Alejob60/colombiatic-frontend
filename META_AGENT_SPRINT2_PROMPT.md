# META-AGENT PROMPT - SPRINT 2 PROCESSING

## 🎯 Objective
Process Sprint 2 requirements for Omnichannel AI Agent & Website Refactor and establish connection with the existing meta-agent service.

## 📋 Sprint 2 Requirements Summary

### Goal
Configurar los agentes IA sobre los canales disponibles usando el core Misybot.

### Tasks
1. Crear un AI Agent Service (reutilizando meta-agent)
2. Endpoint: `/colombiatic/agent/create`
3. Parámetros: site_url, industry, language, tone, connect_channels[]
4. Reutilizar los hooks existentes:
   - meta/facebook/webhook
   - meta/whatsapp/webhook
   - google/ads/webhook
5. Crear un "script universal" para instalar el chat web
6. Conexión directa al IA Orchestrator de Misybot

## 🔧 Current System Analysis

### Existing Services
1. **Meta Agent**: Configured at `http://localhost:3007` (NEXT_PUBLIC_META_AGENT_URL)
2. **Misybot AI Agent Service**: Located at `/colombiatic/agent` endpoint
3. **Frontend AI Agent Service**: In `src/features/omnichannel-ai-agent/services/aiAgentService.ts`

### Environment Configuration
- Meta Agent URL: `http://localhost:3007`
- Misybot API URL: `https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net`
- ColombiaTIC Namespace: `/colombiatic`

## 🤖 Meta-Agent Instructions

### Phase 1: Integration Analysis
1. Analyze the existing AI agent services in:
   - `src/services/misybot/aiAgentService.ts`
   - `src/features/omnichannel-ai-agent/services/aiAgentService.ts`

2. Identify integration points between:
   - Current frontend AI agent service
   - Meta-agent service at `http://localhost:3007`
   - Misybot backend at `/colombiatic/agent` endpoint

### Phase 2: Service Enhancement
1. Enhance `src/services/misybot/aiAgentService.ts` to:
   - Connect to meta-agent for AI processing
   - Maintain existing Misybot API integration
   - Implement channel-specific webhook configurations

2. Update the `createAgent` function to:
   - Accept all required parameters (site_url, industry, language, tone, connect_channels)
   - Interface with meta-agent for agent creation
   - Return proper agent configuration

### Phase 3: Webhook Integration
1. Implement webhook configuration for:
   - Facebook/Meta: `/meta/facebook/webhook`
   - WhatsApp: `/meta/whatsapp/webhook`
   - Google Ads: `/google/ads/webhook`

2. Create webhook validation and verification mechanisms

### Phase 4: Universal Chat Widget
1. Generate universal chat widget script:
   ```html
   <script src="https://cdn.colombiatic.ai/widget.js" data-client="ID_CLIENTE" async></script>
   ```

2. Implement client ID generation and management

### Phase 5: IA Orchestrator Connection
1. Establish direct connection to Misybot's IA Orchestrator
2. Implement message routing between channels and AI processing
3. Set up analytics and monitoring endpoints

## 📡 API Endpoints to Implement

### ColombiaTIC Agent Endpoints
```
POST   /colombiatic/agent/create              # Create new AI agent
GET    /colombiatic/agent/{id}               # Get agent configuration
PUT    /colombiatic/agent/{id}               # Update agent configuration
POST   /colombiatic/agent/{id}/webhooks      # Configure webhooks
GET    /colombiatic/agent/{id}/webhooks      # Get webhook configuration
```

### Webhook Endpoints
```
POST   /meta/facebook/webhook               # Facebook webhook
POST   /meta/whatsapp/webhook               # WhatsApp webhook
POST   /google/ads/webhook                  # Google Ads webhook
```

## 🛠️ Implementation Steps

### Step 1: Update AI Agent Service
Modify `src/services/misybot/aiAgentService.ts` to integrate with meta-agent:

1. Replace direct API calls with meta-agent processing
2. Maintain Misybot API compatibility
3. Implement proper error handling

### Step 2: Webhook System
Create webhook management system:

1. Webhook registration and validation
2. Channel-specific processing
3. Security verification (tokens, signatures)

### Step 3: Chat Widget Generation
Implement universal script generation:

1. Client ID management
2. Script generation with proper parameters
3. CDN integration

### Step 4: Testing and Validation
1. Unit tests for all new functions
2. Integration tests with meta-agent
3. End-to-end testing with sample channels

## 🔐 Security Considerations

1. All API calls must use `withCredentials: true`
2. Webhook endpoints must validate verification tokens
3. Client IDs must be securely generated and managed
4. All communications should be over HTTPS in production

## 📊 Success Metrics

1. ✅ AI Agent creation through meta-agent
2. ✅ Webhook configuration for all channels
3. ✅ Universal chat widget generation
4. ✅ Connection to IA Orchestrator
5. ✅ Proper error handling and logging

## 🚀 Next Steps

1. Execute Phase 1: Integration Analysis
2. Provide detailed implementation plan
3. Begin service enhancement
4. Test connections with existing systems