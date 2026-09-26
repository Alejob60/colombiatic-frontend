// src/components/layout/DashboardNavbar.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown,
  Menu,
  MessageSquare,
  Home,
  BarChart3,
  Package,
  ShoppingBag,
  LifeBuoy,
  BookOpen
} from 'lucide-react';

interface DashboardNavbarProps {
  toggleMenu: () => void;
  toggleChat: () => void;
}

export default function DashboardNavbar({ toggleMenu, toggleChat }: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Get page title based on current route
  const getPageTitle = () => {
    const routes: { [key: string]: string } = {
      '/dashboard': 'Dashboard Principal',
      '/dashboard/analytics': 'Analytics',
      '/dashboard/users': 'Gestión de Usuarios',
      '/dashboard/settings': 'Configuración',
      '/dashboard/security': 'Seguridad',
      '/dashboard/channels': 'Canales',
      '/dashboard/marketplace': 'Marketplace',
      '/dashboard/data-governance': 'Gobernanza de Datos',
      '/dashboard/legal': 'Legal & Compliance',
      '/dashboard/monitoring': 'Monitoreo',
    };

    // Find matching route
    for (const [route, title] of Object.entries(routes)) {
      if (pathname?.includes(route)) {
        return title;
      }
    }

    return 'Dashboard';
  };

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}/login`);
  };

  // Función para navegar con el prefijo de idioma
  const navigateWithLocale = (path: string) => {
    router.push(`/${locale}${path}`);
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Menu Toggle + Page Title */}
          <div className="flex items-center gap-4">
            <button 
              className="menu-toggle md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
            
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Center Section: Search (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('dashboard.search') || 'Buscar...'}
              />
            </div>
          </div>

          {/* Right Section: Actions + User Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Chat Toggle (Mobile) */}
            <button 
              className="chat-toggle md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={toggleChat}
              aria-label="Toggle chat"
            >
              <MessageSquare className="w-5 h-5 text-gray-300" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">Nueva conversación iniciada</p>
                      <p className="text-xs text-gray-400 mt-1">Hace 5 minutos</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">Actualización del sistema</p>
                      <p className="text-xs text-gray-400 mt-1">Hace 1 hora</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">Nuevo usuario registrado</p>
                      <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-700">
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white truncate max-w-32">
                    {user?.name || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-32">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{user?.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-400">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <button
                    onClick={() => navigateWithLocale('/dashboard')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Dashboard Principal
                  </button>
                  
                  <button
                    onClick={() => navigateWithLocale('/dashboard/my-services')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Mis Servicios
                  </button>
                  
                  <button
                    onClick={() => navigateWithLocale('/dashboard/products')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Marketplace
                  </button>
                  
                  <button
                    onClick={() => navigateWithLocale('/dashboard/analytics')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Analítica
                  </button>
                  
                  <button
                    onClick={() => navigateWithLocale('/dashboard/settings')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configuración
                  </button>
                  
                  <button
                    onClick={() => navigateWithLocale('/dashboard/help')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Centro de Ayuda
                  </button>

                  <div className="border-t border-gray-700 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('dashboard.search') || 'Buscar...'}
          />
        </div>
      </div>
    </nav>
  );
}