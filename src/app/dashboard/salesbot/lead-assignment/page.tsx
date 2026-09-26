'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  PlusIcon, 
  FilterIcon, 
  SearchIcon,
  UsersIcon,
  SettingsIcon,
  RotateCcwIcon
} from 'lucide-react';
import { useState } from 'react';

export default function LeadAssignmentPage() {
  const { t } = useTranslations();
  const [assignmentRules, setAssignmentRules] = useState([
    {
      id: '1',
      name: 'Asignación por territorio',
      description: 'Asignar leads según la ubicación geográfica del cliente',
      status: 'active',
      criteria: [
        { field: 'country', operator: 'equals', value: 'Colombia' },
        { field: 'city', operator: 'equals', value: 'Bogotá' }
      ],
      assignee: 'Carlos Rodríguez',
      priority: 1
    },
    {
      id: '2',
      name: 'Asignación por valor',
      description: 'Asignar leads de alto valor a vendedores senior',
      status: 'active',
      criteria: [
        { field: 'leadValue', operator: 'greater_than', value: '10000000' }
      ],
      assignee: 'Ana Martínez',
      priority: 2
    },
    {
      id: '3',
      name: 'Asignación round-robin',
      description: 'Distribuir leads equitativamente entre todos los vendedores',
      status: 'active',
      criteria: [],
      assignee: 'Rotación automática',
      priority: 3
    }
  ]);

  const [salesReps] = useState([
    { id: '1', name: 'Carlos Rodríguez', leads: 12, capacity: 20 },
    { id: '2', name: 'Ana Martínez', leads: 8, capacity: 15 },
    { id: '3', name: 'Pedro Gómez', leads: 15, capacity: 20 },
    { id: '4', name: 'Laura Torres', leads: 6, capacity: 15 }
  ]);

  const handleToggleRule = (id: string) => {
    setAssignmentRules(prev => 
      prev.map(rule => 
        rule.id === id 
          ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' } 
          : rule
      )
    );
  };

  const handleEditRule = (id: string) => {
    console.log(`Editar regla ${id}`);
  };

  const handleDeleteRule = (id: string) => {
    setAssignmentRules(prev => prev.filter(rule => rule.id !== id));
  };

  const handleAddRule = () => {
    console.log('Agregar nueva regla');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('salesbot.leadAssignment.title')}</h1>
          <p className="text-muted-foreground">{t('salesbot.leadAssignment.description')}</p>
        </div>
        <Button onClick={handleAddRule} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          {t('salesbot.leadAssignment.addRule')}
        </Button>
      </div>

      {/* Vista general de vendedores */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('salesbot.leadAssignment.salesTeam')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {salesReps.map((rep) => (
            <Card key={rep.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5" />
                  {rep.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('salesbot.leadAssignment.leadsAssigned')}</span>
                    <span className="font-medium">{rep.leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t('salesbot.leadAssignment.capacity')}</span>
                    <span className="font-medium">{rep.capacity}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(rep.leads / rep.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reglas de asignación */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('salesbot.leadAssignment.assignmentRules')}</h2>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            {t('salesbot.leadAssignment.filter')}
          </Button>
        </div>
        
        <div className="space-y-4">
          {assignmentRules.map((rule) => (
            <Card key={rule.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <p className="text-muted-foreground">{rule.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleToggleRule(rule.id)}
                    >
                      {rule.status === 'active' ? t('salesbot.leadAssignment.deactivate') : t('salesbot.leadAssignment.activate')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditRule(rule.id)}>
                      <SettingsIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                      <RotateCcwIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('salesbot.leadAssignment.status')}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rule.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.status === 'active' 
                        ? t('salesbot.leadAssignment.active') 
                        : t('salesbot.leadAssignment.inactive')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('salesbot.leadAssignment.criteria')}</p>
                    {rule.criteria.length > 0 ? (
                      <ul className="text-sm space-y-1">
                        {rule.criteria.map((criterion, index) => (
                          <li key={index}>
                            {criterion.field} {criterion.operator} {criterion.value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">{t('salesbot.leadAssignment.noCriteria')}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('salesbot.leadAssignment.assignee')}</p>
                    <p>{rule.assignee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Configuración de balanceo de carga */}
      <Card>
        <CardHeader>
          <CardTitle>{t('salesbot.leadAssignment.loadBalancing')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">{t('salesbot.leadAssignment.balanceMethod')}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="round-robin" 
                    name="balance-method" 
                    className="mr-2" 
                    defaultChecked 
                  />
                  <label htmlFor="round-robin">{t('salesbot.leadAssignment.roundRobin')}</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="weighted" 
                    name="balance-method" 
                    className="mr-2" 
                  />
                  <label htmlFor="weighted">{t('salesbot.leadAssignment.weighted')}</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="skill-based" 
                    name="balance-method" 
                    className="mr-2" 
                  />
                  <label htmlFor="skill-based">{t('salesbot.leadAssignment.skillBased')}</label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">{t('salesbot.leadAssignment.settings')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('salesbot.leadAssignment.maxLeadsPerRep')}
                  </label>
                  <input 
                    type="number" 
                    defaultValue="20" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('salesbot.leadAssignment.responseTimeTarget')}
                  </label>
                  <input 
                    type="number" 
                    defaultValue="24" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('salesbot.leadAssignment.hours')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>{t('salesbot.leadAssignment.saveSettings')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}