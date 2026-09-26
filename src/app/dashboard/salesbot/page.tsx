'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  KanbanIcon, 
  ZapIcon, 
  UsersIcon, 
  BellIcon,
  BarChartIcon,
  TargetIcon,
  TrendingUpIcon,
  DollarSignIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SalesbotDashboard() {
  const { t } = useTranslations();
  const router = useRouter();

  const modules = [
    {
      id: 'pipeline',
      title: t('salesbot.modules.pipeline'),
      description: t('salesbot.modules.pipelineDesc'),
      icon: KanbanIcon,
      path: '/dashboard/salesbot/pipeline'
    },
    {
      id: 'automations',
      title: t('salesbot.modules.automations'),
      description: t('salesbot.modules.automationsDesc'),
      icon: ZapIcon,
      path: '/dashboard/salesbot/automations'
    },
    {
      id: 'lead-assignment',
      title: t('salesbot.modules.leadAssignment'),
      description: t('salesbot.modules.leadAssignmentDesc'),
      icon: UsersIcon,
      path: '/dashboard/salesbot/lead-assignment'
    },
    {
      id: 'notifications',
      title: t('salesbot.modules.notifications'),
      description: t('salesbot.modules.notificationsDesc'),
      icon: BellIcon,
      path: '/dashboard/salesbot/notifications'
    }
  ];

  const stats = [
    {
      title: t('salesbot.stats.leads'),
      value: '24',
      change: '+12%',
      icon: TargetIcon,
      color: 'text-blue-500'
    },
    {
      title: t('salesbot.stats.deals'),
      value: '8',
      change: '+5%',
      icon: DollarSignIcon,
      color: 'text-green-500'
    },
    {
      title: t('salesbot.stats.conversion'),
      value: '33%',
      change: '+2%',
      icon: TrendingUpIcon,
      color: 'text-purple-500'
    },
    {
      title: t('salesbot.stats.revenue'),
      value: '$12.5M',
      change: '+18%',
      icon: BarChartIcon,
      color: 'text-orange-500'
    }
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('salesbot.title')}</h1>
        <p className="text-muted-foreground">{t('salesbot.description')}</p>
      </div>

      {/* Estadísticas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <span className="text-sm text-green-500 flex items-center">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Módulos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('salesbot.modules.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle>{t('salesbot.recentActivity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <TargetIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Nuevo lead asignado</p>
                <p className="text-sm text-muted-foreground">María González de Tech Solutions S.A.S asignada a Carlos Rodríguez</p>
                <p className="text-xs text-muted-foreground">Hace 10 minutos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500/10 p-2 rounded-full">
                <DollarSignIcon className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Negocio cerrado</p>
                <p className="text-sm text-muted-foreground">Juan Pérez de Innovación Digital Ltda - $2.5M</p>
                <p className="text-xs text-muted-foreground">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-500/10 p-2 rounded-full">
                <ZapIcon className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">Automatización ejecutada</p>
                <p className="text-sm text-muted-foreground">Asignación automática de leads completada</p>
                <p className="text-xs text-muted-foreground">Hace 4 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}