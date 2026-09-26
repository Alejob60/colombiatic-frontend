// src/app/(i18n)/[lang]/(dashboard)/test-debug/layout.tsx

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';

export default function TestDebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-900">
          <header className="bg-gray-800 p-4">
            <h1 className="text-white text-xl font-bold">Test Debug Layout</h1>
          </header>
          <main>
            {children}
          </main>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}