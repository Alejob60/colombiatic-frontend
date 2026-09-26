import React, { useState, useEffect } from 'react';
import NotificationToast from './NotificationToast';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationContainerProps {
  className?: string;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  className = ''
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      id,
      type,
      title,
      message,
      duration
    };

    setNotifications(prev => [...prev, notification]);

    // Eliminar la notificación automáticamente después de su duración
    if (duration !== 0) { // 0 significa que no se elimina automáticamente
      setTimeout(() => {
        removeNotification(id);
      }, duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Exponer métodos globalmente para que otros componentes puedan usarlos
  useEffect(() => {
    // @ts-ignore
    window.addNotification = addNotification;
    
    return () => {
      // @ts-ignore
      delete window.addNotification;
    };
  }, []);

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-2 ${className}`}>
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          id={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;