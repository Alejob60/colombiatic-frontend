// src/app/(i18n)/[lang]/(dashboard)/security/page.tsx
"use client";

import { withAuth } from '@/components/hoc/withAuth';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';

function SecurityPage() {
  return (
    <div className="min-h-full">
      <SecurityDashboard />
    </div>
  );
}

export default withAuth(SecurityPage);
