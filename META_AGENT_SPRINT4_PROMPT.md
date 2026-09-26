# META-AGENT PROMPT - SPRINT 4 PROCESSING

## 🎯 Objective
Process Sprint 4 requirements for Data Governance & Privacy Controls and establish connection with the existing meta-agent service.

## 📋 Sprint 4 Requirements Summary

### Goal
Provide customers with tools to control what data AI uses, retention policies, and privacy.

### Tasks
1. Data Controls panel in dashboard: toggles for "use data X", delete context, anonymize
2. Change history and audit logs
3. Data retention configuration per instance (30/90/365 days)
4. Roles and permissions (Owner, Admin, Editor, Viewer)

## 🔧 Current System Analysis

### Existing Services
1. **Data Governance Service**: Located at `src/services/misybot/dataGovernanceService.ts`
2. **Data Governance Hook**: Located at `src/hooks/useDataGovernance.ts`
3. **Dashboard Components**: 
   - `src/components/dashboard/DataControlPanel.tsx`
   - `src/components/dashboard/AuditLogTable.tsx`
   - `src/components/dashboard/PolicyModal.tsx`
4. **Dashboard Page**: Located at `src/app/(dashboard)/data-governance/page.tsx`

### Environment Configuration
- Meta Agent URL: `http://localhost:3007`
- Misybot API URL: `https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net`

## 🤖 Meta-Agent Instructions

### Phase 1: Data Governance Enhancement
1. Analyze the existing data governance service in:
   - `src/services/misybot/dataGovernanceService.ts`

2. Enhance data governance service to:
   - Connect to meta-agent for advanced privacy controls
   - Implement intelligent data classification
   - Add automated compliance checking

### Phase 2: Privacy Controls
1. Enhance the DataControlPanel component to include:
   - Advanced privacy settings
   - Automated compliance recommendations
   - Risk assessment visualization

2. Implement privacy-focused data handling:
   - Automatic PII detection and masking
   - Consent management integration
   - Data lineage tracking

### Phase 3: Audit and Compliance
1. Enhance the AuditLogTable component to include:
   - Intelligent log analysis
   - Compliance violation detection
   - Automated reporting generation

2. Implement compliance monitoring:
   - GDPR/CCPA compliance checking
   - Automated audit trail generation
   - Risk scoring for data operations

### Phase 4: Policy Management
1. Enhance the PolicyModal component to include:
   - Dynamic policy generation based on jurisdiction
   - Automated policy updates
   - Consent tracking and management

2. Implement policy intelligence:
   - Jurisdiction-based policy recommendations
   - Automated policy compliance checking
   - Policy versioning and history

## 📡 API Endpoints to Implement

### Data Governance Endpoints
```
GET    /api/instances/:id/data-settings        # Get data settings
PUT    /api/instances/:id/data-settings        # Update data settings
POST   /api/instances/:id/data/purge           # Purge data
GET    /api/audit?instance_id=...              # Get audit logs
GET    /api/compliance/status?instance_id=...  # Get compliance status
POST   /api/consent/record                     # Record user consent
```

## 🛠️ Implementation Steps

### Step 1: Enhanced Data Governance Service
Modify `src/services/misybot/dataGovernanceService.ts` to integrate with meta-agent:

1. Add meta-agent processing for intelligent data classification
2. Implement compliance checking capabilities
3. Add privacy risk assessment functions

### Step 2: Privacy Controls UI Enhancement
Enhance `src/components/dashboard/DataControlPanel.tsx` with:

1. Advanced privacy settings controls
2. Risk assessment visualization
3. Automated compliance recommendations

### Step 3: Audit Intelligence
Enhance `src/components/dashboard/AuditLogTable.tsx` with:

1. Intelligent log analysis
2. Compliance violation detection
3. Automated reporting features

### Step 4: Policy Intelligence
Enhance `src/components/dashboard/PolicyModal.tsx` with:

1. Dynamic policy generation
2. Automated policy updates
3. Consent management integration

### Step 5: Testing and Validation
1. Unit tests for all new functions
2. Integration tests with meta-agent
3. End-to-end testing with sample data
4. Compliance validation testing

## 🔐 Security Considerations

1. All API calls must use `withCredentials: true`
2. Data should be encrypted in transit and at rest
3. Access controls for sensitive data operations
4. Proper error handling for failed requests
5. Audit logging for all data governance operations

## 📊 Success Metrics

1. ✅ Data controls panel with privacy settings
2. ✅ Audit logs with intelligent analysis
3. ✅ Data retention configuration
4. ✅ Policy management with consent tracking
5. ✅ Compliance monitoring and reporting
6. ✅ Risk assessment and mitigation

## 🚀 Next Steps

1. Execute Phase 1: Data Governance Enhancement
2. Provide detailed implementation plan
3. Begin UI component enhancements
4. Test connections with existing systems