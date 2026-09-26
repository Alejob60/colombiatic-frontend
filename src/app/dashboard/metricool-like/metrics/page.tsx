'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  BarChartIcon, 
  TrendingUpIcon,
  EyeIcon,
  HeartIcon,
  MessageSquareIcon,
  ShareIcon,
  FilterIcon,
  DownloadIcon
} from 'lucide-react';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';
import { socialMetricsService, SocialMetrics } from '@/services/socialMediaService';

export default function MetricsPage() {
  const { t } = useTranslations();
  const [metrics, setMetrics] = useState<SocialMetrics | null>(null);
  
  // Cargar métricas desde la API
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const fetchedMetrics = await socialMetricsService.getMetrics();
        setMetrics(fetchedMetrics);
      } catch (error) {
        console.error('Error loading metrics:', error);
        // Fallback a datos de ejemplo si la API falla
        setMetrics({
          totalReach: 24500,
          engagement: 3200,
          interactions: 1800,
          shares: 856,
          followerGrowth: [
            { name: 'Sem 1', followers: 4000 },
            { name: 'Sem 2', followers: 3000 },
            { name: 'Sem 3', followers: 2000 },
            { name: 'Sem 4', followers: 2780 },
          ],
          engagementByPlatform: [
            { name: 'Lun', facebook: 4000, instagram: 2400, twitter: 2400 },
            { name: 'Mar', facebook: 3000, instagram: 1398, twitter: 2210 },
            { name: 'Mié', facebook: 2000, instagram: 9800, twitter: 2290 },
            { name: 'Jue', facebook: 2780, instagram: 3908, twitter: 2000 },
            { name: 'Vie', facebook: 1890, instagram: 4800, twitter: 2181 },
            { name: 'Sáb', facebook: 2390, instagram: 3800, twitter: 2500 },
            { name: 'Dom', facebook: 3490, instagram: 4300, twitter: 2100 },
          ]
        });
      }
    };
    
    loadMetrics();
  }, []);
  
  const metricsData = metrics ? [
    {
      title: t('metricoolLike.metrics.totalReach'),
      value: `${(metrics.totalReach / 1000).toFixed(1)}K`,
      change: '+12%',
      icon: EyeIcon,
      color: 'text-blue-500'
    },
    {
      title: t('metricoolLike.metrics.engagement'),
      value: `${(metrics.engagement / 1000).toFixed(1)}K`,
      change: '+8%',
      icon: HeartIcon,
      color: 'text-red-500'
    },
    {
      title: t('metricoolLike.metrics.interactions'),
      value: `${(metrics.interactions / 1000).toFixed(1)}K`,
      change: '+15%',
      icon: MessageSquareIcon,
      color: 'text-green-500'
    },
    {
      title: t('metricoolLike.metrics.shares'),
      value: metrics.shares.toString(),
      change: '+5%',
      icon: ShareIcon,
      color: 'text-purple-500'
    }
  ] : [];

  const handleExport = () => {
    console.log('Exportar datos');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('metricoolLike.metrics.title')}</h1>
          <p className="text-muted-foreground">{t('metricoolLike.metrics.description')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            {t('metricoolLike.metrics.filter')}
          </Button>
          <Button className="gap-2" onClick={handleExport}>
            <DownloadIcon className="h-4 w-4" />
            {t('metricoolLike.metrics.export')}
          </Button>
        </div>
      </div>

      {/* Métricas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <span className="text-sm text-green-500 flex items-center">
                        <TrendingUpIcon className="h-3 w-3 mr-1" />
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement por plataforma */}
        <Card>
          <CardHeader>
            <CardTitle>{t('metricoolLike.metrics.engagementByPlatform')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics?.engagementByPlatform || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="facebook" fill="#3b82f6" name="Facebook" />
                <Bar dataKey="instagram" fill="#ec4899" name="Instagram" />
                <Bar dataKey="twitter" fill="#0ea5e9" name="Twitter" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crecimiento de seguidores */}
        <Card>
          <CardHeader>
            <CardTitle>{t('metricoolLike.metrics.followerGrowth')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics?.followerGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#10b981" 
                  name={t('metricoolLike.metrics.followers')}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Comparativa de rendimiento */}
      <Card>
        <CardHeader>
          <CardTitle>{t('metricoolLike.metrics.performanceComparison')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">{t('metricoolLike.metrics.platform')}</th>
                  <th className="text-right py-2">{t('metricoolLike.metrics.reach')}</th>
                  <th className="text-right py-2">{t('metricoolLike.metrics.engagementRate')}</th>
                  <th className="text-right py-2">{t('metricoolLike.metrics.interactions')}</th>
                  <th className="text-right py-2">{t('metricoolLike.metrics.shares')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Facebook
                    </div>
                  </td>
                  <td className="text-right py-3">12.3K</td>
                  <td className="text-right py-3">4.2%</td>
                  <td className="text-right py-3">856</td>
                  <td className="text-right py-3">321</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      Instagram
                    </div>
                  </td>
                  <td className="text-right py-3">8.7K</td>
                  <td className="text-right py-3">6.8%</td>
                  <td className="text-right py-3">642</td>
                  <td className="text-right py-3">289</td>
                </tr>
                <tr>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                      Twitter
                    </div>
                  </td>
                  <td className="text-right py-3">3.5K</td>
                  <td className="text-right py-3">3.1%</td>
                  <td className="text-right py-3">302</td>
                  <td className="text-right py-3">246</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}