// src/app/(i18n)/[lang]/debug/layout.tsx
// Layout para la página de debug

import ChatLayout from '@/app/(i18n)/[lang]/chat-layout';

export default function DebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatLayout>
      {children}
    </ChatLayout>
  );
}