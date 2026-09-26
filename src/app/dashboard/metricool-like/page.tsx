'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CalendarIcon, 
  MessageSquareIcon, 
  BarChartIcon, 
  LinkIcon, 
  FileTextIcon,
  PlusIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MetricoolLikeDashboard() {
  const { t } = useTranslations();
  const router = useRouter();

  const modules = [
    {
      id: 'scheduler',
      title: t('metricoolLike.scheduler.title'),
      description: t('metricoolLike.scheduler.description'),
      icon: CalendarIcon,
      path: '/dashboard/metricool-like/scheduler'
    },
    {
      id: 'inbox',
      title: t('metricoolLike.inbox.title'),
      description: t('metricoolLike.inbox.description'),
      icon: MessageSquareIcon,
      path: '/dashboard/metricool-like/inbox'
    },
    {
      id: 'metrics',
      title: t('metricoolLike.metrics.title'),
      description: t('metricoolLike.metrics.description'),
      icon: BarChartIcon,
      path: '/dashboard/metricool-like/metrics'
    },
    {
      id: 'smartlinks',
      title: t('metricoolLike.smartlinks.title'),
      description: t('metricoolLike.smartlinks.description'),
      icon: LinkIcon,
      path: '/dashboard/metricool-like/smartlinks'
    },
    {
      id: 'reports',
      title: t('metricoolLike.reports.title'),
      description: t('metricoolLike.reports.description'),
      icon: FileTextIcon,
      path: '/dashboard/metricool-like/reports'
    }
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('metricoolLike.title')}</h1>
          <p className="text-muted-foreground">{t('metricoolLike.description')}</p>
        </div>
        <Button onClick={() => handleNavigate('/dashboard/metricool-like/scheduler')} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {t('metricoolLike.newPost')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card 
              key={module.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleNavigate(module.path)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                  {module.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('metricoolLike.summary.postsScheduled')}</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('metricoolLike.summary.pendingComments')}</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MessageSquareIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('metricoolLike.summary.totalClicks')}</p>
                <p className="text-2xl font-bold">1.2K</p>
              </div>
              <LinkIcon className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('metricoolLike.summary.engagementRate')}</p>
                <p className="text-2xl font-bold">4.8%</p>
              </div>
              <BarChartIcon className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}