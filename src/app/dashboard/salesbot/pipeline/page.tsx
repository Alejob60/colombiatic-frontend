'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  PlusIcon, 
  FilterIcon, 
  SearchIcon,
  MoreHorizontalIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon
} from 'lucide-react';
import { useState } from 'react';

export default function PipelinePage() {
  const { t } = useTranslations();
  const [leads, setLeads] = useState([
    {
      id: '1',
      name: 'María González',
      company: 'Tech Solutions S.A.S',
      email: 'maria@techsolutions.com',
      phone: '+57 300 123 4567',
      stage: 'contacto',
      value: 5000000,
      lastContact: '2026-01-07',
      assignedTo: 'Carlos Rodríguez'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      company: 'Innovación Digital Ltda',
      email: 'juan@innovaciondigital.com',
      phone: '+57 310 987 6543',
      stage: 'presentacion',
      value: 12000000,
      lastContact: '2026-01-06',
      assignedTo: 'Ana Martínez'
    },
    {
      id: '3',
      name: 'Sofía López',
      company: 'Marketing Pro',
      email: 'sofia@marketingpro.com',
      phone: '+57 320 456 7890',
      stage: 'negociacion',
      value: 8500000,
      lastContact: '2026-01-07',
      assignedTo: 'Carlos Rodríguez'
    },
    {
      id: '4',
      name: 'Pedro Ramírez',
      company: 'E-commerce Global',
      email: 'pedro@ecommerceglobal.com',
      phone: '+57 315 246 8101',
      stage: 'cierre',
      value: 15000000,
      lastContact: '2026-01-08',
      assignedTo: 'Ana Martínez'
    }
  ]);

  const stages = [
    { id: 'contacto', title: t('salesbot.pipeline.stages.contact'), count: 12, color: 'bg-blue-500' },
    { id: 'presentacion', title: t('salesbot.pipeline.stages.presentation'), count: 8, color: 'bg-yellow-500' },
    { id: 'negociacion', title: t('salesbot.pipeline.stages.negotiation'), count: 5, color: 'bg-orange-500' },
    { id: 'cierre', title: t('salesbot.pipeline.stages.close'), count: 3, color: 'bg-green-500' }
  ];

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    
    // Actualizar el lead con la nueva etapa
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, stage: stageId } : lead
      )
    );
  };

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('salesbot.pipeline.title')}</h1>
          <p className="text-muted-foreground">{t('salesbot.pipeline.description')}</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {t('salesbot.pipeline.addLead')}
        </Button>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder={t('salesbot.pipeline.searchLeads')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          {t('salesbot.pipeline.filter')}
        </Button>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div 
            key={stage.id}
            className="bg-muted rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{stage.title}</h3>
              <span className="bg-background rounded-full px-2 py-1 text-sm">
                {stage.count}
              </span>
            </div>
            
            <div className="space-y-3">
              {getLeadsByStage(stage.id).map((lead) => (
                <Card 
                  key={lead.id}
                  className="cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{lead.name}</CardTitle>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{lead.company}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{formatCurrency(lead.value)}</span>
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{lead.assignedTo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{lead.lastContact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}