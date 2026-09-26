// src/components/website-builder/WebsiteBuilder.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import SectionEditor from './SectionEditor';
import SectionLibrary from './SectionLibrary';

export default function WebsiteBuilder() {
  const { website, addSection, publishWebsite } = useWebsiteBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishSuccess(false);
    
    try {
      const success = await publishWebsite();
      if (success) {
        setPublishSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => setPublishSuccess(false), 3000);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  if (!website) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No hay sitio web</h2>
        <p className="text-gray-400 mb-6">
          Crea un nuevo sitio web para comenzar a construir.
        </p>
        <button className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Crear Sitio Web
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Editor */}
      <div className="lg:col-span-3 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Editor</h2>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isPublishing ? 'Publicando...' : 'Publicar Sitio'}
          </button>
        </div>
        
        {publishSuccess && (
          <div className="bg-green-900/50 border border-green-700 rounded-lg p-4">
            <p className="text-green-300 text-center">¡Sitio web publicado con éxito!</p>
          </div>
        )}
        
        {/* Sections List */}
        <div className="space-y-6">
          {website.sections.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium text-white mb-2">No hay secciones</h3>
              <p className="text-gray-400 mb-6">
                Agrega secciones desde la biblioteca para comenzar a construir tu sitio.
              </p>
            </div>
          ) : (
            website.sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <SectionEditor 
                  key={section.id} 
                  section={section} 
                />
              ))
          )}
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <SectionLibrary onAddSection={addSection} />
      </div>
    </div>
  );
}