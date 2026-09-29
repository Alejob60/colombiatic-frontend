// src/components/landing/PartnerTicker.tsx
'use client';

import { useTranslations } from '@/lib/i18n';
import { PROGRAMS } from '@/lib/partners';

const TICKER_TRACK_CLASS =
  'flex w-max animate-[partnerMarquee_46s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none';

const TICKER_VIEWPORT_CLASS =
  'relative flex min-w-0 flex-1 items-center overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]';

function ProgramList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ? 'true' : undefined}
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {PROGRAMS.map((program) => (
        <li key={program.id} className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E6EDF3]/55 transition-colors duration-300 hover:text-[#E6EDF3]">
            {program.name}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#00C2FF]/40" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function PartnerTicker() {
  const { t } = useTranslations();
  const tickerLabel = t('landing.partners.tickerLabel');

  return (
    <div
      data-partner-ticker=""
      className="sticky top-[72px] z-[9990] hidden h-14 items-center gap-6 border-y border-white/[0.07] bg-white/[0.03] backdrop-blur-xl sm:flex lg:h-16"
    >
      <span className="shrink-0 pl-6 pr-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#64748B] lg:pl-8">
        {tickerLabel}
      </span>

      <span
        aria-hidden="true"
        className="h-5 w-px shrink-0 bg-gradient-to-b from-transparent via-white/15 to-transparent"
      />

      <div role="marquee" aria-label={tickerLabel} className={TICKER_VIEWPORT_CLASS}>
        <div className={TICKER_TRACK_CLASS}>
          <ProgramList />
          <ProgramList hidden />
        </div>
      </div>
    </div>
  );
}
