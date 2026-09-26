// src/components/website-builder/SectionLibrary.tsx
import { Plus } from 'lucide-react';

interface SectionType {
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface SectionLibraryProps {
  onAddSection: (section: any) => void;
}

export default function SectionLibrary({ onAddSection }: SectionLibraryProps) {
  const sectionTypes: SectionType[] = [
    {
      type: 'hero',
      name: 'Hero',
      description: 'Sección principal con llamada a la acción',
      icon: <div className="w-8 h-8 bg-blue-500 rounded"></div>
    },
    {
      type: 'features',
      name: 'Características',
      description: 'Lista de características o beneficios',
      icon: <div className="w-8 h-8 bg-green-500 rounded"></div>
    },
    {
      type: 'pricing',
      name: 'Precios',
      description: 'Tabla de planes y precios',
      icon: <div className="w-8 h-8 bg-yellow-500 rounded"></div>
    },
    {
      type: 'testimonials',
      name: 'Testimonios',
      description: 'Opiniones de clientes',
      icon: <div className="w-8 h-8 bg-purple-500 rounded"></div>
    },
    {
      type: 'contact',
      name: 'Contacto',
      description: 'Formulario de contacto',
      icon: <div className="w-8 h-8 bg-red-500 rounded"></div>
    },
    {
      type: 'faq',
      name: 'Preguntas Frecuentes',
      description: 'Sección de preguntas y respuestas',
      icon: <div className="w-8 h-8 bg-indigo-500 rounded"></div>
    }
  ];

  const handleAddSection = (type: string) => {
    const newSection = {
      type,
      content: {},
      order: Date.now()
    };
    
    onAddSection(newSection);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4">Biblioteca de Secciones</h3>
      
      <div className="space-y-4">
        {sectionTypes.map((sectionType) => (
          <button
            key={sectionType.type}
            onClick={() => handleAddSection(sectionType.type)}
            className="w-full flex items-center p-4 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors text-left"
          >
            <div className="flex-shrink-0 mr-4">
              {sectionType.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white">{sectionType.name}</h4>
              <p className="text-sm text-gray-400 truncate">{sectionType.description}</p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <Plus className="h-5 w-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}