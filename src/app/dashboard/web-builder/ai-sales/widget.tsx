// src/app/dashboard/web-builder/ai-sales/widget.tsx
"use client";

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n';
import { MessageCircle, X } from 'lucide-react';
import AISalesChat from './page';

export default function AISalesWidget() {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 z-50">
          <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 h-full flex flex-col">
            <div className="bg-gray-800 px-4 py-3 rounded-t-lg border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-medium">{t('webBuilder.aiSales.widgetTitle')}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AISalesChat />
            </div>
          </div>
        </div>
      )}
    </>
  );
}