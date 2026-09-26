// src/components/ads/AdsReport.tsx
// Ads Performance Reporting Component

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer,
  Calendar
} from 'lucide-react';

interface ReportData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

interface AdsReportProps {
  campaignId?: string;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

const AdsReport: React.FC<AdsReportProps> = ({ campaignId, onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Mock report data
  const reportData: ReportData[] = [
    { date: '2025-11-01', impressions: 1200, clicks: 45, conversions: 3, spend: 25.50 },
    { date: '2025-11-02', impressions: 1500, clicks: 52, conversions: 4, spend: 28.75 },
    { date: '2025-11-03', impressions: 1100, clicks: 38, conversions: 2, spend: 21.25 },
    { date: '2025-11-04', impressions: 1800, clicks: 67, conversions: 5, spend: 35.00 },
    { date: '2025-11-05', impressions: 1400, clicks: 51, conversions: 4, spend: 29.50 },
    { date: '2025-11-06', impressions: 1600, clicks: 58, conversions: 6, spend: 32.25 },
    { date: '2025-11-07', impressions: 1300, clicks: 47, conversions: 3, spend: 26.75 },
  ];

  // Calculate totals
  const totals = reportData.reduce((acc, data) => ({
    impressions: acc.impressions + data.impressions,
    clicks: acc.clicks + data.clicks,
    conversions: acc.conversions + data.conversions,
    spend: acc.spend + data.spend
  }), { impressions: 0, clicks: 0, conversions: 0, spend: 0 });

  // Calculate averages
  const averages = {
    ctr: ((totals.clicks / totals.impressions) * 100).toFixed(2),
    conversionRate: ((totals.conversions / totals.clicks) * 100).toFixed(2),
    cpc: (totals.spend / totals.clicks).toFixed(2),
    cpm: ((totals.spend / totals.impressions) * 1000).toFixed(2)
  };

  const handleDateRangeChange = (range: '7d' | '30d' | '90d') => {
    setDateRange(range);
    // In a real implementation, this would fetch new data
  };

  const handleCustomDateApply = () => {
    if (onDateRangeChange && customStartDate && customEndDate) {
      onDateRangeChange(customStartDate, customEndDate);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-lg font-medium text-white mb-4 md:mb-0">Performance Report</h3>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDateRangeChange('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={dateRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDateRangeChange('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={dateRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDateRangeChange('90d')}
          >
            90 Days
          </Button>
          
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
            />
            <Button
              size="sm"
              onClick={handleCustomDateApply}
              disabled={!customStartDate || !customEndDate}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Impressions</p>
              <p className="text-xl font-bold">{totals.impressions.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center">
            <MousePointer className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Clicks</p>
              <p className="text-xl font-bold">{totals.clicks.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">CTR</p>
              <p className="text-xl font-bold">{averages.ctr}%</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Spend</p>
              <p className="text-xl font-bold">${totals.spend.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="text-md font-medium text-white mb-3">Conversion Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Conversions</span>
              <span className="text-white">{totals.conversions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="text-white">{averages.conversionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cost Per Conversion</span>
              <span className="text-white">${(totals.spend / totals.conversions).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="text-md font-medium text-white mb-3">Cost Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Spend</span>
              <span className="text-white">${totals.spend.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg. CPC</span>
              <span className="text-white">${averages.cpc}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg. CPM</span>
              <span className="text-white">${averages.cpm}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="text-md font-medium text-white mb-3">Engagement</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Impressions</span>
              <span className="text-white">{totals.impressions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Clicks</span>
              <span className="text-white">{totals.clicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CTR</span>
              <span className="text-white">{averages.ctr}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h4 className="text-md font-medium text-white mb-4">Performance Over Time</h4>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">Performance chart visualization would be displayed here</p>
        </div>
      </div>

      {/* Data Table */}
      <div>
        <h4 className="text-md font-medium text-white mb-4">Daily Performance</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Impressions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Clicks</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CTR</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reportData.map((data, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {data.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {data.impressions.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {data.clicks}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {((data.clicks / data.impressions) * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {data.conversions}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    ${data.spend.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdsReport;