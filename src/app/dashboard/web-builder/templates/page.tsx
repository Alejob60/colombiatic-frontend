// src/app/dashboard/web-builder/templates/page.tsx
"use client";

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n';

interface Template {
  id: string;
  name: string;
  category: string;
  previewImage: string;
  description: string;
}

export default function TemplateSelector() {
  const { t } = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const templates: Template[] = [
    {
      id: 'business',
      name: 'Business Professional',
      category: 'business',
      previewImage: '/images/templates/business.jpg',
      description: 'Plantilla profesional para empresas'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      category: 'ecommerce',
      previewImage: '/images/templates/ecommerce.jpg',
      description: 'Tienda online completa con carrito'
    },
    {
      id: 'portfolio',
      name: 'Creative Portfolio',
      category: 'portfolio',
      previewImage: '/images/templates/portfolio.jpg',
      description: 'Portafolio para creativos y artistas'
    },
    {
      id: 'restaurant',
      name: 'Restaurant & Cafe',
      category: 'business',
      previewImage: '/images/templates/restaurant.jpg',
      description: 'Sitio web para restaurantes y cafés'
    },
    {
      id: 'agency',
      name: 'Marketing Agency',
      category: 'business',
      previewImage: '/images/templates/agency.jpg',
      description: 'Plantilla para agencias de marketing'
    },
    {
      id: 'blog',
      name: 'Blog & News',
      category: 'content',
      previewImage: '/images/templates/blog.jpg',
      description: 'Blog profesional con sección de noticias'
    }
  ];

  const categories = [
    { id: 'all', name: t('webBuilder.templates.all') },
    { id: 'business', name: t('webBuilder.templates.business') },
    { id: 'ecommerce', name: t('webBuilder.templates.ecommerce') },
    { id: 'portfolio', name: t('webBuilder.templates.portfolio') },
    { id: 'content', name: t('webBuilder.templates.content') }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="bg-surface rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">{t('webBuilder.templates.title')}</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-primary transition-colors"
          >
            <div className="aspect-video bg-gray-700 relative overflow-hidden">
              <div className="bg-gray-600 w-full h-full flex items-center justify-center">
                <span className="text-gray-400">{t('webBuilder.templates.preview')}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1">{template.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{template.description}</p>
              <button className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                {t('webBuilder.templates.select')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}