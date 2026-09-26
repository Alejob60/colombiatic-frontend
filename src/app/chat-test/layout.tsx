// src/app/chat-test/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ToastProvider } from '@/contexts/ToastContext';

export const metadata = {
  title: 'Chat IA Test | Colombiatic AI',
  description: 'Página de prueba para el widget de chat IA omnicanal',
};

export default function ChatTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </LanguageProvider>
  );
}