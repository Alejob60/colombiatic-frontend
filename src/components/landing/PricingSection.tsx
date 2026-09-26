'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

const getPricingPlans = (locale: string) => {
  if (locale === 'en') {
    return [
      {
        id: 'starter',
        name: 'Starter',
        price: '$29',
        period: 'USD/month',
        description: 'Perfect for starting with basic automation',
        features: [
          'Basic website with AI',
          'Simple chatbot',
          '3 communication channels',
          'Monthly reports',
          'Email support',
          'Up to 100 conversations/month'
        ],
        popular: false,
        cta: 'Start now'
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '$79',
        period: 'USD/month',
        description: 'For growing companies',
        features: [
          'Premium website with Technical DNA',
          'Advanced chatbot with AI',
          'Integration with 8 channels',
          'Commercial automation',
          'Advanced analytics',
          'Priority 24/7 support',
          'Up to 1,000 conversations/month',
          'Brand customization'
        ],
        popular: true,
        cta: 'Activate now'
      },
      {
        id: 'business',
        name: 'Business',
        price: '$149',
        period: 'USD/month',
        description: 'Complete solution for companies',
        features: [
          'Premium website + Technical DNA',
          'Advanced Misybot AI',
          'Unlimited channels',
          'Business automation',
          'E-commerce integration',
          'Custom dashboards',
          'Dedicated 24/7 support',
          'Up to 5,000 conversations/month',
          'Monthly consulting'
        ],
        popular: false,
        cta: 'Activate now'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$299',
        period: 'USD/month',
        description: 'For large organizations',
        features: [
          'Fully customized solution',
          'Specialized AI agents',
          'Unlimited integration',
          'Complete automation',
          'Predictive analytics',
          'Premium dedicated support',
          'Unlimited conversations',
          'Strategic consulting',
          'Guaranteed SLA'
        ],
        popular: false,
        cta: 'Contact sales'
      }
    ];
  }

  return [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: 'USD/mes',
      description: 'Perfecto para empezar con automatización básica',
      features: [
        'Sitio web básico con IA',
        'Chatbot simple',
        '3 canales de comunicación',
        'Informes mensuales',
        'Soporte por email',
        'Hasta 100 conversaciones/mes'
      ],
      popular: false,
      cta: 'Empezar ahora'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$79',
      period: 'USD/mes',
      description: 'Para empresas en crecimiento',
      features: [
        'Sitio web premium con ADN Técnico',
        'Chatbot avanzado con IA',
        'Integración con 8 canales',
        'Automatización comercial',
        'Análisis avanzado',
        'Soporte prioritario 24/7',
        'Hasta 1,000 conversaciones/mes',
        'Personalización de marca'
      ],
      popular: true,
      cta: 'Activar ahora'
    },
    {
      id: 'business',
      name: 'Business',
      price: '$149',
      period: 'USD/mes',
      description: 'Solución completa para empresas',
      features: [
        'Sitio web premium + ADN Técnico',
        'Misybot AI avanzado',
        'Todos los canales ilimitados',
        'Automatización empresarial',
        'Integración e-commerce',
        'Dashboards personalizados',
        'Soporte dedicado 24/7',
        'Hasta 5,000 conversaciones/mes',
        'Consultoría mensual'
      ],
      popular: false,
      cta: 'Activar ahora'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      period: 'USD/mes',
      description: 'Para grandes organizaciones',
      features: [
        'Solución totalmente personalizada',
        'Agentes IA especializados',
        'Integración sin límites',
        'Automatización completa',
        'Analítica predictiva',
        'Soporte premium dedicado',
        'Conversaciones ilimitadas',
        'Consultoría estratégica',
        'SLA garantizado'
      ],
      popular: false,
      cta: 'Contactar ventas'
    }
  ];
};

export default function PricingSection() {
  const { locale } = useLanguage();
  const pricingPlans = getPricingPlans(locale);

  const title = locale === 'es' 
    ? 'Planes y ' 
    : 'Plans and ';
    
  const subtitle = locale === 'es' 
    ? 'Precios' 
    : 'Pricing';
    
  const description = locale === 'es' 
    ? 'Elige el plan perfecto para tu negocio. Todos incluyen nuestra tecnología IA de vanguardia.' 
    : 'Choose the perfect plan for your business. All include our cutting-edge AI technology.';
    
  const contactText = locale === 'es' 
    ? '¿Necesitas un plan personalizado? ' 
    : 'Need a custom plan? ';
    
  const contactLink = locale === 'es' 
    ? 'Contáctanos' 
    : 'Contact us';

  return (
    <section className="py-20 bg-gradient-to-b from-[#0C1116] to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-4">
            {title}
            <span className="text-[#5EA0FF]">
              {subtitle}
            </span>
          </h2>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-[#18181B] to-[#0A0A0A] border-[#5EA0FF] shadow-2xl shadow-[#5EA0FF]/20 scale-105' 
                  : 'bg-[#18181B]/50 backdrop-blur-sm border-[#27272A] hover:border-[#5EA0FF]'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#5EA0FF] text-[#0A0A0A] text-sm font-bold px-4 py-1 rounded-full">
                    {locale === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-[#5EA0FF]' : 'text-[#FFFFFF]'}`}>
                  {plan.name}
                </h3>
                <p className="text-[#A1A1AA] text-sm mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#FFFFFF]">{plan.price}</span>
                  <span className="text-[#A1A1AA]">/{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-[#10B981] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#D4D4D8] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.id === 'enterprise' ? '/contact' : `/checkout/${plan.id}`}
                className={`w-full py-3 text-center font-medium rounded-lg transition-colors block ${
                  plan.popular 
                    ? 'bg-[#5EA0FF] hover:bg-[#3BA5FF] text-[#0A0A0A]' 
                    : 'bg-[#27272A] hover:bg-[#3F3F46] text-[#FFFFFF]'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#A1A1AA]">
            {contactText}
            <Link href="/contact" className="text-[#5EA0FF] hover:text-[#3BA5FF] underline">
              {contactLink}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}