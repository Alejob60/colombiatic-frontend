import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationToastProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  className?: string;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  className = ''
}) => {
  const typeStyles = {
    success: {
      container: 'bg-green-900/90 border-green-800',
      icon: 'text-green-400',
      iconBg: 'bg-green-900/50',
      title: 'text-green-100',
      message: 'text-green-200'
    },
    error: {
      container: 'bg-red-900/90 border-red-800',
      icon: 'text-red-400',
      iconBg: 'bg-red-900/50',
      title: 'text-red-100',
      message: 'text-red-200'
    },
    warning: {
      container: 'bg-yellow-900/90 border-yellow-800',
      icon: 'text-yellow-400',
      iconBg: 'bg-yellow-900/50',
      title: 'text-yellow-100',
      message: 'text-yellow-200'
    },
    info: {
      container: 'bg-blue-900/90 border-blue-800',
      icon: 'text-blue-400',
      iconBg: 'bg-blue-900/50',
      title: 'text-blue-100',
      message: 'text-blue-200'
    }
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info
  };

  const IconComponent = icons[type];
  const styles = typeStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div 
      className={`border rounded-lg p-4 shadow-lg backdrop-blur-sm ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${styles.iconBg}`}>
          <IconComponent className={`w-5 h-5 ${styles.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${styles.title}`}>{title}</h4>
          {message && (
            <p className={`text-sm mt-1 ${styles.message}`}>{message}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="p-1 rounded hover:bg-black/20 text-gray-400 hover:text-gray-200"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;