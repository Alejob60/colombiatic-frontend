'use client';

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xgegjykr", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setStatus({ message: t('contact.success_message') || "✅ Mensaje enviado correctamente.", isError: false });
        e.currentTarget.reset();
      } else {
        setStatus({ message: t('contact.error_message') || "❌ Hubo un error al enviar el mensaje.", isError: true });
      }
    } catch {
      setStatus({ message: t('contact.network_error') || "❌ Error de red. Intenta nuevamente.", isError: true });
    }
  };

  return (
    <section className="min-h-screen bg-background text-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{t('contact.title') || 'Contáctanos'}</h1>
        <p className="text-textSecondary mb-8">
          {t('contact.description') || 'Escríbenos para alianzas, proyectos o asesoría especializada.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <input
            type="text"
            name="name"
            placeholder={t('contact.name_placeholder') || "Tu nombre"}
            required
            className="w-full px-4 py-3 rounded-md bg-surface text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder={t('contact.email_placeholder') || "Tu correo"}
            required
            className="w-full px-4 py-3 rounded-md bg-surface text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            placeholder={t('contact.message_placeholder') || "Escribe tu mensaje aquí..."}
            rows={5}
            required
            className="w-full px-4 py-3 rounded-md bg-surface text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            {t('contact.send_button') || 'Enviar mensaje'}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-sm ${
              status.isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {status.message}
          </p>
        )}

        <div className="mt-10 text-sm text-muted">
          <p>📞 WhatsApp: +57 302 6404359</p>
          <p>📧 Email: prime@colombiatic.com.co</p>
          <p>📍 Cali, Valle del Cauca, Colombia</p>
        </div>
      </div>
      <Footer />
    </section>
  );
}