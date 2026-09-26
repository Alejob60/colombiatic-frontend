// src/components/website-builder/SectionEditor.tsx
import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { Trash2, GripVertical } from 'lucide-react';

interface Section {
  id: string;
  type: string;
  content: any;
  order: number;
}

interface SectionEditorProps {
  section: Section;
}

export default function SectionEditor({ section }: SectionEditorProps) {
  const { updateSection, removeSection } = useWebsiteBuilder();
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (field: string, value: any) => {
    const updatedContent = {
      ...section.content,
      [field]: value
    };
    
    updateSection(section.id, updatedContent);
  };

  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Título
              </label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Subtítulo
              </label>
              <textarea
                value={section.content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Texto del CTA
                </label>
                <input
                  type="text"
                  value={section.content.ctaText || ''}
                  onChange={(e) => handleContentChange('ctaText', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Enlace del CTA
                </label>
                <input
                  type="text"
                  value={section.content.ctaLink || ''}
                  onChange={(e) => handleContentChange('ctaLink', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Título
              </label>
              <input
                type="text"
                value={section.content.title || 'Características'}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Descripción
              </label>
              <textarea
                value={section.content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-gray-400">
            Editor para sección de tipo "{section.type}" no implementado
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 bg-gray-750 border-b border-gray-700">
        <div className="flex items-center">
          <GripVertical className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="font-medium text-white capitalize">
            {section.type === 'hero' && 'Hero'}
            {section.type === 'features' && 'Características'}
            {section.type === 'pricing' && 'Precios'}
            {section.type === 'testimonials' && 'Testimonios'}
            {section.type === 'contact' && 'Contacto'}
            {section.type === 'faq' && 'Preguntas Frecuentes'}
          </h3>
        </div>
        
        <button
          onClick={() => removeSection(section.id)}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      
      {/* Section Content */}
      <div className="p-4">
        {renderEditor()}
      </div>
    </div>
  );
}