// src/lib/i18n.ts
import { usePathname } from 'next/navigation';

// Definir tipos para las traducciones
interface Translations {
  [key: string]: string | Translations;
}

// Definir las traducciones disponibles
const translations: Record<string, Translations> = {
  es: {
    // Navbar
    navbar: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Acerca de',
      contact: 'Contacto',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      dashboard: 'Panel de control',
      profile: 'Perfil',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
      capabilities: 'Capacidades',
      sectors: 'Sectores',
      traction: 'Trayectoria',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú'
    },

    language: {
      switchLabel: 'Idioma'
    },

    chat: {
      title: 'Asistente IA ColombiaTIC',
      statusOnline: 'En línea',
      open: 'Abrir asistente',
      close: 'Cerrar asistente',
      minimize: 'Minimizar asistente',
      greeting: '¡Hola! Soy tu asistente IA de ColombiaTIC',
      greetingHint: 'Puedo ayudarte a crear videos, programar publicaciones, analizar tendencias y mucho más.',
      placeholder: 'Escribe tu mensaje...',
      loading: 'Cargando asistente...',
      initializing: 'Inicializando asistente…',
      fallback: 'El asistente no está disponible en este momento.',
      clearChat: 'Limpiar chat',
      errorConnection: 'Error de conexión',
      errorConnectionBody: 'No se pudo conectar con el servicio de IA. Por favor, verifica tu conexión a internet e inténtalo nuevamente.',
      retry: 'Reintentar',
    },

    landing: {
      hero: {
        badge: 'Sistemas autónomos de próxima generación',
        badgeSecondary: 'Desde Colombia para el mundo',
        title: 'Inteligencia Artificial Autónoma para Operaciones Reales',
        clause1: 'Automatizamos lo repetitivo.',
        clause2: 'Resolvemos lo complejo.',
        clause3: 'Optimizamos lo costoso.',
        body: 'Desplegamos ecosistemas de agentes autónomos que transforman procesos manuales en operaciones medibles. Con cumplimiento normativo verificado en tiempo real y una arquitectura soberana que se integra sin fricción a tu infraestructura actual, sin depender de cajas negras externas.',
        ctaPrimary: 'Solicitar Evaluación Técnica',
        ctaSecondary: 'Explorar el Ecosistema',
        slideOf: 'de',
        slides: {
          government: {
            label: 'Gobierno',
            product: 'Orbital Prime (GovDocs)',
            description: 'Sistemas autónomos de procesamiento documental y cumplimiento normativo para el sector público.'
          },
          commerce: {
            label: 'Comercio / Enterprise',
            product: 'Misybot MetaOS',
            description: 'Orquestación de 7+ agentes de IA descentralizados. Automatización de marketing y operaciones a ~$0.08 USD por campaña.'
          },
          edge: {
            label: 'Innovación / Edge',
            product: 'Twin AI',
            description: 'Memory OS wearable con arquitectura zero-knowledge y privacidad radical. IA que evoluciona con el usuario.'
          },
          legal: {
            label: 'LegalTech',
            product: 'Cali-Lex Advisor',
            description: 'Agente jurídico en Vertex AI con verificación de normativa colombiana (Ley 1755/2015, CPACA) en tiempo real.'
          }
        }
      },
      stickyCta: {
        dismiss: 'Cerrar'
      },
      partners: {
        title: 'Programas y aceleradoras en las que participamos',
        tickerLabel: 'Somos parte de'
      },
      ecosystem: {
        badge: 'Un Holding de Innovación en Deep Tech',
        title: '¿Qué es ColombiaTIC AI Ecosystem?',
        description: 'No somos solo una agencia. Somos un ecosistema unificado de productos y plataformas de IA con infraestructura multi-cloud (GCP, Azure, Alibaba), diseñados para resolver problemas complejos de escala, privacidad y automatización en Latinoamérica.',
        pillars: {
          scalable: {
            title: 'Arquitectura Escalable',
            description: 'Despliegues 100% en producción con SLA 99.99% y microservicios en Cloud Run.'
          },
          privacy: {
            title: 'Privacidad Radical',
            description: 'Cifrado end-to-end y arquitecturas zero-knowledge en nuestros productos de datos sensibles (Twin AI, Cali-Lex).'
          },
          efficiency: {
            title: 'Eficiencia Comprobada',
            description: 'Reducción de costos operativos hasta en un 80% mediante orquestación multi-modelo (GPT-4, Vertex, Qwen, Llama, Claude).'
          }
        }
      },
      capabilities: {
        badge: 'Capacidades Tecnológicas Proprietarias',
        subtitle: 'Tecnología propia que convierte operaciones manuales en flujos autónomos, medibles y auditables.',
        title: 'Capacidades del Ecosistema',
        resultLabel: 'Resultado',
        misybot: {
          title: 'Orquestación de Meta-Agentes',
          product: 'Misybot',
          description: 'Flujos autónomos de investigación, generación de contenido (texto/imagen/video) y distribución omnicanal.',
          stack: 'GCP Cloud Run, 7 agentes especializados, GPT-4, Qwen, Claude',
          result: 'Costo operativo de ~$0.08 USD por campaña completa con 7 agentes especializados (Trend Hunter, Copy Alchemist, The Critic, etc.).'
        },
        legal: {
          title: 'IA Soberana y LegalTech',
          product: 'Cali-Lex & Orbital Prime',
          description: 'Procesamiento de lenguaje natural aplicado a normativa colombiana y gestión documental gubernamental.',
          stack: 'Vertex AI, RAG, Ley 1755/2015, CPACA',
          result: 'Verificación de borradores, detección de riesgo de tutela y generación de watermark jurídico automatizado.'
        },
        twin: {
          title: 'Memory OS y Edge AI',
          product: 'Twin AI',
          description: 'Dispositivos y sistemas que capturan selectivamente momentos valiosos con procesamiento local y sincronización segura.',
          stack: 'Edge AI, Zero-knowledge, Cifrado E2E, Wearables',
          result: 'Experiencias hiperpersonalizadas sin comprometer la privacidad del usuario (enfoque human-first).'
        },
        adn: {
          title: 'Plataformas Digitales Autónomas',
          product: 'ADN Web + E-Commerce IA',
          description: 'Sitios y tiendas virtuales (Shopify/WooCommerce) potenciados con motores de recomendación y analítica predictiva.',
          stack: 'Shopify, WooCommerce, RAG, Analítica predictiva',
          result: 'Mayor visibilidad, tráfico cualificado y aumento del carrito promedio mediante IA.'
        }
      },
      sectors: {
        badge: 'Sectores de alto impacto',
        title: 'Soluciones por Sector',
        subtitle: 'Arquitecturas pensadas para la realidad operativa de cada industria',
        government: {
          title: 'Para Gobierno y Sector Público',
          icon: 'gov',
          items: {
            intake: 'Digitalización autónoma de radicación y PQRSD.',
            compliance: 'Cumplimiento normativo automatizado (CPACA, Ley de Transparencia).',
            sovereignty: 'Implementación segura con soberanía de datos.'
          }
        },
        business: {
          title: 'Para Empresas y Comercio (B2B/B2C)',
          icon: 'business',
          items: {
            funnels: 'Automatización de embudos de venta y atención 24/7.',
            dashboards: 'Dashboards empresariales con analítica avanzada y predicción de churn.',
            omnichannel: 'Integración omnicanal (WhatsApp, IG, Web, Email, SMS) con memoria contextual del cliente.'
          }
        },
        creators: {
          title: 'Para Creadores y Artistas (Creator Economy)',
          icon: 'creators',
          items: {
            experiences: 'Experiencias personalizadas para fans (Web IA, Chatbots con personalidad de marca).',
            monetization: 'Segmentación inteligente de audiencia y monetización de comunidad.'
          }
        }
      },
      traction: {
        badge: 'Métricas verificadas',
        title: 'Tracción y Casos de Éxito',
        subtitle: 'Métricas concretas de despliegues en producción',
        cost: {
          label: 'Optimización de Costos',
          value: '~$0.08 USD',
          description: 'Reducción a ~$0.08 USD por campaña de marketing automatizada completa (Misybot en GCP).'
        },
        efficiency: {
          label: 'Eficiencia Operativa',
          value: '-70%',
          description: 'Reducción en tiempo de atención y gestión de documentos en pilotos de sector público y consultoría.'
        },
        conversion: {
          label: 'Conversión E-commerce',
          value: '+65%',
          description: 'En recuperación de carrito abandonado mediante agentes de IA proactivos.'
        },
        architecture: {
          label: 'Arquitectura',
          value: '200 OK',
          description: '100% de los agentes centrales respondiendo 200 OK en endpoints de salud, con orquestador CPU Always-On.'
        }
      },
      phases: {
        badge: 'Ruta de implementación',
        title: 'Modelo de Implementación',
        subtitle: 'De la Prueba de Concepto a la Escala Enterprise',
        phase1: {
          label: 'Fase 1',
          title: 'Diagnóstico y MVP Ágil',
          timing: '48-72 hrs',
          description: 'Validación de demanda con campañas manuales o prototipos funcionales de bajo costo. Ideal para startups y PYMES.'
        },
        phase2: {
          label: 'Fase 2',
          title: 'Integración y Automatización',
          timing: 'Semanas 2-4',
          description: 'Despliegue de agentes en infraestructura cloud, conexión con APIs existentes (Shopify, CRM, Bases de Datos).'
        },
        phase3: {
          label: 'Fase 3',
          title: 'Escalamiento Enterprise',
          timing: 'Mes 2+',
          description: 'Arquitectura multi-cloud de alta disponibilidad, fine-tuning de modelos propietarios y soporte ejecutivo dedicado.'
        }
      },
      contact: {
        badge: 'Hablemos',
        title: 'Activa tu Ecosistema IA con una Evaluación Técnica',
        subtitle: 'Descubre cómo nuestra plataforma puede transformar tu operación en semanas, no en meses.',
        nameLabel: 'Nombre completo',
        emailLabel: 'Email corporativo',
        companyLabel: 'Empresa / Entidad',
        roleLabel: 'Cargo',
        challengeLabel: '¿Qué desafío operativo o de escala buscas resolver con IA?',
        challengeHint: 'Cuéntanos brevemente sobre tu proceso actual',
        interestLabel: 'Me interesa',
        interests: {
          government: 'Soluciones para Gobierno (GovTech)',
          business: 'Soluciones para Comercio / Enterprise',
          investment: 'Alianzas e inversión'
        },
        submit: 'Solicitar Evaluación Técnica y Cotización',
        submitting: 'Enviando...',
        sendAnother: 'Enviar otra solicitud',
        footnote: 'Al enviar este formulario, recibirás una copia en tu correo y una notificación directa a nuestro equipo de arquitectura en enterprise@colombiatic.com.co',
        successTitle: 'Solicitud recibida',
        successBody: 'Nuestro equipo de arquitectura se pondrá en contacto contigo en menos de 48 horas hábiles.',
        errorTitle: 'No pudimos enviar la solicitud',
        errorBody: 'Revisa los campos marcados e inténtalo de nuevo.',
        rateLimited: 'Has enviado demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.',
        deliveryFailed: 'No pudimos registrar tu solicitud en este momento. Escríbenos directamente a enterprise@colombiatic.com.co',
        errors: {
          name: 'El nombre es requerido',
          email: 'El email es requerido',
          emailInvalid: 'Ingresa un email corporativo válido',
          company: 'La empresa es requerida',
          role: 'El cargo es requerido',
          challenge: 'Cuéntanos brevemente tu desafío'
        }
      },
      footer: {
        tagline: 'Transformando industrias con sistemas autónomos e inteligencia artificial de vanguardia.',
        location: 'Bogotá, Colombia',
        emailLabel: 'Email',
        ecosystemLabel: 'Ecosistema',
        ecosystem: 'Misybot | Twin AI | Cali-Lex | Orbital Prime | ReefKey | Saar',
        alliancesLabel: 'Alianzas',
        alliances: 'NVIDIA Inception · Google for Startups · Microsoft for Startups · Alibaba Cloud',
        nvidiaInceptionBadge: 'NVIDIA Inception Program',
        legalLabel: 'Legal',
        legalTerms: 'Términos de Uso',
        legalPrivacy: 'Política de Privacidad (Zero-Knowledge Commitment)',
        legalCookies: 'Política de Cookies',
        copyright: '© {year} ColombiaTIC Ingeniería SAS. Todos los derechos reservados.'
      },
      legal: {
        terms: {
          title: 'Términos de Uso',
          updated: 'Última actualización',
          intro: 'Estos términos regulan el uso del sitio web y de los servicios de ColombiaTIC Ingeniería SAS.',
          sections: {
            scope: { title: 'Objeto', body: 'Al navegar este sitio aceptas estos términos. Si no los aceptas, por favor no utilices el servicio.' },
            services: { title: 'Servicios', body: 'Prestamos sistemas autónomos de inteligencia artificial. El alcance, el precio y los plazos de cada contrato se definen en la propuesta comercial firmada.' },
            ip: { title: 'Propiedad intelectual', body: 'Todos los derechos sobre el software, los modelos y la documentación son de ColombiaTIC Ingeniería SAS. ColombiaTIC no transfiere la titularidad de los componentes de terceros que integra.' },
            liability: { title: 'Responsabilidad', body: 'Trabajamos con esmero pero no garantizamos resultados comerciales específicos. Nuestra responsabilidad se limita al valor del servicio contratado en el periodo de facturación.' },
            law: { title: 'Legislación aplicable', body: 'Estos términos se rigen por la legislación colombiana. Cualquier controversia se somete a los jueces de Bogotá D.C.' }
          }
        },
        privacy: {
          title: 'Política de Privacidad',
          updated: 'Última actualización',
          intro: 'Compromiso Zero-Knowledge: minimizamos la recolección de datos y aplicamos cifrado end-to-end en nuestros productos de datos sensibles.',
          sections: {
            collect: { title: 'Datos que recolectamos', body: 'Datos de contacto corporativos que nos proporcionas voluntariamente y datos técnicos mínimos de navegación. No vendemos ni cedemos datos personales a terceros.' },
            purpose: { title: 'Finalidad', body: 'Usamos la información únicamente para responder tus solicitudes, prestar el servicio contratado y cumplir obligaciones legales.' },
            rights: { title: 'Tus derechos', body: 'Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a enterprise@colombiatic.com.co. Respondemos dentro de los plazos legales.' },
            retention: { title: 'Retención', body: 'Conservamos la información mientras exista una relación comercial o una obligación legal que lo justifique.' },
            security: { title: 'Seguridad', body: 'Aplicamos cifrado en tránsito y en reposo, control de acceso por mínimo privilegio y auditoría de accesos.' }
          }
        },
        cookies: {
          title: 'Política de Cookies',
          updated: 'Última actualización',
          intro: 'Usamos cookies técnicas necesarias para el funcionamiento del sitio. No las utilizamos para perfilado publicitario.',
          sections: {
            essential: { title: 'Cookies técnicas', body: 'Necesarias para mantener la sesión, recordar tu idioma preferido y garantizar la seguridad. No requieren consentimiento.' },
            analytics: { title: 'Analítica', body: 'Las activamos solo con tu consentimiento y nos permiten entender cómo se usa el sitio de forma agregada.' },
            manage: { title: 'Cómo gestionarlas', body: 'Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. El sitio seguirá funcionando en su modo esencial.' }
          }
        }
      }
    },
    
    // Página de inicio
    home: {
      hero: {
        title: 'Transforma tu negocio con IA',
        subtitle: 'Soluciones digitales avanzadas para pymes colombianas',
        cta: 'Comenzar ahora'
      },
      howItWorks: {
        title: '¿Cómo funciona?',
        step1: 'Registra tu negocio',
        step2: 'Configura tus canales',
        step3: 'Activa la IA',
        step4: 'Monitorea resultados',
        step5: 'Escala tu negocio'
      },
      products: {
        title: 'Nuestros Productos Estrella',
        iaOmnichannel: {
          title: 'IA Omnicanal + CRM Automatizado',
          description: 'Conecta todos tus canales de comunicación y automatiza tus ventas con inteligencia artificial.',
          price: 'COP $159.000 / mes'
        },
        webCommercial: {
          title: 'Sitio Web Comercial con SEO + IA Humanizada de Ventas',
          description: 'Sitio web optimizado para conversiones con asistente de ventas basado en IA.',
          price: 'COP $899.000 pago único'
        }
      },
      modules: {
        title: 'Módulos Adicionales',
        refactorPro: 'Refactor Pro Web',
        consulting: 'Consultoría Estratégica',
        socialMedia: 'Módulo de Redes y Contenidos',
        automation: 'Automatización Avanzada',
        analytics: 'Dashboard Analítico Comercial'
      }
    },
    
    // Página de autenticación
    auth: {
      login: {
        title: 'Inicia sesión en tu cuenta',
        email: 'Correo electrónico',
        password: 'Contraseña',
        rememberMe: 'Recuérdame',
        forgotPassword: '¿Olvidaste tu contraseña?',
        loginButton: 'Iniciar sesión',
        noAccount: '¿No tienes cuenta?',
        registerLink: 'Regístrate aquí'
      },
      register: {
        title: 'Crea tu cuenta',
        name: 'Nombre completo',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        terms: 'Acepto los términos y condiciones',
        registerButton: 'Registrarse',
        haveAccount: '¿Ya tienes cuenta?',
        loginLink: 'Inicia sesión aquí'
      }
    },
    
    // Dashboard
    dashboard: {
      title: 'Panel de Control',
      welcome: 'Bienvenido de vuelta',
      quickStats: 'Estadísticas Rápidas',
      activeServices: 'Servicios Activos',
      recentActivity: 'Actividad Reciente',
      viewAll: 'Ver todos'
    },
    
    // Perfil de usuario
    profile: {
      title: 'Perfil de Usuario',
      editProfile: 'Editar Perfil',
      name: 'Nombre',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      company: 'Empresa',
      saveChanges: 'Guardar Cambios',
      cancel: 'Cancelar'
    },
    
    // Configuración
    settings: {
      title: 'Configuración de Cuenta',
      security: 'Seguridad',
      notifications: 'Notificaciones',
      theme: 'Tema',
      language: 'Idioma',
      changePassword: 'Cambiar Contraseña',
      currentPassword: 'Contraseña Actual',
      newPassword: 'Nueva Contraseña',
      confirmNewPassword: 'Confirmar Nueva Contraseña',
      saveChanges: 'Guardar Cambios'
    },
    
    // Preferencias
    preferences: {
      theme: {
        light: 'Claro',
        dark: 'Oscuro'
      },
      notifications: {
        email: 'Notificaciones por correo',
        push: 'Notificaciones push',
        sms: 'Notificaciones SMS'
      }
    },
    
    // Ayuda y soporte
    help: {
      title: 'Ayuda y Soporte',
      faq: 'Preguntas Frecuentes',
      contact: 'Contacto',
      searchPlaceholder: 'Buscar en ayuda...',
      contactForm: {
        title: 'Formulario de Contacto',
        name: 'Nombre',
        email: 'Correo Electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje'
      }
    }
  },
  
  en: {
    // Navbar
    navbar: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      capabilities: 'Capabilities',
      sectors: 'Sectors',
      traction: 'Traction',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },

    language: {
      switchLabel: 'Language'
    },

    chat: {
      title: 'ColombiaTIC AI Assistant',
      statusOnline: 'Online',
      open: 'Open assistant',
      close: 'Close assistant',
      minimize: 'Minimize assistant',
      greeting: 'Hi! I am your ColombiaTIC AI assistant',
      greetingHint: 'I can help you create videos, schedule posts, analyse trends and much more.',
      placeholder: 'Type your message...',
      loading: 'Loading assistant...',
      initializing: 'Initialising assistant…',
      fallback: 'The assistant is not available at the moment.',
      clearChat: 'Clear chat',
      errorConnection: 'Connection error',
      errorConnectionBody: 'We could not reach the AI service. Please check your internet connection and try again.',
      retry: 'Try again',
    },

    landing: {
      hero: {
        badge: 'Next-gen autonomous systems',
        badgeSecondary: 'From Colombia to the world',
        title: 'Autonomous Artificial Intelligence for Real Operations',
        clause1: 'We automate the repetitive.',
        clause2: 'We solve the complex.',
        clause3: 'We optimise the costly.',
        body: 'We deploy ecosystems of autonomous agents that turn manual processes into measurable operations. With regulatory compliance verified in real time and a sovereign architecture that integrates into your current infrastructure without friction — no black boxes.',
        ctaPrimary: 'Request Technical Assessment',
        ctaSecondary: 'Explore the Ecosystem',
        slideOf: 'of',
        slides: {
          government: {
            label: 'Government',
            product: 'Orbital Prime (GovDocs)',
            description: 'Autonomous document processing and regulatory compliance systems for the public sector.'
          },
          commerce: {
            label: 'Commerce / Enterprise',
            product: 'Misybot MetaOS',
            description: 'Orchestration of 7+ decentralised AI agents. Marketing and operations automation at roughly $0.08 USD per campaign.'
          },
          edge: {
            label: 'Innovation / Edge',
            product: 'Twin AI',
            description: 'A wearable Memory OS built on zero-knowledge architecture and radical privacy. AI that evolves with the user.'
          },
          legal: {
            label: 'LegalTech',
            product: 'Cali-Lex Advisor',
            description: 'A legal agent on Vertex AI with real-time verification of Colombian regulations (Law 1755/2015, CPACA).'
          }
        }
      },
      stickyCta: {
        dismiss: 'Close'
      },
      partners: {
        title: 'Programs and accelerators we take part in',
        tickerLabel: 'We are part of'
      },
      ecosystem: {
        badge: 'A Deep Tech Innovation Holding',
        title: 'What is the ColombiaTIC AI Ecosystem?',
        description: 'We are not just an agency. We are a unified ecosystem of AI products and platforms running multi-cloud infrastructure (GCP, Azure, Alibaba), designed to solve hard problems of scale, privacy and automation across Latin America.',
        pillars: {
          scalable: {
            title: 'Scalable Architecture',
            description: '100% production deployments with a 99.99% SLA and microservices on Cloud Run.'
          },
          privacy: {
            title: 'Radical Privacy',
            description: 'End-to-end encryption and zero-knowledge architectures across our sensitive-data products (Twin AI, Cali-Lex).'
          },
          efficiency: {
            title: 'Proven Efficiency',
            description: 'Up to 80% reduction in operating costs through multi-model orchestration (GPT-4, Vertex, Qwen, Llama, Claude).'
          }
        }
      },
      capabilities: {
        badge: 'Proprietary Technology Capabilities',
        subtitle: 'Proprietary technology that turns manual operations into autonomous, measurable and auditable workflows.',
        title: 'Ecosystem Capabilities',
        resultLabel: 'Outcome',
        misybot: {
          title: 'Meta-Agent Orchestration',
          product: 'Misybot',
          description: 'Autonomous research, content generation (text, image, video) and omnichannel distribution workflows.',
          stack: 'GCP Cloud Run, 7 specialised agents, GPT-4, Qwen, Claude',
          result: 'Operating cost of roughly $0.08 USD per complete campaign with 7 specialised agents (Trend Hunter, Copy Alchemist, The Critic, and more).'
        },
        legal: {
          title: 'Sovereign AI and LegalTech',
          product: 'Cali-Lex & Orbital Prime',
          description: 'Natural language processing applied to Colombian regulations and government document management.',
          stack: 'Vertex AI, RAG, Law 1755/2015, CPACA',
          result: 'Draft verification, tutela risk detection and automated legal watermark generation.'
        },
        twin: {
          title: 'Memory OS and Edge AI',
          product: 'Twin AI',
          description: 'Devices and systems that selectively capture valuable moments with local processing and secure synchronisation.',
          stack: 'Edge AI, Zero-knowledge, E2E encryption, Wearables',
          result: 'Hyper-personalised experiences without compromising user privacy (a human-first approach).'
        },
        adn: {
          title: 'Autonomous Digital Platforms',
          product: 'ADN Web + AI E-commerce',
          description: 'Websites and online stores (Shopify/WooCommerce) powered by recommendation engines and predictive analytics.',
          stack: 'Shopify, WooCommerce, RAG, Predictive analytics',
          result: 'Higher visibility, qualified traffic and increased average order value through AI.'
        }
      },
      sectors: {
        badge: 'High-impact sectors',
        title: 'Solutions by Sector',
        subtitle: 'Architectures designed around the real operating conditions of each industry',
        government: {
          title: 'For Government and the Public Sector',
          icon: 'gov',
          items: {
            intake: 'Autonomous digitisation of filings and PQRSD requests.',
            compliance: 'Automated regulatory compliance (CPACA, Transparency Law).',
            sovereignty: 'Secure implementation with data sovereignty.'
          }
        },
        business: {
          title: 'For Business and Commerce (B2B/B2C)',
          icon: 'business',
          items: {
            funnels: 'Sales funnel automation and 24/7 customer service.',
            dashboards: 'Business dashboards with advanced analytics and churn prediction.',
            omnichannel: 'Omnichannel integration (WhatsApp, Instagram, Web, Email, SMS) with contextual customer memory.'
          }
        },
        creators: {
          title: 'For Creators and Artists (Creator Economy)',
          icon: 'creators',
          items: {
            experiences: 'Personalised fan experiences (AI web, chatbots with brand personality).',
            monetization: 'Intelligent audience segmentation and community monetisation.'
          }
        }
      },
      traction: {
        badge: 'Verified metrics',
        title: 'Traction and Success Stories',
        subtitle: 'Concrete numbers from production deployments',
        cost: {
          label: 'Cost Optimisation',
          value: '~$0.08 USD',
          description: 'Reduced to roughly $0.08 USD per fully automated marketing campaign (Misybot on GCP).'
        },
        efficiency: {
          label: 'Operational Efficiency',
          value: '-70%',
          description: 'Reduction in attention and document handling time across public sector and consulting pilots.'
        },
        conversion: {
          label: 'E-commerce Conversion',
          value: '+65%',
          description: 'In abandoned cart recovery through proactive AI agents.'
        },
        architecture: {
          label: 'Architecture',
          value: '200 OK',
          description: '100% of core agents returning 200 OK on health endpoints, with an always-on CPU orchestrator.'
        }
      },
      phases: {
        badge: 'Implementation path',
        title: 'Implementation Model',
        subtitle: 'From Proof of Concept to Enterprise Scale',
        phase1: {
          label: 'Phase 1',
          title: 'Diagnosis and Agile MVP',
          timing: '48-72 hrs',
          description: 'Demand validation with manual campaigns or low-cost functional prototypes. Ideal for startups and SMEs.'
        },
        phase2: {
          label: 'Phase 2',
          title: 'Integration and Automation',
          timing: 'Weeks 2-4',
          description: 'Agent deployment on cloud infrastructure, connecting to existing APIs (Shopify, CRM, databases).'
        },
        phase3: {
          label: 'Phase 3',
          title: 'Enterprise Scaling',
          timing: 'Month 2+',
          description: 'High-availability multi-cloud architecture, fine-tuning of proprietary models and dedicated executive support.'
        }
      },
      contact: {
        badge: "Let's talk",
        title: 'Activate your AI Ecosystem with a Technical Assessment',
        subtitle: 'See how our platform can transform your operation in weeks, not months.',
        nameLabel: 'Full name',
        emailLabel: 'Corporate email',
        companyLabel: 'Company / Entity',
        roleLabel: 'Role',
        challengeLabel: 'What operational or scaling challenge are you looking to solve with AI?',
        challengeHint: 'Tell us briefly about your current process',
        interestLabel: 'I am interested in',
        interests: {
          government: 'Government solutions (GovTech)',
          business: 'Business / Enterprise solutions',
          investment: 'Partnerships and investment'
        },
        submit: 'Request Technical Assessment and Quote',
        submitting: 'Sending...',
        sendAnother: 'Send another request',
        footnote: 'On submission you will receive a copy by email and a direct notification to our architecture team at enterprise@colombiatic.com.co',
        successTitle: 'Request received',
        successBody: 'Our architecture team will get in touch within 48 business hours.',
        errorTitle: 'We could not send your request',
        errorBody: 'Please review the highlighted fields and try again.',
        rateLimited: 'You have sent too many requests. Please wait a few minutes and try again.',
        deliveryFailed: 'We could not register your request right now. Please email us directly at enterprise@colombiatic.com.co',
        errors: {
          name: 'Name is required',
          email: 'Email is required',
          emailInvalid: 'Enter a valid corporate email',
          company: 'Company is required',
          role: 'Role is required',
          challenge: 'Tell us briefly about your challenge'
        }
      },
      footer: {
        tagline: 'Transforming industries with autonomous systems and cutting-edge artificial intelligence.',
        location: 'Bogota, Colombia',
        emailLabel: 'Email',
        ecosystemLabel: 'Ecosystem',
        ecosystem: 'Misybot | Twin AI | Cali-Lex | Orbital Prime | ReefKey | Saar',
        alliancesLabel: 'Alliances',
        alliances: 'NVIDIA Inception · Google for Startups · Microsoft for Startups · Alibaba Cloud',
        nvidiaInceptionBadge: 'NVIDIA Inception Program',
        legalLabel: 'Legal',
        legalTerms: 'Terms of Use',
        legalPrivacy: 'Privacy Policy (Zero-Knowledge Commitment)',
        legalCookies: 'Cookie Policy',
        copyright: '© {year} ColombiaTIC Engineering SAS. All rights reserved.'
      },
      legal: {
        terms: {
          title: 'Terms of Use',
          updated: 'Last updated',
          intro: 'These terms govern the use of this website and the services provided by ColombiaTIC Engineering SAS.',
          sections: {
            scope: { title: 'Scope', body: 'By browsing this site you accept these terms. If you do not accept them, please do not use the service.' },
            services: { title: 'Services', body: 'We provide autonomous artificial intelligence systems. The scope, price and timeline of each engagement are defined in the signed commercial proposal.' },
            ip: { title: 'Intellectual property', body: 'All rights to the software, models and documentation belong to ColombiaTIC Engineering SAS. ColombiaTIC does not transfer ownership of third-party components it integrates.' },
            liability: { title: 'Liability', body: 'We work diligently but do not guarantee specific commercial outcomes. Our liability is limited to the value of the service contracted in the billing period.' },
            law: { title: 'Governing law', body: 'These terms are governed by Colombian law. Any dispute is submitted to the courts of Bogota D.C.' }
          }
        },
        privacy: {
          title: 'Privacy Policy',
          updated: 'Last updated',
          intro: 'Zero-Knowledge commitment: we minimise data collection and apply end-to-end encryption across our sensitive-data products.',
          sections: {
            collect: { title: 'Data we collect', body: 'Corporate contact details you provide voluntarily, plus minimal technical browsing data. We do not sell or share personal data with third parties.' },
            purpose: { title: 'Purpose', body: 'We use your information only to answer your enquiries, deliver the contracted service and meet legal obligations.' },
            rights: { title: 'Your rights', body: 'You can request access, correction or deletion of your data by writing to enterprise@colombiatic.com.co. We respond within statutory deadlines.' },
            retention: { title: 'Retention', body: 'We keep information for as long as a commercial relationship or a legal obligation justifies it.' },
            security: { title: 'Security', body: 'We apply encryption in transit and at rest, least-privilege access control and access auditing.' }
          }
        },
        cookies: {
          title: 'Cookie Policy',
          updated: 'Last updated',
          intro: 'We use strictly necessary cookies to operate the site. We do not use them for advertising profiling.',
          sections: {
            essential: { title: 'Essential cookies', body: 'Required to maintain your session, remember your language preference and guarantee security. They do not require consent.' },
            analytics: { title: 'Analytics', body: 'We enable these only with your consent, and they let us understand how the site is used in aggregate.' },
            manage: { title: 'How to manage them', body: 'You can block or delete cookies from your browser settings. The site will keep working in essential-only mode.' }
          }
        }
      }
    },
    
    // Home page
    home: {
      hero: {
        title: 'Transform Your Business with AI',
        subtitle: 'Advanced digital solutions for Colombian SMEs',
        cta: 'Get Started Now'
      },
      howItWorks: {
        title: 'How It Works',
        step1: 'Register Your Business',
        step2: 'Set Up Your Channels',
        step3: 'Activate AI',
        step4: 'Monitor Results',
        step5: 'Scale Your Business'
      },
      products: {
        title: 'Our Star Products',
        iaOmnichannel: {
          title: 'Omnichannel AI + Automated CRM',
          description: 'Connect all your communication channels and automate your sales with artificial intelligence.',
          price: 'COP $159,000 / month'
        },
        webCommercial: {
          title: 'Commercial Website with SEO + Humanized Sales AI',
          description: 'Conversion-optimized website with AI-based sales assistant.',
          price: 'COP $899,000 one-time'
        }
      },
      modules: {
        title: 'Additional Modules',
        refactorPro: 'Refactor Pro Web',
        consulting: 'Strategic Consulting',
        socialMedia: 'Social Media & Content Module',
        automation: 'Advanced Automation',
        analytics: 'Commercial Analytics Dashboard'
      }
    },
    
    // Authentication page
    auth: {
      login: {
        title: 'Sign in to your account',
        email: 'Email address',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        loginButton: 'Sign in',
        noAccount: "Don't have an account?",
        registerLink: 'Register here'
      },
      register: {
        title: 'Create your account',
        name: 'Full name',
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm password',
        terms: 'I accept the terms and conditions',
        registerButton: 'Register',
        haveAccount: 'Already have an account?',
        loginLink: 'Sign in here'
      }
    },
    
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      quickStats: 'Quick Stats',
      activeServices: 'Active Services',
      recentActivity: 'Recent Activity',
      viewAll: 'View all'
    },
    
    // User Profile
    profile: {
      title: 'User Profile',
      editProfile: 'Edit Profile',
      name: 'Name',
      email: 'Email Address',
      phone: 'Phone',
      company: 'Company',
      saveChanges: 'Save Changes',
      cancel: 'Cancel'
    },
    
    // Settings
    settings: {
      title: 'Account Settings',
      security: 'Security',
      notifications: 'Notifications',
      theme: 'Theme',
      language: 'Language',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      saveChanges: 'Save Changes'
    },
    
    // Preferences
    preferences: {
      theme: {
        light: 'Light',
        dark: 'Dark'
      },
      notifications: {
        email: 'Email notifications',
        push: 'Push notifications',
        sms: 'SMS notifications'
      }
    },
    
    // Help and Support
    help: {
      title: 'Help and Support',
      faq: 'Frequently Asked Questions',
      contact: 'Contact',
      searchPlaceholder: 'Search help...',
      contactForm: {
        title: 'Contact Form',
        name: 'Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      }
    }
  }
};

// Función para obtener las traducciones según el idioma
export const getTranslations = (locale: string = 'es'): Translations => {
  return translations[locale] || translations.es;
};

// Hook personalizado para usar las traducciones
export const useTranslations = () => {
  // En App Router, obtenemos el locale del pathname
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'es';

  const t = (key: string, vars?: string | Record<string, string | number>): string => {
    const keys = key.split('.');
    let translation: string | Translations = translations[locale] || translations.es;

    for (const k of keys) {
      if (typeof translation === 'object' && translation !== null && k in translation) {
        translation = (translation as Translations)[k];
      } else {
        return typeof vars === 'string' ? vars : key;
      }
    }

    if (typeof translation !== 'string') {
      return typeof vars === 'string' ? vars : key;
    }

    if (vars === undefined) return translation;
    if (typeof vars === 'string') return vars;

    return translation.replace(/\{(\w+)\}/g, (match, token: string) => {
      const value = vars[token];
      return value === undefined ? match : String(value);
    });
  };

  return { t, locale };
};