// src/components/channels/ChannelConfig.tsx
// Channel Configuration Component

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram,
  Settings,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface ChannelConfigProps {
  onChannelConnect: (channelType: string, config: any) => void;
}

const ChannelConfig: React.FC<ChannelConfigProps> = ({ onChannelConnect }) => {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [channelConfigs, setChannelConfigs] = useState<Record<string, any>>({
    webchat: { enabled: false, title: 'Chat Support', position: 'bottom-right' },
    whatsapp: { enabled: false, phoneNumber: '', apiKey: '' },
    email: { enabled: false, emailAddress: '', smtpHost: '', smtpPort: 587 },
    facebook: { enabled: false, pageId: '', accessToken: '' },
    messenger: { enabled: false, appId: '', pageToken: '' }
  });

  const channels = [
    { id: 'webchat', name: 'Web Chat', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'whatsapp', name: 'WhatsApp', icon: Phone, color: 'bg-green-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-red-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'messenger', name: 'Messenger', icon: MessageSquare, color: 'bg-blue-700' }
  ];

  const handleConfigChange = (channelId: string, field: string, value: any) => {
    setChannelConfigs(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [field]: value
      }
    }));
  };

  const toggleChannel = (channelId: string) => {
    const newEnabled = !channelConfigs[channelId].enabled;
    handleConfigChange(channelId, 'enabled', newEnabled);
    
    if (newEnabled) {
      onChannelConnect(channelId, channelConfigs[channelId]);
    }
  };

  const saveChannelConfig = (channelId: string) => {
    onChannelConnect(channelId, channelConfigs[channelId]);
    setActiveChannel(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-bold text-white">Channel Configuration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const config = channelConfigs[channel.id];
          
          return (
            <div key={channel.id} className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`${channel.color} p-2 rounded-lg mr-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-white">{channel.name}</h3>
                </div>
                
                <button
                  onClick={() => toggleChannel(channel.id)}
                  className="focus:outline-none"
                >
                  {config.enabled ? (
                    <ToggleRight className="h-6 w-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
              
              {config.enabled && (
                <div className="mt-3 space-y-3">
                  {channel.id === 'webchat' && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Chat Title</label>
                        <Input
                          value={config.title}
                          onChange={(e) => handleConfigChange(channel.id, 'title', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Position</label>
                        <select
                          value={config.position}
                          onChange={(e) => handleConfigChange(channel.id, 'position', e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        >
                          <option value="bottom-right">Bottom Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="top-left">Top Left</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {channel.id === 'whatsapp' && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
                        <Input
                          value={config.phoneNumber}
                          onChange={(e) => handleConfigChange(channel.id, 'phoneNumber', e.target.value)}
                          placeholder="+1234567890"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">API Key</label>
                        <Input
                          value={config.apiKey}
                          onChange={(e) => handleConfigChange(channel.id, 'apiKey', e.target.value)}
                          placeholder="Enter API key"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                    </>
                  )}
                  
                  {channel.id === 'email' && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                        <Input
                          value={config.emailAddress}
                          onChange={(e) => handleConfigChange(channel.id, 'emailAddress', e.target.value)}
                          placeholder="support@company.com"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">SMTP Host</label>
                        <Input
                          value={config.smtpHost}
                          onChange={(e) => handleConfigChange(channel.id, 'smtpHost', e.target.value)}
                          placeholder="smtp.company.com"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">SMTP Port</label>
                        <Input
                          type="number"
                          value={config.smtpPort}
                          onChange={(e) => handleConfigChange(channel.id, 'smtpPort', parseInt(e.target.value))}
                          placeholder="587"
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                    </>
                  )}
                  
                  {(channel.id === 'facebook' || channel.id === 'messenger') && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          {channel.id === 'facebook' ? 'Page ID' : 'App ID'}
                        </label>
                        <Input
                          value={config.pageId || config.appId}
                          onChange={(e) => handleConfigChange(channel.id, channel.id === 'facebook' ? 'pageId' : 'appId', e.target.value)}
                          placeholder={channel.id === 'facebook' ? 'Enter Page ID' : 'Enter App ID'}
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          {channel.id === 'facebook' ? 'Access Token' : 'Page Token'}
                        </label>
                        <Input
                          value={config.accessToken || config.pageToken}
                          onChange={(e) => handleConfigChange(channel.id, channel.id === 'facebook' ? 'accessToken' : 'pageToken', e.target.value)}
                          placeholder={channel.id === 'facebook' ? 'Enter Access Token' : 'Enter Page Token'}
                          className="bg-gray-700 border-gray-600 text-white text-sm"
                        />
                      </div>
                    </>
                  )}
                  
                  <Button
                    size="sm"
                    onClick={() => saveChannelConfig(channel.id)}
                    className="w-full"
                  >
                    Save Configuration
                  </Button>
                </div>
              )}
              
              {!config.enabled && (
                <p className="text-xs text-gray-500 mt-2">
                  Click the toggle to enable this channel
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelConfig;