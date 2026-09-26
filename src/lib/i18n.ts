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
      logout: 'Cerrar sesión'
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
      logout: 'Logout'
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
  
  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let translation: string | Translations = translations[locale] || translations.es;
    
    for (const k of keys) {
      if (typeof translation === 'object' && translation !== null && k in translation) {
        translation = (translation as Translations)[k];
      } else {
        // Devuelve el valor por defecto o la clave si no se encuentra la traducción
        return defaultValue ?? key;
      }
    }
    
    return typeof translation === 'string' ? translation : defaultValue ?? key;
  };
  
  return { t, locale };
};