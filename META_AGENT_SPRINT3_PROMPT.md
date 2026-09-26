# META-AGENT PROMPT - SPRINT 3 PROCESSING

## 🎯 Objective
Process Sprint 3 requirements for Dashboard Intelligence & Analytics Integration and establish connection with the existing meta-agent service.

## 📋 Sprint 3 Requirements Summary

### Goal
Crear un dashboard inteligente que muestre las métricas más importantes para los clientes ColombiaTIC:
- Overview de leads, ventas, satisfacción
- Análisis emocional de conversaciones
- Métricas de ventas asistidas
- Aprendizaje global del modelo (insights)
- Recomendaciones cross-business

### Tasks
1. Integrar endpoints de métricas de Misybot
2. Crear visualizaciones de datos en tiempo real
3. Implementar análisis emocional de conversaciones
4. Mostrar métricas de ventas asistidas por IA
5. Integrar insights de aprendizaje global
6. Generar recomendaciones cross-business

## 🔧 Current System Analysis

### Existing Services
1. **Dashboard Service**: Located at `src/services/misybot/dashboardService.ts`
2. **Dashboard Page**: Located at `src/app/(dashboard)/page.tsx`
3. **Meta-Agent Service**: Located at `src/services/metaAgentService.ts`
4. **AI Agent Service**: Located at `src/services/misybot/aiAgentService.ts`

### Environment Configuration
- Meta Agent URL: `http://localhost:3007`
- Misybot API URL: `https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net`
- ColombiaTIC Namespace: `/colombiatic`

## 🤖 Meta-Agent Instructions

### Phase 1: Analytics Enhancement
1. Analyze the existing dashboard service in:
   - `src/services/misybot/dashboardService.ts`

2. Enhance dashboard service to:
   - Connect to meta-agent for advanced analytics processing
   - Implement real-time data streaming
   - Add predictive analytics capabilities

### Phase 2: Data Visualization
1. Enhance the dashboard page to include:
   - Real-time charts for conversation metrics
   - Sales performance dashboards
   - Emotional analysis visualizations
   - Cross-business recommendation widgets

2. Implement charting components using:
   - Recharts or Chart.js for data visualization
   - Responsive design for all screen sizes
   - Interactive elements with tooltips and drill-downs

### Phase 3: Intelligence Layer
1. Integrate emotional analysis of conversations:
   - Process sentiment scores from conversation metrics
   - Create emotional trend visualizations
   - Identify conversation patterns

2. Implement sales metrics analysis:
   - Track conversion rates across channels
   - Analyze revenue trends
   - Identify high-performing sales tactics

### Phase 4: Learning Insights
1. Integrate global AI model learning insights:
   - Fetch insights from `/colombiatic/learning/insights` endpoint
   - Create actionable recommendation cards
   - Implement insight prioritization

2. Generate cross-business recommendations:
   - Process recommendations from `/colombiatic/recommendations/cross-business`
   - Create recommendation cards with confidence scoring
   - Implement recommendation filtering

## 📡 API Endpoints to Implement

### ColombiaTIC Analytics Endpoints
```
GET    /colombiatic/dashboard/summary        # Dashboard summary data
GET    /colombiatic/analytics/conversations  # Conversation metrics
GET    /colombiatic/analytics/sales          # Sales metrics
GET    /colombiatic/analytics/ads            # Ad performance metrics
GET    /colombiatic/learning/insights        # Learning insights
GET    /colombiatic/recommendations/cross-business  # Cross-business recommendations
```

## 🛠️ Implementation Steps

### Step 1: Enhanced Dashboard Service
Modify `src/services/misybot/dashboardService.ts` to integrate with meta-agent:

1. Add meta-agent processing for advanced analytics
2. Implement data caching for performance
3. Add error handling and fallback mechanisms

### Step 2: Dashboard UI Enhancement
Enhance `src/app/(dashboard)/page.tsx` with:

1. Real-time data visualization components
2. Interactive charts and graphs
3. Performance metrics cards
4. Recommendation widgets

### Step 3: Intelligence Components
Create new components for:

1. Emotional analysis dashboard
2. Sales performance tracking
3. Learning insights display
4. Cross-business recommendations

### Step 4: Testing and Validation
1. Unit tests for all new functions
2. Integration tests with meta-agent
3. End-to-end testing with sample data

## 🔐 Security Considerations

1. All API calls must use `withCredentials: true`
2. Data should be sanitized before display
3. Rate limiting for analytics endpoints
4. Proper error handling for failed requests

## 📊 Success Metrics

1. ✅ Real-time dashboard with live data
2. ✅ Emotional analysis visualization
3. ✅ Sales metrics tracking
4. ✅ Learning insights integration
5. ✅ Cross-business recommendations
6. ✅ Responsive design for all devices

## 🚀 Next Steps

1. Execute Phase 1: Analytics Enhancement
2. Provide detailed implementation plan
3. Begin dashboard UI enhancement
4. Test connections with existing systems