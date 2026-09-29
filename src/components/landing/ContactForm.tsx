'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';
import SectionHeader from '@/components/landing/SectionHeader';

type InterestKey = 'government' | 'business' | 'investment';
type FieldName = 'name' | 'email' | 'company' | 'role' | 'challenge';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type ErrorKey =
  | 'landing.contact.errors.name'
  | 'landing.contact.errors.email'
  | 'landing.contact.errors.emailInvalid'
  | 'landing.contact.errors.company'
  | 'landing.contact.errors.role'
  | 'landing.contact.errors.challenge';

interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  role: string;
  challenge: string;
  interests: InterestKey[];
}

const INTERESTS: InterestKey[] = ['government', 'business', 'investment'];

const EMPTY_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  role: '',
  challenge: '',
  interests: [],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_BASE =
  'w-full rounded-xl bg-white/[0.03] border px-4 py-3 text-[#E6EDF3] placeholder-[#64748B] focus:outline-none transition';

const inputClass = (invalid: boolean) =>
  `${INPUT_BASE} ${invalid ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-[#00C2FF]'}`;

const LABEL_CLASS = 'block text-sm font-medium text-[#E6EDF3]';
const HINT_CLASS = 'text-xs text-[#94A3B8]';
const ERROR_CLASS = 'mt-2 text-sm text-red-400';

export default function ContactForm() {
  const { t } = useTranslations();

  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, ErrorKey>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    const field = name as FieldName;

    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const toggleInterest = (interest: InterestKey): void => {
    setValues((previous) => ({
      ...previous,
      interests: previous.interests.includes(interest)
        ? previous.interests.filter((item) => item !== interest)
        : [...previous.interests, interest],
    }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<FieldName, ErrorKey>> = {};

    if (!values.name.trim()) {
      nextErrors.name = 'landing.contact.errors.name';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'landing.contact.errors.email';
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = 'landing.contact.errors.emailInvalid';
    }

    if (!values.company.trim()) {
      nextErrors.company = 'landing.contact.errors.company';
    }

    if (!values.role.trim()) {
      nextErrors.role = 'landing.contact.errors.role';
    }

    if (!values.challenge.trim()) {
      nextErrors.challenge = 'landing.contact.errors.challenge';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          role: values.role.trim(),
          challenge: values.challenge.trim(),
          interests: values.interests,
        }),
      });

      if (!response.ok) {
        throw new Error(`lead_submission_failed:${response.status}`);
      }

      setStatus('success');
    } catch (error) {
      console.error('[ContactForm] lead submission failed', error);
      setStatus('error');
    }
  };

  const handleReset = (): void => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus('idle');
  };

  const isSubmitting = status === 'submitting';

  return (
    <section id="contacto" className="relative py-20 sm:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow={t('landing.contact.badge')}
          title={t('landing.contact.title')}
          description={t('landing.contact.subtitle')}
        />

        <motion.div
          className="relative mt-12 sm:mt-16 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181B] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 sm:p-8 shadow-[0_24px_60px_-30px_rgba(0,198,255,0.35)]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/80 to-transparent"
          />
          {status === 'success' ? (
            <div className="py-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF]">
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#E6EDF3] tracking-tight">
                {t('landing.contact.successTitle')}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-[#94A3B8] text-base leading-relaxed">
                {t('landing.contact.successBody')}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C2FF] text-white font-semibold transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {t('landing.contact.sendAnother')}
              </button>
            </div>
          ) : (
            <>
              {status === 'error' && (
                <div
                  role="alert"
                  className="mb-8 rounded-xl border border-red-500/40 bg-red-500/10 p-4"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-red-300">
                    <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {t('landing.contact.errorTitle')}
                  </p>
                  <p className="mt-1 text-sm text-red-300/80">
                    {t('landing.contact.errorBody')}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={LABEL_CLASS}>
                      {t('landing.contact.nameLabel')}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`mt-2 ${inputClass(Boolean(errors.name))}`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className={ERROR_CLASS}>
                        {t(errors.name)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={LABEL_CLASS}>
                      {t('landing.contact.emailLabel')}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`mt-2 ${inputClass(Boolean(errors.email))}`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className={ERROR_CLASS}>
                        {t(errors.email)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className={LABEL_CLASS}>
                      {t('landing.contact.companyLabel')}
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? 'contact-company-error' : undefined}
                      className={`mt-2 ${inputClass(Boolean(errors.company))}`}
                    />
                    {errors.company && (
                      <p id="contact-company-error" role="alert" className={ERROR_CLASS}>
                        {t(errors.company)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-role" className={LABEL_CLASS}>
                      {t('landing.contact.roleLabel')}
                    </label>
                    <input
                      id="contact-role"
                      name="role"
                      type="text"
                      autoComplete="organization-title"
                      value={values.role}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.role)}
                      aria-describedby={errors.role ? 'contact-role-error' : undefined}
                      className={`mt-2 ${inputClass(Boolean(errors.role))}`}
                    />
                    {errors.role && (
                      <p id="contact-role-error" role="alert" className={ERROR_CLASS}>
                        {t(errors.role)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-challenge" className={LABEL_CLASS}>
                    {t('landing.contact.challengeLabel')}
                  </label>
                  <textarea
                    id="contact-challenge"
                    name="challenge"
                    rows={5}
                    value={values.challenge}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.challenge)}
                    aria-describedby={
                      errors.challenge ? 'contact-challenge-error' : 'contact-challenge-hint'
                    }
                    className={`mt-2 ${inputClass(Boolean(errors.challenge))}`}
                  />
                  {errors.challenge ? (
                    <p id="contact-challenge-error" role="alert" className={ERROR_CLASS}>
                      {t(errors.challenge)}
                    </p>
                  ) : (
                    <p id="contact-challenge-hint" className={`mt-2 ${HINT_CLASS}`}>
                      {t('landing.contact.challengeHint')}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className={LABEL_CLASS}>{t('landing.contact.interestLabel')}</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {INTERESTS.map((interest) => {
                      const checkboxId = `contact-interest-${interest}`;
                      return (
                        <label
                          key={interest}
                          htmlFor={checkboxId}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                            values.interests.includes(interest)
                              ? 'border-[#00C2FF]/50 bg-[#00C2FF]/[0.07]'
                              : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                          }`}
                        >
                          <input
                            id={checkboxId}
                            name="interests"
                            type="checkbox"
                            value={interest}
                            checked={values.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-transparent text-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF] focus:ring-offset-0"
                          />
                          <span className="text-sm text-[#E6EDF3]">
                            {t(`landing.contact.interests.${interest}`)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C2FF] text-white font-semibold transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                  {isSubmitting ? t('landing.contact.submitting') : t('landing.contact.submit')}
                </button>
              </form>
            </>
          )}

          <p className="mt-8 border-t border-white/[0.07] pt-6 text-xs leading-relaxed text-[#94A3B8]">
            {t('landing.contact.footnote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
