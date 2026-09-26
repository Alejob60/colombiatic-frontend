// src/app/(i18n)/[lang]/(dashboard)/help/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { withAuth } from '@/components/hoc/withAuth';
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  BookOpen, 
  FileText, 
  Search,
  ChevronRight,
  Lightbulb,
  Zap,
  Shield,
  Users,
  Settings,
  BarChart3
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

function HelpPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: '¿Cómo activo un nuevo servicio?',
      answer: 'Puedes activar un nuevo servicio desde la sección "Mis Servicios" haciendo clic en "Nuevo Servicio". Sigue el asistente de activación para configurar tu servicio.',
      category: 'services'
    },
    {
      id: '2',
      question: '¿Cómo configuro mi chatbot?',
      answer: 'Una vez activado tu servicio de chatbot, ve a "Configuración" en el menú lateral y selecciona "Chatbot". Allí encontrarás todas las opciones de personalización.',
      category: 'configuration'
    },
    {
      id: '3',
      question: '¿Dónde veo mis métricas?',
      answer: 'Las métricas de uso se encuentran en la sección "Analytics" del menú lateral. Puedes ver estadísticas en tiempo real de todos tus servicios.',
      category: 'analytics'
    },
    {
      id: '4',
      question: '¿Cómo cambio mi plan?',
      answer: 'Ve a "Configuración" > "Facturación" para actualizar o cambiar tu plan actual. Puedes elegir entre FREE, CREATOR o PRO.',
      category: 'billing'
    }
  ];

  const guides: Guide[] = [
    {
      id: '1',
      title: 'Guía de inicio rápido',
      description: 'Aprende a configurar tu primera IA en minutos',
      category: 'getting-started',
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'Personalización avanzada',
      description: 'Optimiza tu experiencia con configuraciones avanzadas',
      category: 'advanced',
      readTime: '12 min'
    },
    {
      id: '3',
      title: 'Mejores prácticas de seguridad',
      description: 'Protege tu cuenta y datos con nuestras recomendaciones',
      category: 'security',
      readTime: '8 min'
    },
    {
      id: '4',
      title: 'Integración con otras plataformas',
      description: 'Conecta ColombiaTIC con tus herramientas favoritas',
      category: 'integration',
      readTime: '10 min'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: HelpCircle },
    { id: 'getting-started', name: 'Primeros pasos', icon: Zap },
    { id: 'services', name: 'Servicios', icon: Lightbulb },
    { id: 'configuration', name: 'Configuración', icon: Settings },
    { id: 'analytics', name: 'Analítica', icon: BarChart3 },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'billing', name: 'Facturación', icon: Users }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Centro de Ayuda</h1>
        <p className="text-gray-400">Encuentra respuestas, guías y recursos para sacar el máximo provecho de ColombiaTIC</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Buscar en el centro de ayuda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-white mb-4">Categorías</h2>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-md font-semibold text-white mb-3">Soporte Directo</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/dashboard/support')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="text-white font-medium">Chat en Vivo</div>
                    <div className="text-gray-400 text-sm">Respuesta inmediata</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400 text-sm">support@colombiatic.com.co</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Quick Guides */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Guías Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuides.map((guide) => (
                <div key={guide.id} className="bg-gray-800 rounded-xl p-5 hover:bg-gray-750 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-400 mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                      {guide.readTime} de lectura
                    </span>
                    <button className="text-primary hover:text-blue-400 text-sm font-medium">
                      Leer guía
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
            {filteredFaqs.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No se encontraron resultados</h3>
                <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-gray-800 rounded-xl overflow-hidden">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HelpPage);