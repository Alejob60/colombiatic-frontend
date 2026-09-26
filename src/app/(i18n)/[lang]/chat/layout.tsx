// src/app/(i18n)/[lang]/chat/layout.tsx
// Layout para la página de inicio con chat

import ChatLayout from '@/app/(i18n)/[lang]/chat-layout';

export default function ChatPageLayout({
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