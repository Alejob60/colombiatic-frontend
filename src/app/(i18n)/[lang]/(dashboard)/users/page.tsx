// src/app/(i18n)/[lang]/(dashboard)/users/page.tsx
"use client";

import { withAuth } from '@/components/hoc/withAuth';
import UserManagementDashboard from '@/components/dashboard/UserManagementDashboard';

function UsersPage() {
  return (
    <div className="min-h-full">
      <UserManagementDashboard />
    </div>
  );
}

export default withAuth(UsersPage);
