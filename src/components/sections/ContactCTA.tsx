// src/components/sections/ContactCTA.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Check, Send, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactCTA() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.name_required') || "El nombre es requerido";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.email_required') || "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.email_invalid') || "Email inválido";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.message_required') || "El mensaje es requerido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: t('contact.error') || "Error al enviar el formulario. Por favor intente de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-6 bg-surface/50 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 mb-8"
          >
            <Check className="w-12 h-12 text-green-500" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">{t('contact.success_title') || "¡Gracias por tu mensaje!"}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {t('contact.success') || "Hemos recibido tu solicitud y nos pondremos en contacto contigo muy pronto."}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {t('contact.send_another') || "Enviar otro mensaje"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-surface/50 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Fireblocks-style header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('contact.title') || 'Comencemos juntos'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle') || 'Contáctanos para descubrir cómo nuestra IA puede transformar tu negocio'}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Fireblocks-inspired contact information panel */}
          <motion.div
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8">
              {t('contact.info_title') || 'Información de contacto'}
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t('contact.email') || 'Email'}</h4>
                  <p className="text-gray-400">contacto@colombiatic.com.co</p>
                  <p className="text-gray-500 text-sm mt-1">{t('contact.email_desc') || 'Soporte y consultas generales'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t('contact.phone') || 'Teléfono'}</h4>
                  <p className="text-gray-400">+57 300 123 4567</p>
                  <p className="text-gray-500 text-sm mt-1">{t('contact.phone_desc') || 'Línea directa de ventas'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t('contact.address') || 'Dirección'}</h4>
                  <p className="text-gray-400">Bogotá, Colombia</p>
                  <p className="text-gray-500 text-sm mt-1">{t('contact.address_desc') || 'Oficina principal'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-6">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{t('contact.hours') || 'Horario'}</h4>
                  <p className="text-gray-400">{t('contact.hours_value') || 'Lun-Vie: 9AM - 6PM'}</p>
                  <p className="text-gray-500 text-sm mt-1">{t('contact.hours_desc') || 'Horario de atención al cliente'}</p>
                </div>
              </div>
            </div>
            
            {/* Fireblocks-style trust badges */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h4 className="text-lg font-semibold mb-6">{t('contact.why_choose') || '¿Por qué elegirnos?'}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-400 text-sm">{t('contact.benefit1') || 'Implementación rápida'}</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-400 text-sm">{t('contact.benefit2') || 'Soporte 24/7'}</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-400 text-sm">{t('contact.benefit3') || 'Escalable'}</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-400 text-sm">{t('contact.benefit4') || 'ROI garantizado'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fireblocks-style contact form */}
          <motion.div
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8">
              {t('contact.form_title') || 'Envíanos un mensaje'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-surface border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } focus:border-primary focus:outline-none transition-colors`}
                    placeholder={t('contact.form.name_placeholder') || "Tu nombre"}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-surface border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } focus:border-primary focus:outline-none transition-colors`}
                    placeholder={t('contact.form.email_placeholder') || "tu@empresa.com"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {t('contact.form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 focus:border-primary focus:outline-none transition-colors"
                    placeholder={t('contact.form.company_placeholder') || "Nombre de tu empresa"}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-surface border ${
                    errors.message ? "border-red-500" : "border-gray-700"
                  } focus:border-primary focus:outline-none transition-colors`}
                  placeholder={t('contact.form.message_placeholder') || "Cuéntanos sobre tu proyecto o necesidad..."}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              
              {errors.submit && (
                <div className="text-red-500 text-center py-3">
                  {errors.submit}
                </div>
              )}
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex items-center justify-center px-8 py-4 text-white font-medium text-base rounded-lg bg-primary hover:bg-blue-700 transition duration-300 group overflow-hidden shadow-lg hover:shadow-xl disabled:opacity-50 w-full"
                >
                  <span className="absolute inset-0 w-full h-full bg-blue-700 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center opacity-20"></span>
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t('contact.form.sending') || "Enviando..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t('contact.form.send') || 'Enviar mensaje'}
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}