'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import ColombiaticChatInterface from '@/components/chat/ColombiaticChatInterface';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AgentChatPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {t('dashboard.agentChat.title', 'Chat con Asistente AI')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.agentChat.description', 'Interactúa con el asistente AI de ColombiaTIC para obtener ayuda y orientación')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <ColombiaticChatInterface />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}