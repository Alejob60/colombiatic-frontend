import { useState, useEffect } from 'react';

export interface ChatPreferences {
  theme: 'light' | 'dark' | 'auto';
  size: 'small' | 'medium' | 'large';
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  notifications: boolean;
  sound: boolean;
  language: 'es' | 'en' | 'pt';
}

const DEFAULT_PREFERENCES: ChatPreferences = {
  theme: 'auto',
  size: 'medium',
  position: 'bottom-right',
  notifications: true,
  sound: true,
  language: 'es'
};

export const useChatPreferences = () => {
  const [preferences, setPreferences] = useState<ChatPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar preferencias desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('colombiatic_chat_preferences');
      if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        // Validar que las preferencias tengan la estructura correcta
        const validPreferences: ChatPreferences = {
          theme: ['light', 'dark', 'auto'].includes(parsedPreferences.theme) 
            ? parsedPreferences.theme 
            : DEFAULT_PREFERENCES.theme,
          size: ['small', 'medium', 'large'].includes(parsedPreferences.size) 
            ? parsedPreferences.size 
            : DEFAULT_PREFERENCES.size,
          position: ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(parsedPreferences.position) 
            ? parsedPreferences.position 
            : DEFAULT_PREFERENCES.position,
          notifications: typeof parsedPreferences.notifications === 'boolean' 
            ? parsedPreferences.notifications 
            : DEFAULT_PREFERENCES.notifications,
          sound: typeof parsedPreferences.sound === 'boolean' 
            ? parsedPreferences.sound 
            : DEFAULT_PREFERENCES.sound,
          language: ['es', 'en', 'pt'].includes(parsedPreferences.language) 
            ? parsedPreferences.language 
            : DEFAULT_PREFERENCES.language
        };
        setPreferences(validPreferences);
      }
    } catch (error) {
      console.warn('Error loading chat preferences:', error);
      setPreferences(DEFAULT_PREFERENCES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar preferencias en localStorage cuando cambian
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('colombiatic_chat_preferences', JSON.stringify(preferences));
      } catch (error) {
        console.warn('Error saving chat preferences:', error);
      }
    }
  }, [preferences, isLoading]);

  const updatePreferences = (newPreferences: Partial<ChatPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  // Determinar el tema real basado en la preferencia y el sistema
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (preferences.theme === 'light') return 'light';
    if (preferences.theme === 'dark') return 'dark';
    
    // Auto mode - detectar preferencia del sistema
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light';
  };

  // Obtener clases CSS basadas en el tamaño
  const getSizeClasses = (): string => {
    switch (preferences.size) {
      case 'small':
        return 'w-80 h-96';
      case 'large':
        return 'w-96 h-[600px]';
      case 'medium':
      default:
        return 'w-96 h-[500px]';
    }
  };

  // Obtener clases CSS basadas en la posición
  const getPositionClasses = (): string => {
    switch (preferences.position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };

  return {
    preferences,
    isLoading,
    updatePreferences,
    resetPreferences,
    getEffectiveTheme,
    getSizeClasses,
    getPositionClasses
  };
};