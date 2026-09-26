// src/app/dashboard/web-builder/editor/page.tsx
"use client";

import { useState } from 'react';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';
import { useTranslations } from '@/lib/i18n';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditorToolbar from './Toolbar';
import DraggableComponent from './DraggableComponent';
import DropZone from './DropZone';
import { 
  Move, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Settings,
  Plus,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface SectionComponent {
  id: string;
  type: string;
  name: string;
  icon: React.ReactNode;
}

export default function VisualEditor() {
  const { t } = useTranslations();
  const { website, addSection, removeSection } = useWebsiteBuilder();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sectionComponents: SectionComponent[] = [
    {
      id: 'hero',
      type: 'hero',
      name: t('webBuilder.editor.components.hero'),
      icon: <div className="w-6 h-6 bg-blue-500 rounded"></div>
    },
    {
      id: 'features',
      type: 'features',
      name: t('webBuilder.editor.components.features'),
      icon: <div className="w-6 h-6 bg-green-500 rounded"></div>
    },
    {
      id: 'pricing',
      type: 'pricing',
      name: t('webBuilder.editor.components.pricing'),
      icon: <div className="w-6 h-6 bg-yellow-500 rounded"></div>
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      name: t('webBuilder.editor.components.testimonials'),
      icon: <div className="w-6 h-6 bg-purple-500 rounded"></div>
    },
    {
      id: 'contact',
      type: 'contact',
      name: t('webBuilder.editor.components.contact'),
      icon: <div className="w-6 h-6 bg-red-500 rounded"></div>
    },
    {
      id: 'faq',
      type: 'faq',
      name: t('webBuilder.editor.components.faq'),
      icon: <div className="w-6 h-6 bg-indigo-500 rounded"></div>
    }
  ];

  const handleAddSection = (type: string) => {
    const newSection = {
      type: type as any,
      content: {},
      order: website?.sections.length ? website.sections.length + 1 : 1
    };
    
    addSection(newSection);
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    // Implementation for moving sections up or down
    console.log(`Moving section ${sectionId} ${direction}`);
  };

  const handleDuplicateSection = (sectionId: string) => {
    // Implementation for duplicating a section
    console.log(`Duplicating section ${sectionId}`);
  };

  if (!website) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('webBuilder.editor.noWebsite')}</h2>
        <p className="text-gray-400 mb-6">
          {t('webBuilder.editor.createWebsiteFirst')}
        </p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        <EditorToolbar />
        
        <div className="flex flex-1 overflow-hidden mt-4">
          {/* Components Panel */}
          <div className="w-64 bg-surface rounded-lg p-4 mr-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.editor.components.title')}</h3>
            
            <div className="space-y-2">
              {sectionComponents.map((component) => (
                <DraggableComponent
                  key={component.id}
                  id={component.id}
                  type={component.type}
                  name={component.name}
                  icon={component.icon}
                />
              ))}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-surface rounded-lg p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">{t('webBuilder.editor.canvas.title')}</h3>
            
            <DropZone className="min-h-[500px] rounded-lg p-4">
              {website.sections.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="bg-gray-700 rounded-full p-4 mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">{t('webBuilder.editor.canvas.emptyTitle')}</h4>
                  <p className="text-gray-400 mb-6 max-w-md">
                    {t('webBuilder.editor.canvas.emptyDescription')}
                  </p>
                  <button
                    onClick={() => handleAddSection('hero')}
                    className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    {t('webBuilder.editor.canvas.addFirstSection')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {website.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <div 
                        key={section.id}
                        className={`border rounded-lg transition-all ${
                          selectedSection === section.id 
                            ? 'border-primary bg-gray-750' 
                            : 'border-gray-700 bg-gray-750 hover:border-gray-600'
                        }`}
                      >
                        <div 
                          className="flex items-center justify-between p-3 cursor-pointer"
                          onClick={() => setSelectedSection(
                            selectedSection === section.id ? null : section.id
                          )}
                        >
                          <div className="flex items-center">
                            <Move className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-medium text-white capitalize">
                              {section.type === 'hero' && t('webBuilder.editor.components.hero')}
                              {section.type === 'features' && t('webBuilder.editor.components.features')}
                              {section.type === 'pricing' && t('webBuilder.editor.components.pricing')}
                              {section.type === 'testimonials' && t('webBuilder.editor.components.testimonials')}
                              {section.type === 'contact' && t('webBuilder.editor.components.contact')}
                              {section.type === 'faq' && t('webBuilder.editor.components.faq')}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveSection(section.id, 'up');
                              }}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveSection(section.id, 'down');
                              }}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateSection(section.id);
                              }}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSection(section.id);
                              }}
                              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {selectedSection === section.id && (
                          <div className="border-t border-gray-700 p-3">
                            <div className="flex space-x-2">
                              <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">
                                <Edit3 className="h-4 w-4 mr-1" />
                                {t('webBuilder.editor.actions.edit')}
                              </button>
                              <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">
                                <Settings className="h-4 w-4 mr-1" />
                                {t('webBuilder.editor.actions.settings')}
                              </button>
                              <button className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">
                                <Eye className="h-4 w-4 mr-1" />
                                {t('webBuilder.editor.actions.preview')}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  }
                </div>
              )}
            </DropZone>
          </div>

          {/* Properties Panel */}
          <div className="w-64 bg-surface rounded-lg p-4 ml-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {selectedSection 
                ? t('webBuilder.editor.properties.sectionProperties') 
                : t('webBuilder.editor.properties.websiteProperties')}
            </h3>
            
            {selectedSection ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('webBuilder.editor.properties.sectionType')}
                  </label>
                  <div className="bg-gray-750 rounded-lg p-3">
                    <span className="text-white capitalize">
                      {website.sections.find(s => s.id === selectedSection)?.type}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('webBuilder.editor.properties.sectionId')}
                  </label>
                  <div className="bg-gray-750 rounded-lg p-3">
                    <span className="text-gray-400 text-sm font-mono">
                      {selectedSection}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    {t('webBuilder.editor.properties.deleteSection')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('webBuilder.editor.properties.websiteName')}
                  </label>
                  <input
                    type="text"
                    value={website.name}
                    readOnly
                    className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('webBuilder.editor.properties.domain')}
                  </label>
                  <input
                    type="text"
                    value={website.domain}
                    readOnly
                    className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('webBuilder.editor.properties.theme')}
                  </label>
                  <select className="w-full bg-gray-750 border border-gray-700 rounded-lg px-3 py-2 text-white">
                    <option>{t('webBuilder.editor.properties.themes.default')}</option>
                    <option>{t('webBuilder.editor.properties.themes.modern')}</option>
                    <option>{t('webBuilder.editor.properties.themes.minimal')}</option>
                    <option>{t('webBuilder.editor.properties.themes.business')}</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}