// src/app/(i18n)/[lang]/test-chat/layout.tsx
// Layout para la página de prueba del chat

import ChatLayout from '@/app/(i18n)/[lang]/chat-layout';

export default function TestChatLayout({
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