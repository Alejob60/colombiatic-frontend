// src/app/(i18n)/[lang]/(dashboard)/channels/page.tsx
// Channels Dashboard

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import ChannelConfig from '@/components/channels/ChannelConfig';
import ConversationCenter from '@/components/channels/ConversationCenter';
import { Button } from '@/components/ui/Button';
import { 
  MessageSquare, 
  Settings, 
  BarChart3,
  AlertCircle
} from 'lucide-react';

const ChannelsDashboard = () => {
  const [activeTab, setActiveTab] = useState<'conversations' | 'config' | 'analytics'>('conversations');
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});

  const handleChannelConnect = (channelType: string, config: any) => {
    // In a real implementation, this would connect to the actual channel
    console.log(`Connecting to ${channelType} with config:`, config);
    
    // Simulate connection success
    setTimeout(() => {
      setConnectionStatus(prev => ({
        ...prev,
        [channelType]: config.enabled
      }));
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageSquare className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-white">Omnichannel Support</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm text-gray-400">
            <div className={`w-2 h-2 rounded-full mr-2 ${Object.values(connectionStatus).some(status => status) ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {Object.values(connectionStatus).some(status => status) ? 'Connected' : 'Disconnected'}
          </div>
        </div>
      </div>

      {/* Status Alerts */}
      {Object.keys(connectionStatus).length === 0 && (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-yellow-300">
              No channels are currently configured. Configure channels to start receiving messages.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'conversations'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('conversations')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversations
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'config'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('config')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Channel Configuration
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'analytics'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'conversations' && (
            <ConversationCenter />
          )}

          {activeTab === 'config' && (
            <ChannelConfig onChannelConnect={handleChannelConnect} />
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Channel Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-md font-medium text-white mb-4">Messages by Channel</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Web Chat</span>
                        <span className="text-white">1,245</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">WhatsApp</span>
                        <span className="text-white">876</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">432</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '26%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-md font-medium text-white mb-4">Response Times</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Web Chat</span>
                      <span className="text-white">2m 15s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">WhatsApp</span>
                      <span className="text-white">5m 30s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">2h 15m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Facebook</span>
                      <span className="text-white">15m 45s</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-md font-medium text-white mb-4">Resolution Rates</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">First Contact</span>
                      <span className="text-white">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Within 24h</span>
                      <span className="text-white">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Customer Satisfaction</span>
                      <span className="text-white">4.7/5</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-900 rounded-lg p-6">
                <h4 className="text-md font-medium text-white mb-4">Recent Activity</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Channel</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Web Chat</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">John Doe</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Order inquiry</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">2 min ago</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                            Resolved
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">WhatsApp</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Maria Garcia</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Product return</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">15 min ago</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900 text-yellow-300">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Email</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">Robert Wilson</td>
                        <td className="px-4 py-3 text-sm text-gray-300">Billing question</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">1 hour ago</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-blue-300">
                            Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(ChannelsDashboard);