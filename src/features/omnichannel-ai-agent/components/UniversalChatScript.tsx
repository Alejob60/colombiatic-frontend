// src/features/omnichannel-ai-agent/components/UniversalChatScript.tsx
"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the chat widget to avoid SSR issues
const ChatWidget = dynamic(
  () => import('./ChatWidget'),
  { ssr: false }
);

interface UniversalChatScriptProps {
  config?: {
    primaryColor?: string;
    greetingMessage?: string;
    botName?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  };
}

export default function UniversalChatScript({ config }: UniversalChatScriptProps) {
  useEffect(() => {
    // Add configuration to window object for external access
    if (typeof window !== 'undefined') {
      (window as any).colombiaticChatConfig = config || {};
    }

    // Add custom styles based on config
    if (config?.primaryColor) {
      const style = document.createElement('style');
      style.innerHTML = `
        .colombiatic-chat-button {
          background-color: ${config.primaryColor} !important;
        }
        .colombiatic-chat-header {
          background-color: ${config.primaryColor} !important;
        }
        .colombiatic-user-message {
          background-color: ${config.primaryColor} !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).colombiaticChatConfig;
      }
    };
  }, [config]);

  return <ChatWidget />;
}

// This is the script that would be provided to clients for embedding
export function generateEmbedScript(siteId: string) {
  return `
<!-- Colombiatic AI Chat Widget -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://colombiatic.com/chat-widget.js?siteId=${siteId}';
    script.async = true;
    document.head.appendChild(script);
    
    // Configuration
    window.colombiaticChatConfig = {
      siteId: '${siteId}',
      primaryColor: '#3b82f6',
      greetingMessage: '¡Hola! ¿En qué puedo ayudarte hoy?',
      botName: 'Asistente IA'
    };
  })();
</script>
<!-- End Colombiatic AI Chat Widget -->
  `.trim();
}