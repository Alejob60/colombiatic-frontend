// src/app/api/lead/route.ts
import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 160;
const MAX_SHORT = 320;
const MAX_LONG = 4000;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_KEYS = 5000;

const INTEREST_LABELS: Record<string, Record<string, string>> = {
  es: {
    government: 'Gobierno y sector público',
    business: 'Empresas y comercio',
    investment: 'Inversión',
  },
  en: {
    government: 'Government and public sector',
    business: 'Business and commerce',
    investment: 'Investment',
  },
};

const SUBJECTS: Record<string, { team: string; visitor: string; visitorBody: string }> = {
  es: {
    team: 'Nuevo lead desde colombiatic.com.co',
    visitor: 'Recibimos tu solicitud — ColombiaTIC',
    visitorBody:
      'Hola {{name}}, gracias por escribirnos. Tu solicitud ya está con nuestro equipo de arquitectura y te responderemos en menos de 24 horas hábiles.',
  },
  en: {
    team: 'New lead from colombiatic.com.co',
    visitor: 'We received your request — ColombiaTIC',
    visitorBody:
      'Hi {{name}}, thank you for reaching out. Your request is now with our architecture team and we will reply within one business day.',
  },
};

const rateLimitHits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (rateLimitHits.get(key) ?? []).filter((at) => now - at < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(key, recent);
    return true;
  }

  recent.push(now);

  if (rateLimitHits.size > RATE_LIMIT_MAX_KEYS) {
    for (const [stored, times] of rateLimitHits) {
      if (!times.some((at) => now - at < RATE_LIMIT_WINDOW_MS)) rateLimitHits.delete(stored);
    }
  }

  rateLimitHits.set(key, recent);
  return false;
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveBackendBase(): string | null {
  const raw = process.env.LEAD_API_BASE ?? process.env.NEXT_PUBLIC_API_URL ?? '';
  const trimmed = raw.replace(/\/+$/, '');
  return trimmed.length > 0 ? trimmed : null;
}

function buildNotes(data: {
  role: string;
  challenge: string;
  interests: string[];
  locale: string;
}): string {
  const labels = INTEREST_LABELS[data.locale] ?? INTEREST_LABELS.es;
  const lines: string[] = [];

  if (data.role) lines.push(`Cargo: ${data.role}`);
  if (data.interests.length > 0) {
    lines.push(`Intereses: ${data.interests.map((key) => labels[key] ?? key).join(', ')}`);
  }
  if (data.challenge) lines.push(`Desafío: ${data.challenge}`);

  return lines.join('\n');
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px">${value}</td></tr>`;
}

async function sendWithResend(
  apiKey: string,
  payload: { to: string[]; from: string; subject: string; html: string; text: string }
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[lead] resend status=${response.status} detail=${detail.slice(0, 300)}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[lead] resend request failed', error);
    return false;
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'invalid_payload' }, { status: 400 });
  }

  if (clean(payload.website, 200).length > 0) {
    return NextResponse.json({ success: true, persisted: false, emailed: false }, { status: 201 });
  }

  const name = clean(payload.name, MAX_NAME);
  const email = clean(payload.email, MAX_SHORT).toLowerCase();
  const company = clean(payload.company, MAX_SHORT);
  const role = clean(payload.role, MAX_SHORT);
  const challenge = clean(payload.challenge, MAX_LONG);
  const locale = clean(payload.locale, 8) === 'en' ? 'en' : 'es';
  const interests = Array.isArray(payload.interests)
    ? payload.interests
        .filter((item): item is string => typeof item === 'string')
        .filter((item) => item in INTEREST_LABELS.es)
        .slice(0, 5)
    : [];

  if (!name || !company || !role || !challenge || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ success: false, error: 'invalid_fields' }, { status: 400 });
  }

  const clientKey = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(clientKey)) {
    return NextResponse.json({ success: false, error: 'rate_limited' }, { status: 429 });
  }

  const backendBase = resolveBackendBase();
  let persisted = false;

  if (backendBase) {
    try {
      const backendResponse = await fetch(`${backendBase}/demo-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          source: 'landing',
          notes: buildNotes({ role, challenge, interests, locale }),
        }),
        signal: AbortSignal.timeout(8000),
      });

      persisted = backendResponse.ok;

      if (!persisted) {
        console.error(`[lead] backend status=${backendResponse.status}`);
      }
    } catch (error) {
      console.error('[lead] backend unreachable', error);
    }
  } else {
    console.error('[lead] no backend configured (LEAD_API_BASE / NEXT_PUBLIC_API_URL)');
  }

  const resendKey = process.env.RESEND_API_KEY ?? '';
  const teamEmail = (process.env.LEAD_NOTIFICATION_EMAIL ?? 'enterprise@colombiatic.com.co').trim();
  const from = process.env.LEAD_FROM_EMAIL ?? 'ColombiaTIC <onboarding@resend.dev>';
  const copy = SUBJECTS[locale];

  let emailed = false;

  if (resendKey) {
    const detailRows = [
      row('Nombre', escapeHtml(name)),
      row('Correo', escapeHtml(email)),
      row('Empresa', escapeHtml(company)),
      role ? row('Cargo', escapeHtml(role)) : '',
      interests.length > 0
        ? row('Intereses', escapeHtml(interests.map((key) => (INTEREST_LABELS[locale] ?? INTEREST_LABELS.es)[key] ?? key).join(', ')))
        : '',
      row('Desafío', escapeHtml(challenge).replace(/\n/g, '<br />')),
    ].join('');

    const teamHtml = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px"><h2 style="margin:0 0 16px;font-size:18px;color:#111827">Nuevo lead desde colombiatic.com.co</h2><table style="width:100%;border-collapse:collapse">${detailRows}</table><p style="margin-top:20px;font-size:12px;color:#9ca3af">Fuente: landing · ${escapeHtml(persisted ? 'persistido en Postgres' : 'persistencia fallida')}</p></div>`;
    const teamText = `Nuevo lead\n\nNombre: ${name}\nCorreo: ${email}\nEmpresa: ${company}\nCargo: ${role}\nIntereses: ${interests.join(', ') || '-'}\nDesafío: ${challenge}\n\nFuente: landing · ${persisted ? 'persistido' : 'persistencia fallida'}`;

    const visitorHtml = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px"><h2 style="margin:0 0 12px;font-size:18px;color:#111827">${escapeHtml(copy.visitor)}</h2><p style="font-size:15px;color:#374151;line-height:1.6">${escapeHtml(copy.visitorBody.replace('{{name}}', name.split(' ')[0]))}</p></div>`;

    const [teamSent, visitorSent] = await Promise.all([
      sendWithResend(resendKey, {
        to: [teamEmail],
        from,
        subject: `${copy.team} — ${company}`,
        html: teamHtml,
        text: teamText,
      }),
      sendWithResend(resendKey, {
        to: [email],
        from,
        subject: copy.visitor,
        html: visitorHtml,
        text: copy.visitorBody.replace('{{name}}', name),
      }),
    ]);

    emailed = teamSent || visitorSent;
  } else {
    console.warn('[lead] RESEND_API_KEY no configurado: lead persistido sin envio de correo');
  }

  if (!persisted && !emailed) {
    return NextResponse.json({ success: false, error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ success: true, persisted, emailed }, { status: 201 });
}
