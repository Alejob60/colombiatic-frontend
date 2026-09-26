# ColombiaTIC AI Ecosystem Development Plan

## Current Status
✅ **Sprint 1 - Completed**: Internationalization support and landing page redesign
✅ **Sprint 2 - Completed**: Interactive AI demo experience
✅ **Sprint 3 - Completed**: Auth & Dashboard Integration
✅ **Sprint 4 - Completed**: Data governance controls
✅ **Sprint 5 - Completed**: Bulk customer data import
✅ **Sprint 6 - Completed**: Legal compliance and data protection
✅ **Sprint 7 - Completed**: Advertising and monetization
✅ **Sprint 8 - Completed**: Omnichannel customer support

## Workflow Overview

1. **Sprint 1**: Redesign landing page with AI-first approach
2. **Sprint 2**: Interactive AI demo experience
3. **Sprint 3**: User authentication and dashboard
4. **Sprint 4**: Data governance controls
5. **Sprint 5**: Bulk customer data import
6. **Sprint 6**: Legal compliance and data protection
7. **Sprint 7**: Advertising and monetization
8. **Sprint 8**: Omnichannel customer support
9. **Sprint 9**: QA, hardening, and documentation

---

## Sprint 3 — Auth & Dashboard Integration

### Objective
Implement authentication and connect the frontend to the main backend endpoints.

### Tasks

#### Auth Flow Implementation
- [x] Create /login and /register views with validation and visual feedback
- [x] Integrate /auth/login and /auth/register API endpoints
- [x] Store JWT tokens in HttpOnly Cookies
- [x] Implement global AuthContext for persistent session

#### Protected Routes
- [x] Create withAuth() HOC to protect internal routes (Dashboard, Profile)
- [x] Automatically redirect if no valid token

#### User Dashboard (Base Structure)
- [x] Create /dashboard page with responsive structure
- [x] Display basic user information (name, email, plan, projects)
- [x] Integrate DashboardSidebar component with navigation to modules

#### Analytics Hook
- [x] Create useAnalytics() hook to send events to /api/analytics/event
- [x] Capture user actions (login, lead, demo usage, etc.)

#### API Client Layer
- [x] Create centralized apiClient.ts for request management (axios with interceptors)
- [x] Configure global error handling and automatic token refresh

#### UX Enhancements
- [x] Show visual loader during requests
- [x] Integrate toast for errors/success
- [x] Review accessibility (WCAG AA)

### Deliverables
- [x] Complete authentication flow (login/registration/logout)
- [x] Dashboard connected to backend with real data
- [x] Interaction events registered in analytics
- [x] Centralized API client with JWT security

---

## Sprint 4 — Configuración y Control de Data (Governance)

### Objective
Provide customers with tools to control what data AI uses, retention policies, and privacy.

### Deliverables
- Data Controls panel in dashboard: toggles for "use data X", delete context, anonymize
- Change history and audit logs
- Data retention configuration per instance (30/90/365 days)
- Roles and permissions (Owner, Admin, Editor, Viewer)

### Frontend Components
- [x] `DataControlPanel.tsx`
- [x] `AuditLogTable.tsx`
- [x] `PolicyModal.tsx` (simple legal explanations)
- [x] `RoleManagementPanel.tsx` (role and permission management)

### API Endpoints
- [x] GET `/api/instances/:id/data-settings`
- [x] PUT `/api/instances/:id/data-settings`
- [x] POST `/api/instances/:id/data/purge`
- [x] GET `/api/audit?instance_id=...`
- [x] GET `/api/instances/:id/roles`
- [x] POST `/api/instances/:id/roles`
- [x] PUT `/api/instances/:id/roles/:id`
- [x] DELETE `/api/instances/:id/roles/:id`
- [x] POST `/api/instances/:id/role-assignments`
- [x] GET `/api/instances/:id/role-assignments`
- [x] DELETE `/api/instances/:id/role-assignments/:id`
- [x] GET `/api/permissions`

### Definition of Done
- [x] Client can disable use of certain data and execute "purge"
- [x] Audit logs record who did what and when
- [x] Role and permission testing

---

## Sprint 5 — Carga Masiva de Bases de Clientes (Onboarding Data)

### Objective
Allow uploading CSV/Excel with customers and feed personalized contexts into the AI instance.

### Deliverables
- Import UI with preview and column mapping
- Basic ETL: validation, deduplication, normalization
- Import job monitor (status, errors)
- Connectors: CSV upload, Google Sheets, API integrations (CRM)

### Frontend Components
- [x] `BulkImportWizard.tsx`
- [x] `ImportJobStatus.tsx`

### API Endpoints
- [x] POST `/api/imports` (starts job)
- [x] GET `/api/imports/:id`
- [x] Worker (background) that transforms and persists in `customer_contexts`

### Data Models
```typescript
// Customer model
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  meta: Record<string, any>;
}

// CustomerContext model
interface CustomerContext {
  id: string;
  customer_id: string;
  instance_id: string;
  embeddings_ref: string;
}
```

### Definition of Done
- [x] Import 10k rows without loss (testing)
- [x] Error reporting per row
- [x] Integration with data controls (privacy)
- [x] Support for CSV, Google Sheets, and API connectors

