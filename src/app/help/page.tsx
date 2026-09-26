// src/app/help/page.tsx
"use client";

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n';

export default function HelpPage() {
  const { t } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // FAQs de ejemplo
  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo registrarme en la plataforma?",
      answer: "Puede registrarse haciendo clic en el botón 'Registrarse' en la esquina superior derecha de la página de inicio. Complete el formulario con su información y verifique su correo electrónico."
    },
    {
      id: 2,
      question: "¿Cuánto cuesta el servicio de IA Omnicanal?",
      answer: "El servicio de IA Omnicanal cuesta COP $159.000 mensuales. Incluye conexión con WhatsApp, Instagram y otros canales, además de un CRM automatizado."
    },
    {
      id: 3,
      question: "¿Puedo cancelar mi suscripción en cualquier momento?",
      answer: "Sí, puede cancelar su suscripción en cualquier momento desde la sección de configuración de su cuenta. No hay penalidades por cancelación."
    },
    {
      id: 4,
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos pagos a través de tarjetas de crédito, débito y transferencias bancarias mediante nuestra pasarela segura Wompi."
    },
    {
      id: 5,
      question: "¿Cómo puedo contactar al soporte técnico?",
      answer: "Puede contactar a nuestro soporte técnico a través del formulario de contacto en esta página, o enviando un correo a soporte@colombiatic.com."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En una implementación real:
      // const response = await fetch('/api/support/ticket', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ name, email, subject, message })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Error al enviar el mensaje');
      // }
      
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">{t('help.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección de FAQs */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">{t('help.faq')}</h2>
            
            {/* Buscador de FAQs */}
            <div className="mb-6">
              <input
                type="text"
                placeholder={t('help.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            {/* Lista de FAQs */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-surface rounded-lg shadow-md p-5">
                    <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <div className="bg-surface rounded-lg shadow-md p-5 text-center">
                  <p className="text-gray-300">No se encontraron resultados para "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">{t('help.contact')}</h2>
            
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            
            {success && (
              <div className="mb-4 rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">Mensaje enviado correctamente. Nos pondremos en contacto pronto.</div>
              </div>
            )}
            
            <div className="bg-surface rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('help.contactForm.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('help.contactForm.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('help.contactForm.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('help.contactForm.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : t('help.contactForm.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}