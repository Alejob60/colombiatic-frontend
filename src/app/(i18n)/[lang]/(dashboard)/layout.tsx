// src/app/(i18n)/[lang]/(dashboard)/layout.tsx

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import DashboardLayoutV2 from '@/components/dashboard-v2/DashboardLayoutV2';
import DashboardAuthGuard from '@/components/dashboard-v2/DashboardAuthGuard';

export const metadata = {
  title: 'Dashboard | ColombiaTIC AI Ecosystem',
  description: 'Panel de control para administrar tus servicios de inteligencia artificial',
};

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ToastProvider>
        <DashboardAuthGuard>
          <DashboardLayoutV2>
            {children}
          </DashboardLayoutV2>
        </DashboardAuthGuard>
      </ToastProvider>
    </AuthProvider>
  );
}