---

## Sprint 6 — Legal / Protección de Datos (Habeas Data, ToS, Consent)

### Objective
Deliver the minimum legal package to avoid risks and ensure responsible data use.

### Deliverables
- Legal templates: Terms of Service (ToS), Privacy Policy, Explicit Consent (checkboxes), DPA (Data Processing Agreement)
- Data usage policy in Dashboard (acceptance and recording)
- Endpoints and UI to export/delete data (Right to Access / Right to Erasure)
- Support for consent logging (audit)

### Legal Documents Examples
1. **ToS**: Scope, responsibilities, limitations
2. **Privacy Policy**: Collected data, purpose, third parties
3. **DPA**: Obligations as data processor
4. **Consent Form**: Details of use within the ecosystem

### API Endpoints
- [x] POST `/api/users/:id/request-data-export`
- [x] POST `/api/users/:id/request-delete`
- [x] POST `/api/consent/record`
- [x] GET `/api/consent/history/:user_id`
- [x] GET `/api/consent/status/:user_id/:consent_type`
- [x] POST `/api/consent/withdraw`

### Definition of Done
- [x] All documents reviewable from admin
- [x] Export/delete flows working
- [x] Consent recording per user
- [x] Legal dashboard with document management
- [x] Consent management interface
- [x] Data rights management (export/deletion)

---

## Sprint 7 — Control de Ads y Monetización (Marketplace / Ads Control)

### Objective
Build a monetization and advertising module within the dashboard inspired by models like Google Ads and Hotmart (campaigns, budgets, performance).

### Deliverables
- AdsManager in dashboard: create campaigns, configure budget, targets, creatives
- Measurement and reporting (impressions, clicks, conversions)
- Billing / credits: balance system and basic billing
- Marketplace to sell templates/skills/flows (Hotmart-inspired model)

### Frontend Components
- [x] `CampaignBuilder.tsx` — campaign wizard
- [x] `AdCreativeUploader.tsx`
- [x] `AdsReport.tsx`

### API Endpoints
- [x] POST `/api/ads/campaigns`
- [x] GET `/api/ads/campaigns/:id`
- [x] POST `/api/ads/allocate-budget`
- [x] GET `/api/ads/report?campaign_id=...`

### Monetization Ideas
- CPC/CPM model for internal promotion
- Sale of "skills" or "templates" (marketplace), with Hotmart-style commission
- Credits for AI consumption (requests/embeddings)

### Definition of Done
- [x] Create/pause campaign
- [x] View basic metrics (CTR, Cost)
- [x] Balance system that deducts for consumption

---

## Sprint 8 — Integraciones Omnicanal de Atención al Cliente

### Objective
Connect the AI instance to channels: webchat, WhatsApp (via Twilio/Gupshup), email, voice (IVR), and social networks (Messenger).

### Deliverables
- Channel connectors (adapters) with UI to activate them
- Human fallback routes → transfer to human agent
- Conversation logging and CRM synchronization
- Embeddable web widget for clients

### Components
- [x] `ChannelConfig.tsx`
- [x] `ConversationCenter.tsx` (UC view for agents)
- [x] `WebChatWidget.tsx` (embeddable widget)

### API Endpoints
- [x] POST `/api/channels/connect` (configures channel)
- [x] Webhook endpoints for each provider (Twilio, Facebook)

### Definition of Done
- [x] Send/receive messages in 2 channels in staging environment
- [x] Handoff to human tested
- [x] Conversations stored in conversations table

---

## Sprint 9 — QA, Harden, Observability y Documentación

### Objective
Prepare the system for customers: security, load testing, monitoring, and manuals.

### Deliverables
- Basic penetration tests and critical fixes
- Load tests for critical flows (auth, demo chat, imports)
- Metrics + dashboards (Application Insights / Prometheus + Grafana)
- Customer docs: onboarding guide + legal agreements

### Frontend Components
- [x] `SecurityAuditPanel.tsx`
- [x] `PerformanceMonitor.tsx`
- [x] `DocumentationCenter.tsx`

### API Endpoints
- [x] GET `/api/health`
- [x] GET `/api/metrics`
- [x] POST `/api/tests/load`

### Definition of Done
- [x] Critical errors resolved
- [x] Internal SLA documented
- [x] Incident playbook
- [x] General workflow to update site and implement AI

---

## Technical Key Notes (Practical Recommendations)

### Architecture
- **Frontend**: Next.js
- **API**: NestJS
- **Database**: PostgreSQL
- **Cache/Jobs**: Redis
- **AI Services**: Azure OpenAI / embeddings
- **Storage**: Azure Blob

### Security
- JWT + refresh tokens
- Encrypt sensitive data at rest
- KMS for keys

### Data Pipeline
- When uploading databases, create ETL processes and embeddings via batch workers (not in synchronous requests)

### Observability
- Application Insights + structured logs

### Payments
- Integrate Stripe (or local provider) for recurring billing and invoicing system

### Marketplace
- Charge commission on template/skill sales; allow affiliation (Hotmart model)

This comprehensive plan provides a roadmap for transforming the current frontend into a full-featured AI ecosystem platform with proper backend integration, user management, data governance, and monetization capabilities.