'use client';

import { motion } from 'framer-motion';
import { 
  ShopifyIcon, 
  WooCommerceIcon, 
  MetaIcon, 
  InstagramIcon, 
  WhatsAppIcon, 
  StripeIcon, 
  WompiIcon, 
  GoogleCloudIcon, 
  AWSIcon 
} from '@/components/icons';
import { useLanguage } from '@/hooks/useLanguage';

const getIntegrations = (locale: string) => {
  return [
    { name: 'Shopify', icon: ShopifyIcon },
    { name: 'WooCommerce', icon: WooCommerceIcon },
    { name: 'Meta', icon: MetaIcon },
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'WhatsApp', icon: WhatsAppIcon },
    { name: 'Wompi', icon: WompiIcon },
    { name: 'Google Cloud', icon: GoogleCloudIcon },
    { name: 'AWS', icon: AWSIcon },
  ];
};

export function IntegrationsSection() {
  const { locale } = useLanguage();
  const integrations = getIntegrations(locale);

  const title = locale === 'es' 
    ? 'Integraciones Tecnológicas' 
    : 'Technology Integrations';
    
  const description = locale === 'es' 
    ? 'Conectamos con las principales plataformas para ofrecerte un ecosistema unificado' 
    : 'We connect with the main platforms to offer you a unified ecosystem';

  return (
    <section className="py-20 bg-gradient-to-b from-[#0C1116] to-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-4">
            {title}
          </h2>
          <p className="text-[#A1A1AA] max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 bg-[#18181B]/30 backdrop-blur-sm border border-[#27272A]/50 rounded-xl hover:border-[#5EA0FF]/30 transition-all duration-300 group"
              >
                <div className="mb-4 text-[#A1A1AA] group-hover:text-[#FFFFFF] transition-colors duration-300">
                  <IconComponent className="w-12 h-12" />
                </div>
                <span className="text-sm text-[#A1A1AA] group-hover:text-[#D4D4D8] transition-colors duration-300">
                  {integration.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IntegrationsSection;