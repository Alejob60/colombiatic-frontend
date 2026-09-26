// src/app/(i18n)/[lang]/(dashboard)/settings/page.tsx
"use client";

import { withAuth } from '@/components/hoc/withAuth';
import SettingsDashboard from '@/components/dashboard/SettingsDashboard';

function SettingsPage() {
  return (
    <div className="min-h-full">
      <SettingsDashboard />
    </div>
  );
}

export default withAuth(SettingsPage);
