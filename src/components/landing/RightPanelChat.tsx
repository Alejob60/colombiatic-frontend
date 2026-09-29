'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Minimize2, Sparkles, X } from 'lucide-react';
import SmartChatWrapper from '@/components/chat/SmartChatWrapper';
import { useTranslations } from '@/lib/i18n';

export default function RightPanelChat() {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="fixed bottom-[4.75rem] right-4 sm:right-5 lg:bottom-5 z-[9998] flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={t('chat.title')}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="w-[min(360px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-7rem))] flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)]"
          >
            <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.04]">
              <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00C2FF]">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-[#E6EDF3]">{t('chat.title')}</h2>
                <p className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {t('chat.statusOnline')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t('chat.minimize')}
                className="grid h-7 w-7 place-items-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
              >
                <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t('chat.close')}
                className="grid h-7 w-7 place-items-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </header>

            <div className="min-h-0 flex-1">
              <SmartChatWrapper />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? t('chat.close') : t('chat.open')}
        className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-2.5 pl-3 pr-4 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:scale-[1.03]"
      >
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#0066FF] to-[#00C2FF]">
          <span className="absolute inset-0 rounded-full bg-[#00C2FF]/40 blur-md transition-opacity duration-200 group-hover:opacity-100 opacity-0" aria-hidden="true" />
          <MessageCircle className="relative h-4 w-4 text-white" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-[#E6EDF3]">{t('chat.title')}</span>
      </button>
    </div>
  );
}
