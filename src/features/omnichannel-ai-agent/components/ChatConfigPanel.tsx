// src/features/omnichannel-ai-agent/components/ChatConfigPanel.tsx
"use client";

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { ChatConfig } from '../types';

interface ChatConfigPanelProps {
  initialConfig: ChatConfig;
  onSave: (config: ChatConfig) => void;
  onCancel: () => void;
}

export default function ChatConfigPanel({ 
  initialConfig, 
  onSave, 
  onCancel 
}: ChatConfigPanelProps) {
  const { t } = useLanguage();
  const [config, setConfig] = useState<ChatConfig>(initialConfig);

  const handleChange = (field: keyof ChatConfig, value: string | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <div className="bg-surface rounded-xl border border-gray-700 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Configuración del Chat IA</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bot Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Asistente
            </label>
            <input
              type="text"
              value={config.botName}
              onChange={(e) => handleChange('botName', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Asistente IA"
            />
          </div>

          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color Principal
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-12 h-12 border border-gray-700 rounded-lg bg-gray-800 cursor-pointer"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          {/* Greeting Message */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mensaje de Bienvenida
            </label>
            <textarea
              value={config.greetingMessage}
              onChange={(e) => handleChange('greetingMessage', e.target.value)}
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="¡Hola! ¿En qué puedo ayudarte hoy?"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tono de Conversación
            </label>
            <select
              value={config.tone}
              onChange={(e) => handleChange('tone', e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="professional">Profesional</option>
              <option value="friendly">Amigable</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Idioma
            </label>
            <select
              value={config.language}
              onChange={(e) => handleChange('language', e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            URL del Logo (Opcional)
          </label>
          <input
            type="text"
            value={config.logoUrl || ''}
            onChange={(e) => handleChange('logoUrl', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  );
}