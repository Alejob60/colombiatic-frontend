// src/app/dashboard/ia-omnichannel/config/page.tsx
"use client";

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n';

export default function ChannelConfigurationPage() {
  const { t } = useTranslations();
  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumber: '',
    apiKey: '',
    connected: false
  });
  const [instagramConfig, setInstagramConfig] = useState({
    username: '',
    password: '',
    connected: false
  });
  const [facebookConfig, setFacebookConfig] = useState({
    pageId: '',
    accessToken: '',
    connected: false
  });

  const handleConnectWhatsapp = () => {
    // Simular conexión con WhatsApp API
    setWhatsappConfig(prev => ({
      ...prev,
      connected: true
    }));
  };

  const handleDisconnectWhatsapp = () => {
    setWhatsappConfig(prev => ({
      ...prev,
      connected: false
    }));
  };

  const handleConnectInstagram = () => {
    // Simular conexión con Instagram API
    setInstagramConfig(prev => ({
      ...prev,
      connected: true
    }));
  };

  const handleDisconnectInstagram = () => {
    setInstagramConfig(prev => ({
      ...prev,
      connected: false
    }));
  };

  const handleConnectFacebook = () => {
    // Simular conexión con Facebook API
    setFacebookConfig(prev => ({
      ...prev,
      connected: true
    }));
  };

  const handleDisconnectFacebook = () => {
    setFacebookConfig(prev => ({
      ...prev,
      connected: false
    }));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Configuración de Canales</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Configuración de WhatsApp */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">WhatsApp</h2>
              <div className={`w-3 h-3 rounded-full ${whatsappConfig.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            
            {!whatsappConfig.connected ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="whatsapp-phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Número de teléfono
                  </label>
                  <input
                    type="text"
                    id="whatsapp-phone"
                    value={whatsappConfig.phoneNumber}
                    onChange={(e) => setWhatsappConfig(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsapp-api-key" className="block text-sm font-medium text-gray-300 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="whatsapp-api-key"
                    value={whatsappConfig.apiKey}
                    onChange={(e) => setWhatsappConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Ingrese su API Key"
                  />
                </div>
                
                <button
                  onClick={handleConnectWhatsapp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Conectar WhatsApp
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-green-400 mb-4">Conectado a WhatsApp Business API</p>
                <button
                  onClick={handleDisconnectWhatsapp}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Desconectar
                </button>
              </div>
            )}
          </div>
          
          {/* Configuración de Instagram */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Instagram</h2>
              <div className={`w-3 h-3 rounded-full ${instagramConfig.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            
            {!instagramConfig.connected ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="instagram-username" className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="instagram-username"
                    value={instagramConfig.username}
                    onChange={(e) => setInstagramConfig(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="nombre_usuario"
                  />
                </div>
                
                <div>
                  <label htmlFor="instagram-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="instagram-password"
                    value={instagramConfig.password}
                    onChange={(e) => setInstagramConfig(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Ingrese su contraseña"
                  />
                </div>
                
                <button
                  onClick={handleConnectInstagram}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Conectar Instagram
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-green-400 mb-4">Conectado a Instagram API</p>
                <button
                  onClick={handleDisconnectInstagram}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Desconectar
                </button>
              </div>
            )}
          </div>
          
          {/* Configuración de Facebook */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Facebook</h2>
              <div className={`w-3 h-3 rounded-full ${facebookConfig.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            
            {!facebookConfig.connected ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="facebook-page-id" className="block text-sm font-medium text-gray-300 mb-1">
                    ID de página
                  </label>
                  <input
                    type="text"
                    id="facebook-page-id"
                    value={facebookConfig.pageId}
                    onChange={(e) => setFacebookConfig(prev => ({ ...prev, pageId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Ingrese el ID de su página"
                  />
                </div>
                
                <div>
                  <label htmlFor="facebook-access-token" className="block text-sm font-medium text-gray-300 mb-1">
                    Access Token
                  </label>
                  <input
                    type="password"
                    id="facebook-access-token"
                    value={facebookConfig.accessToken}
                    onChange={(e) => setFacebookConfig(prev => ({ ...prev, accessToken: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-background text-white focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Ingrese su Access Token"
                  />
                </div>
                
                <button
                  onClick={handleConnectFacebook}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Conectar Facebook
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-green-400 mb-4">Conectado a Facebook API</p>
                <button
                  onClick={handleDisconnectFacebook}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Desconectar
                </button>
              </div>
            )}
          </div>
          
          {/* Información adicional */}
          <div className="bg-surface rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Información Importante</h2>
            <div className="text-gray-300 space-y-2">
              <p>• Asegúrese de tener las credenciales correctas para cada canal</p>
              <p>• Las credenciales se almacenan de forma segura en nuestros servidores</p>
              <p>• Puede desconectar y reconectar canales en cualquier momento</p>
              <p>• Para obtener ayuda con la configuración, consulte nuestra guía</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}