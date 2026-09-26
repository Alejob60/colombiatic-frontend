// src/app/dashboard/ai-agent/page.tsx
// AI Agent dashboard for ColombiaTIC

"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { 
  Bot, 
  MessageSquare, 
  Settings, 
  Code, 
  Globe, 
  Smartphone, 
  Facebook, 
  Instagram, 
  Twitter,
  Copy,
  Check
} from 'lucide-react';
import * as aiAgentService from '@/services/misybot/aiAgentService';
import { generateChatWidgetScript } from '@/services/chatWidgetService';

export default function AIAgentDashboard() {
  const { user } = useAuth();
  const [agentConfig, setAgentConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    site_url: 'https://miempresa.com',
    industry: 'technology',
    language: 'es',
    tone: 'professional',
    connect_channels: ['web'] as ('web' | 'whatsapp' | 'facebook' | 'instagram' | 'telegram')[]
  });
  const [widgetScript, setWidgetScript] = useState('');

  const industries = [
    { value: 'technology', label: 'Tecnología' },
    { value: 'healthcare', label: 'Salud' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'education', label: 'Educación' },
    { value: 'retail', label: 'Retail' },
    { value: 'other', label: 'Otro' }
  ];

  const tones = [
    { value: 'professional', label: 'Profesional' },
    { value: 'friendly', label: 'Amigable' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' }
  ];

  const channels = [
    { id: 'web', name: 'Web', icon: Globe },
    { id: 'whatsapp', name: 'WhatsApp', icon: Smartphone },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'telegram', name: 'Telegram', icon: MessageSquare }
  ];

  const handleCreateAgent = async () => {
    if (!user?.organization_id) return;
    
    setLoading(true);
    try {
      const response = await aiAgentService.createAgent({
        ...formData,
        organization_id: user.organization_id
      });
      
      setAgentConfig(response.agent);
      
      // Generate widget script
      if (response.agent?.id) {
        const script = generateChatWidgetScript(response.agent.id);
        setWidgetScript(script);
      }
    } catch (error) {
      console.error('Error creating agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (widgetScript) {
      navigator.clipboard.writeText(widgetScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleChannel = (channel: 'web' | 'whatsapp' | 'facebook' | 'instagram' | 'telegram') => {
    setFormData(prev => {
      const newChannels = prev.connect_channels.includes(channel)
        ? prev.connect_channels.filter(c => c !== channel)
        : [...prev.connect_channels, channel];
      
      return {
        ...prev,
        connect_channels: newChannels
      };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Agente IA ColombiaTIC</h1>
        <p className="text-gray-400 mt-2">
          Configura y gestiona tu agente de inteligencia artificial para atención al cliente omnichannel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Agente
            </CardTitle>
            <CardDescription>
              Configura tu agente IA con los parámetros específicos de tu negocio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  URL del Sitio
                </label>
                <Input
                  value={formData.site_url}
                  onChange={(e) => setFormData({...formData, site_url: e.target.value})}
                  placeholder="https://miempresa.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Industria
                </label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(value) => setFormData({...formData, industry: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar industria" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Idioma
                </label>
                <Select 
                  value={formData.language} 
                  onValueChange={(value) => setFormData({...formData, language: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Tono
                </label>
                <Select 
                  value={formData.tone} 
                  onValueChange={(value) => setFormData({...formData, tone: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tono" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map(tone => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Canales de Conexión
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {channels.map(channel => {
                  const Icon = channel.icon;
                  const isSelected = formData.connect_channels.includes(channel.id as any);
                  return (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                        isSelected 
                          ? 'bg-primary/20 border-primary text-primary' 
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-1" />
                      <span className="text-xs">{channel.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <Button 
              onClick={handleCreateAgent} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creando Agente...' : 'Crear Agente IA'}
            </Button>
          </CardContent>
        </Card>
        
        {/* Widget Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Widget de Chat
            </CardTitle>
            <CardDescription>
              Copia el script para integrar el chat en tu sitio web.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {widgetScript ? (
              <>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-xs text-gray-300 overflow-x-auto">
                    {widgetScript}
                  </pre>
                </div>
                <Button 
                  onClick={handleCopyScript}
                  className="w-full flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar Script
                    </>
                  )}
                </Button>
                <div className="text-xs text-gray-400">
                  <p>Pega este script en la sección &lt;head&gt; de tu sitio web.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Crea un agente para generar el script del widget.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Agent Status */}
      {agentConfig && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Estado del Agente
            </CardTitle>
            <CardDescription>
              Información sobre tu agente IA configurado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">ID del Agente</p>
                <p className="font-mono text-sm">{agentConfig.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sitio Web</p>
                <p className="text-sm">{agentConfig.site_url}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Industria</p>
                <p className="text-sm capitalize">{agentConfig.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Idioma</p>
                <p className="text-sm">{agentConfig.language.toUpperCase()}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Canales Conectados</p>
              <div className="flex flex-wrap gap-2">
                {agentConfig.connected_channels.map((channel: string) => (
                  <Badge key={channel} variant="secondary">
                    {channel.charAt(0).toUpperCase() + channel.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}