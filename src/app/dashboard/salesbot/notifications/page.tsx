'use client';

import { useTranslations } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  BellIcon, 
  FilterIcon, 
  SearchIcon,
  SettingsIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MailIcon,
  SmartphoneIcon
} from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const { t } = useTranslations();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nuevo lead asignado',
      description: 'Se te ha asignado un nuevo lead: María González de Tech Solutions S.A.S',
      type: 'lead_assignment',
      status: 'unread',
      priority: 'high',
      createdAt: '2026-01-08 14:30',
      channel: 'email'
    },
    {
      id: '2',
      title: 'Recordatorio de seguimiento',
      description: 'Sigue con el lead Juan Pérez de Innovación Digital Ltda',
      type: 'follow_up',
      status: 'unread',
      priority: 'medium',
      createdAt: '2026-01-08 10:15',
      channel: 'push'
    },
    {
      id: '3',
      title: 'Meta alcanzada',
      description: '¡Felicidades! Has alcanzado tu meta mensual de ventas',
      type: 'achievement',
      status: 'read',
      priority: 'low',
      createdAt: '2026-01-07 16:45',
      channel: 'email'
    }
  ]);

  const [reminders, setReminders] = useState([
    {
      id: '1',
      title: 'Seguimiento con María González',
      description: 'Llamar para presentar propuesta comercial',
      dueDate: '2026-01-09 10:00',
      priority: 'high',
      completed: false
    },
    {
      id: '2',
      title: 'Enviar cotización a Juan Pérez',
      description: 'Preparar y enviar cotización detallada',
      dueDate: '2026-01-09 15:00',
      priority: 'medium',
      completed: false
    },
    {
      id: '3',
      title: 'Reunión con equipo de ventas',
      description: 'Revisar estrategias para el próximo trimestre',
      dueDate: '2026-01-10 09:00',
      priority: 'medium',
      completed: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'read' } 
          : notification
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'unread' } 
          : notification
      )
    );
  };

  const toggleReminderCompletion = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed } 
          : reminder
      )
    );
  };

  const handleSettings = () => {
    console.log('Abrir configuración de notificaciones');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('salesbot.notifications.title')}</h1>
          <p className="text-muted-foreground">{t('salesbot.notifications.description')}</p>
        </div>
        <Button onClick={handleSettings} className="gap-2">
          <SettingsIcon className="h-4 w-4" />
          {t('salesbot.notifications.settings')}
        </Button>
      </div>

      {/* Notificaciones */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('salesbot.notifications.notifications')}</h2>
          <div className="flex gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder={t('salesbot.notifications.searchNotifications')}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              {t('salesbot.notifications.filter')}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={notification.status === 'unread' ? 'border-primary' : ''}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-start gap-3">
                    <BellIcon className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-lg">{notification.title}</CardTitle>
                      <p className="text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      notification.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : notification.priority === 'medium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {notification.priority === 'high' 
                        ? t('salesbot.notifications.highPriority') 
                        : notification.priority === 'medium' 
                          ? t('salesbot.notifications.mediumPriority') 
                          : t('salesbot.notifications.lowPriority')}
                    </span>
                    {notification.status === 'unread' ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsUnread(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <XCircleIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{notification.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {notification.channel === 'email' ? (
                      <MailIcon className="h-4 w-4" />
                    ) : (
                      <SmartphoneIcon className="h-4 w-4" />
                    )}
                    <span>
                      {notification.channel === 'email' 
                        ? t('salesbot.notifications.email') 
                        : t('salesbot.notifications.push')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recordatorios */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('salesbot.notifications.reminders')}</h2>
          <Button className="gap-2">
            <ClockIcon className="h-4 w-4" />
            {t('salesbot.notifications.addReminder')}
          </Button>
        </div>
        
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => toggleReminderCompletion(reminder.id)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <CardTitle className={`text-lg ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {reminder.title}
                      </CardTitle>
                      <p className={`${reminder.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {reminder.description}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reminder.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : reminder.priority === 'medium' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {reminder.priority === 'high' 
                      ? t('salesbot.notifications.highPriority') 
                      : reminder.priority === 'medium' 
                        ? t('salesbot.notifications.mediumPriority') 
                        : t('salesbot.notifications.lowPriority')}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClockIcon className="h-4 w-4" />
                  <span>{t('salesbot.notifications.dueDate')}: {reminder.dueDate}</span>
                  {reminder.completed && (
                    <span className="ml-2 text-green-600">
                      {t('salesbot.notifications.completed')}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Configuración de notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>{t('salesbot.notifications.notificationSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">{t('salesbot.notifications.emailNotifications')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('salesbot.notifications.leadAssignments')}</p>
                    <p className="text-sm text-muted-foreground">{t('salesbot.notifications.leadAssignmentsDesc')}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('salesbot.notifications.enabled')}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('salesbot.notifications.followUps')}</p>
                    <p className="text-sm text-muted-foreground">{t('salesbot.notifications.followUpsDesc')}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('salesbot.notifications.enabled')}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('salesbot.notifications.achievements')}</p>
                    <p className="text-sm text-muted-foreground">{t('salesbot.notifications.achievementsDesc')}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('salesbot.notifications.enabled')}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t('salesbot.notifications.pushNotifications')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('salesbot.notifications.reminders')}</p>
                    <p className="text-sm text-muted-foreground">{t('salesbot.notifications.remindersDesc')}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('salesbot.notifications.enabled')}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('salesbot.notifications.teamUpdates')}</p>
                    <p className="text-sm text-muted-foreground">{t('salesbot.notifications.teamUpdatesDesc')}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('salesbot.notifications.enabled')}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('salesbot.notifications.systemAlerts')}</p>
                    <p className="text-sm text-muted-foreground">{t('salesbot.notifications.systemAlertsDesc')}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('salesbot.notifications.enabled')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}