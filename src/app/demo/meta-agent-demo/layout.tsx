// src/app/demo/meta-agent-demo/layout.tsx
import { MetaAgentProvider } from '@/contexts/MetaAgentContext';

export default function MetaAgentDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MetaAgentProvider>
      {children}
    </MetaAgentProvider>
  );
}