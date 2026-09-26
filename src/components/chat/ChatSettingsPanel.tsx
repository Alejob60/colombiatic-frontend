'use client';

import React, { useState, useEffect } from 'react';
import { 
  PaletteIcon, 
  MonitorIcon, 
  SmartphoneIcon, 
  BellIcon, 
  Volume2Icon, 
  VolumeXIcon,
  SaveIcon,
  XIcon
} from 'lucide-react';

interface ChatPreferences {
  theme: 'light' | 'dark' | 'auto';
  size: 'small' | 'medium' | 'large';
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  notifications: boolean;
  sound: boolean;
  language: 'es' | 'en' | 'pt';
}

interface ChatSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: ChatPreferences) => void;
  initialPreferences: ChatPreferences;
}

const ChatSettingsPanel: React.FC<ChatSettingsPanelProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  initialPreferences 
}) => {
  const [preferences, setPreferences] = useState<ChatPreferences>(initialPreferences);

  useEffect(() => {
    setPreferences(initialPreferences);
  }, [initialPreferences]);

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Configuración del Chat</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <PaletteIcon className="inline h-4 w-4 mr-2" />
              Tema
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPreferences({...preferences, theme: 'light'})}
                className={`p-3 rounded-lg border ${
                  preferences.theme === 'light' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <MonitorIcon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Claro</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, theme: 'dark'})}
                className={`p-3 rounded-lg border ${
                  preferences.theme === 'dark' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-center">
                  <div className="h-5 w-5 rounded-full bg-gray-800 mb-1"></div>
                </div>
                <span className="text-xs">Oscuro</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, theme: 'auto'})}
                className={`p-3 rounded-lg border ${
                  preferences.theme === 'auto' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <MonitorIcon className="h-3 w-3" />
                  <SmartphoneIcon className="h-3 w-3" />
                </div>
                <span className="text-xs">Auto</span>
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamaño del Chat
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPreferences({...preferences, size: 'small'})}
                className={`p-2 rounded-lg border ${
                  preferences.size === 'small' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="h-8 w-6 mx-auto bg-gray-200 rounded"></div>
                <span className="text-xs mt-1 block">Pequeño</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, size: 'medium'})}
                className={`p-2 rounded-lg border ${
                  preferences.size === 'medium' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="h-10 w-8 mx-auto bg-gray-200 rounded"></div>
                <span className="text-xs mt-1 block">Mediano</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, size: 'large'})}
                className={`p-2 rounded-lg border ${
                  preferences.size === 'large' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="h-12 w-10 mx-auto bg-gray-200 rounded"></div>
                <span className="text-xs mt-1 block">Grande</span>
              </button>
            </div>
          </div>

          {/* Position Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posición en Pantalla
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPreferences({...preferences, position: 'bottom-right'})}
                className={`p-3 rounded-lg border flex items-center justify-center ${
                  preferences.position === 'bottom-right' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="relative h-12 w-12 bg-gray-100 rounded">
                  <div className="absolute bottom-1 right-1 h-6 w-6 bg-blue-500 rounded"></div>
                </div>
                <span className="text-xs ml-2">Inferior Derecha</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, position: 'bottom-left'})}
                className={`p-3 rounded-lg border flex items-center justify-center ${
                  preferences.position === 'bottom-left' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="relative h-12 w-12 bg-gray-100 rounded">
                  <div className="absolute bottom-1 left-1 h-6 w-6 bg-blue-500 rounded"></div>
                </div>
                <span className="text-xs ml-2">Inferior Izquierda</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, position: 'top-right'})}
                className={`p-3 rounded-lg border flex items-center justify-center ${
                  preferences.position === 'top-right' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="relative h-12 w-12 bg-gray-100 rounded">
                  <div className="absolute top-1 right-1 h-6 w-6 bg-blue-500 rounded"></div>
                </div>
                <span className="text-xs ml-2">Superior Derecha</span>
              </button>
              <button
                onClick={() => setPreferences({...preferences, position: 'top-left'})}
                className={`p-3 rounded-lg border flex items-center justify-center ${
                  preferences.position === 'top-left' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="relative h-12 w-12 bg-gray-100 rounded">
                  <div className="absolute top-1 left-1 h-6 w-6 bg-blue-500 rounded"></div>
                </div>
                <span className="text-xs ml-2">Superior Izquierda</span>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BellIcon className="inline h-4 w-4 mr-2" />
              Notificaciones
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Activar notificaciones</span>
              <button
                onClick={() => setPreferences({...preferences, notifications: !preferences.notifications})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  preferences.notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Sound */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {preferences.sound ? (
                <Volume2Icon className="inline h-4 w-4 mr-2" />
              ) : (
                <VolumeXIcon className="inline h-4 w-4 mr-2" />
              )}
              Sonido
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>{preferences.sound ? 'Sonido activo' : 'Sonido desactivado'}</span>
              <button
                onClick={() => setPreferences({...preferences, sound: !preferences.sound})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  preferences.sound ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  preferences.sound ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSettingsPanel;