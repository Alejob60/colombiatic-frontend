// src/app/(i18n)/[lang]/(dashboard)/ads-manager/page.tsx
// Ads Manager Dashboard

"use client";

import React, { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  BarChart3, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Eye,
  Wallet,
  TrendingUp
} from 'lucide-react';

const AdsManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'reports' | 'billing'>('campaigns');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for campaigns
  const campaigns = [
    {
      id: '1',
      name: 'Summer Promotion',
      status: 'active',
      budget: 500,
      spent: 320,
      impressions: 12500,
      clicks: 420,
      ctr: 3.36,
      conversions: 25
    },
    {
      id: '2',
      name: 'Black Friday Deal',
      status: 'paused',
      budget: 1000,
      spent: 750,
      impressions: 28450,
      clicks: 980,
      ctr: 3.45,
      conversions: 67
    },
    {
      id: '3',
      name: 'New Product Launch',
      status: 'active',
      budget: 750,
      spent: 120,
      impressions: 5600,
      clicks: 180,
      ctr: 3.21,
      conversions: 12
    }
  ];

  // Mock data for billing
  const billingInfo = {
    currentBalance: 1250.75,
    monthlySpending: 890.50,
    credits: 2450
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-white">Ads Manager</h1>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Balance</p>
              <p className="text-xl font-bold">${billingInfo.currentBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Monthly Spending</p>
              <p className="text-xl font-bold">${billingInfo.monthlySpending.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Active Campaigns</p>
              <p className="text-xl font-bold">{campaigns.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Credits</p>
              <p className="text-xl font-bold">{billingInfo.credits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'campaigns'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('campaigns')}
            >
              Campaigns
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'reports'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'billing'
                  ? 'text-white border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('billing')}
            >
              Billing
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'campaigns' && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Your Campaigns</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Campaign</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Budget</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Impressions</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Clicks</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CTR</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{campaign.name}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === 'active' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-yellow-900 text-yellow-300'
                          }`}>
                            {campaign.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          ${campaign.spent.toFixed(2)} / ${campaign.budget.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {campaign.impressions.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {campaign.clicks.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {campaign.ctr.toFixed(2)}%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-yellow-400 hover:text-yellow-300">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              {campaign.status === 'active' ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Performance Reports</h3>
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-400">Performance charts would be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Billing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-md font-medium text-white mb-4">Account Balance</h4>
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${billingInfo.currentBalance.toFixed(2)}
                  </div>
                  <p className="text-gray-400 text-sm">Available credits: {billingInfo.credits}</p>
                  <Button className="mt-4">Add Funds</Button>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-md font-medium text-white mb-4">Monthly Spending</h4>
                  <div className="text-3xl font-bold text-green-500 mb-2">
                    ${billingInfo.monthlySpending.toFixed(2)}
                  </div>
                  <p className="text-gray-400 text-sm">Last 30 days</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Create New Campaign</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Campaign Name
                </label>
                <Input 
                  placeholder="Enter campaign name" 
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Budget ($)
                </label>
                <Input 
                  type="number" 
                  placeholder="Enter budget" 
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Target Audience
                </label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                >
                  <option>All Users</option>
                  <option>New Users</option>
                  <option>Returning Users</option>
                  <option>Premium Users</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ad Placement
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="dashboard" className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded" />
                    <label htmlFor="dashboard" className="ml-2 text-sm text-gray-300">Dashboard</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="landing" className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded" />
                    <label htmlFor="landing" className="ml-2 text-sm text-gray-300">Landing Page</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="email" className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded" />
                    <label htmlFor="email" className="ml-2 text-sm text-gray-300">Email Notifications</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button>Create Campaign</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(AdsManagerDashboard);