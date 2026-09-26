// src/components/ads/CampaignBuilder.tsx
// Campaign Builder Wizard Component

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CampaignBuilderProps {
  onCancel: () => void;
  onSubmit: (campaignData: any) => void;
}

const CampaignBuilder: React.FC<CampaignBuilderProps> = ({ onCancel, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    objective: 'awareness',
    budget: 100,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targeting: {
      audience: 'all',
      locations: ['US'],
      devices: ['desktop', 'mobile']
    },
    creatives: [] as any[]
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit(campaignData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateCampaignData = (field: string, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTargeting = (field: string, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= num ? 'bg-primary text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              {num}
            </div>
            {num < 4 && (
              <div className={`h-1 w-16 mx-2 ${
                step > num ? 'bg-primary' : 'bg-gray-700'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Campaign Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Campaign Name
                </label>
                <Input
                  value={campaignData.name}
                  onChange={(e) => updateCampaignData('name', e.target.value)}
                  placeholder="Enter campaign name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Campaign Objective
                </label>
                <select
                  value={campaignData.objective}
                  onChange={(e) => updateCampaignData('objective', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="awareness">Brand Awareness</option>
                  <option value="traffic">Website Traffic</option>
                  <option value="engagement">Engagement</option>
                  <option value="conversion">Conversions</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Daily Budget ($)
                </label>
                <Input
                  type="number"
                  value={campaignData.budget}
                  onChange={(e) => updateCampaignData('budget', Number(e.target.value))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Schedule</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={campaignData.startDate}
                  onChange={(e) => updateCampaignData('startDate', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  End Date
                </label>
                <Input
                  type="date"
                  value={campaignData.endDate}
                  onChange={(e) => updateCampaignData('endDate', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Targeting</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Audience
                </label>
                <select
                  value={campaignData.targeting.audience}
                  onChange={(e) => updateTargeting('audience', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Users</option>
                  <option value="new">New Users</option>
                  <option value="returning">Returning Users</option>
                  <option value="premium">Premium Users</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Locations
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="us"
                      checked={campaignData.targeting.locations.includes('US')}
                      onChange={(e) => {
                        const locations = e.target.checked
                          ? [...campaignData.targeting.locations, 'US']
                          : campaignData.targeting.locations.filter(loc => loc !== 'US');
                        updateTargeting('locations', locations);
                      }}
                      className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="us" className="ml-2 text-sm text-gray-300">United States</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="eu"
                      checked={campaignData.targeting.locations.includes('EU')}
                      onChange={(e) => {
                        const locations = e.target.checked
                          ? [...campaignData.targeting.locations, 'EU']
                          : campaignData.targeting.locations.filter(loc => loc !== 'EU');
                        updateTargeting('locations', locations);
                      }}
                      className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="eu" className="ml-2 text-sm text-gray-300">European Union</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="latam"
                      checked={campaignData.targeting.locations.includes('LATAM')}
                      onChange={(e) => {
                        const locations = e.target.checked
                          ? [...campaignData.targeting.locations, 'LATAM']
                          : campaignData.targeting.locations.filter(loc => loc !== 'LATAM');
                        updateTargeting('locations', locations);
                      }}
                      className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="latam" className="ml-2 text-sm text-gray-300">Latin America</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Devices
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="desktop"
                      checked={campaignData.targeting.devices.includes('desktop')}
                      onChange={(e) => {
                        const devices = e.target.checked
                          ? [...campaignData.targeting.devices, 'desktop']
                          : campaignData.targeting.devices.filter(dev => dev !== 'desktop');
                        updateTargeting('devices', devices);
                      }}
                      className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="desktop" className="ml-2 text-sm text-gray-300">Desktop</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="mobile"
                      checked={campaignData.targeting.devices.includes('mobile')}
                      onChange={(e) => {
                        const devices = e.target.checked
                          ? [...campaignData.targeting.devices, 'mobile']
                          : campaignData.targeting.devices.filter(dev => dev !== 'mobile');
                        updateTargeting('devices', devices);
                      }}
                      className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="mobile" className="ml-2 text-sm text-gray-300">Mobile</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tablet"
                      checked={campaignData.targeting.devices.includes('tablet')}
                      onChange={(e) => {
                        const devices = e.target.checked
                          ? [...campaignData.targeting.devices, 'tablet']
                          : campaignData.targeting.devices.filter(dev => dev !== 'tablet');
                        updateTargeting('devices', devices);
                      }}
                      className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded"
                    />
                    <label htmlFor="tablet" className="ml-2 text-sm text-gray-300">Tablet</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Review & Launch</h3>
            <div className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Campaign Name:</span>
                <span className="text-white">{campaignData.name || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Objective:</span>
                <span className="text-white capitalize">{campaignData.objective}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Budget:</span>
                <span className="text-white">${campaignData.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{campaignData.startDate} to {campaignData.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Audience:</span>
                <span className="text-white capitalize">{campaignData.targeting.audience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Locations:</span>
                <span className="text-white">{campaignData.targeting.locations.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Devices:</span>
                <span className="text-white capitalize">{campaignData.targeting.devices.join(', ')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
        >
          {step === 4 ? 'Launch Campaign' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignBuilder;