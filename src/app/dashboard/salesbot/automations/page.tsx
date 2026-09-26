'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  PlusIcon, 
  FilterIcon, 
  SearchIcon,
  PlayIcon,
  PauseIcon,
  EditIcon,
  TrashIcon,
  ClockIcon
} from 'lucide-react';
import { useState } from 'react';

export default function AutomationsPage() {
  const { t } = useTranslations();
  const [automations, setAutomations] = useState([
    {
      id: '1',
      name: 'Asignar leads nuevos',
      description: 'Asignar automáticamente leads nuevos al vendedor con menos leads asignados',
      status: 'active',
      trigger: 'Nuevo lead creado',
      action: 'Asignar a vendedor',
      lastRun: '2026-01-08 14:30',
      nextRun: '2026-01-09 09:00'
    },
    {
      id: '2',
      name: 'Seguimiento de leads inactivos',
      description: 'Enviar recordatorio a vendedores cuando un lead no ha sido contactado en 3 días',
      status: 'active',
      trigger: 'Lead sin actividad por 3 días',
      action: 'Notificar vendedor',
      lastRun: '2026-01-08 10:15',
      nextRun: '2026-01-09 10:15'
    },
    {
      id: '3',
      name: 'Actualizar etapa de negociación',
      description: 'Mover automáticamente leads a negociación después de 2 contactos exitosos',
      status: 'paused',
      trigger: '2 contactos positivos registrados',
      action: 'Mover a negociación',
      lastRun: '2026-01-07 16:45',
      nextRun: '-'
    }
  ]);

  const toggleAutomationStatus = (id: string) => {
    setAutomations(prev => 
      prev.map(automation => 
        automation.id === id 
          ? { 
              ...automation, 
              status: automation.status === 'active' ? 'paused' : 'active' 
            } 
          : automation
      )
    );
  };

  const handleEdit = (id: string) => {
    console.log(`Editar automatización ${id}`);
  };

  const handleDelete = (id: string) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('salesbot.automations.title')}</h1>
          <p className="text-muted-foreground">{t('salesbot.automations.description')}</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {t('salesbot.automations.createAutomation')}
        </Button>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t('salesbot.automations.searchAutomations')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          {t('salesbot.automations.filter')}
        </Button>
      </div>

      {/* Lista de automatizaciones */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-lg">{automation.name}</CardTitle>
                  <p className="text-muted-foreground">{automation.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleAutomationStatus(automation.id)}
                    className="gap-2"
                  >
                    {automation.status === 'active' ? (
                      <>
                        <PauseIcon className="h-4 w-4" />
                        {t('salesbot.automations.pause')}
                      </>
                    ) : (
                      <>
                        <PlayIcon className="h-4 w-4" />
                        {t('salesbot.automations.activate')}
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(automation.id)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(automation.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('salesbot.automations.status')}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    automation.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {automation.status === 'active' 
                      ? t('salesbot.automations.active') 
                      : t('salesbot.automations.paused')}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('salesbot.automations.trigger')}</p>
                  <p>{automation.trigger}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('salesbot.automations.action')}</p>
                  <p>{automation.action}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('salesbot.automations.nextRun')}</p>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{automation.nextRun}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tarjeta de explicación */}
      <Card>
        <CardHeader>
          <CardTitle>{t('salesbot.automations.howItWorks')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">{t('salesbot.automations.triggers')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('salesbot.automations.triggerNewLead')}</li>
                <li>• {t('salesbot.automations.triggerActivity')}</li>
                <li>• {t('salesbot.automations.triggerStageChange')}</li>
                <li>• {t('salesbot.automations.triggerTimeBased')}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{t('salesbot.automations.actions')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('salesbot.automations.actionAssign')}</li>
                <li>• {t('salesbot.automations.actionNotify')}</li>
                <li>• {t('salesbot.automations.actionMoveStage')}</li>
                <li>• {t('salesbot.automations.actionSendEmail')}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{t('salesbot.automations.conditions')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('salesbot.automations.conditionLeadSource')}</li>
                <li>• {t('salesbot.automations.conditionLeadValue')}</li>
                <li>• {t('salesbot.automations.conditionTimezone')}</li>
                <li>• {t('salesbot.automations.conditionCustomFields')}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}