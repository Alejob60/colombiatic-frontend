// src/components/website-builder/WebsitePreview.tsx
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';

export default function WebsitePreview() {
  const { website } = useWebsiteBuilder();

  if (!website) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No hay sitio web</h2>
        <p className="text-gray-400">
          Crea un nuevo sitio web para ver la vista previa.
        </p>
      </div>
    );
  }

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'hero':
        return (
          <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {section.content.title || 'Título del Hero'}
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {section.content.subtitle || 'Subtítulo del hero section'}
              </p>
              <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                {section.content.ctaText || 'Comenzar ahora'}
              </button>
            </div>
          </section>
        );
      
      case 'features':
        return (
          <section className="py-20 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                {section.content.title || 'Características'}
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                {section.content.description || 'Descripción de las características'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-800 rounded-lg p-6 text-center">
                    <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-6 h-6 bg-white rounded"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Característica {item}</h3>
                    <p className="text-gray-400">
                      Descripción de la característica {item} y sus beneficios.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      
      default:
        return (
          <section className="py-12 px-4 bg-gray-800">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Sección de tipo "{section.type}"
              </h2>
              <p className="text-gray-400">
                Vista previa para este tipo de sección no implementada.
              </p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Vista Previa</h2>
        <p className="text-gray-400 text-sm mt-1">
          {website.name} - {website.domain}
        </p>
      </div>
      
      <div className="bg-white">
        {/* Browser mockup */}
        <div className="p-4 bg-gray-100 border-b border-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1 ml-4 bg-white rounded-lg px-4 py-1 text-sm text-gray-500">
              https://{website.domain}
            </div>
          </div>
        </div>
        
        {/* Website preview */}
        <div className="min-h-screen">
          {website.sections
            .sort((a: any, b: any) => a.order - b.order)
            .map((section: any) => (
              <div key={section.id}>
                {renderSection(section)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}