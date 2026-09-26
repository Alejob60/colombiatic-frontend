// src/app/dashboard/layout.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/lib/i18n';
import RightPanelChat from '@/components/landing/RightPanelChat';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const { t } = useTranslations();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acceso denegado</h1>
          <p className="text-gray-400 mb-6">Debes iniciar sesión para acceder al panel de control</p>
          <Link href="/login" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  // Navegación del dashboard
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'IA Omnichannel', href: '/dashboard/ia-omnichannel', icon: '🤖' },
    { name: 'Web Builder', href: '/dashboard/web-builder', icon: '🌐' },
    { name: 'Social Media', href: '/dashboard/social-media', icon: '📱' },
    { name: 'Pipeline', href: '/dashboard/pipeline', icon: '🔄' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { name: 'Modules', href: '/dashboard/modules', icon: '🧩' },
    { name: 'Profile', href: '/profile', icon: '👤' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[#0C1116]">
      {/* Barra de navegación superior */}
      <nav className="bg-surface border-b border-gray-800 fixed w-full top-0 z-40" style={{ backgroundColor: '#1A2633' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-primary">
                ColombiaTIC
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Versión desktop - Layout triple panel: sidebar + contenido + chat */}
      <div className="hidden md:flex pt-16">
        {/* Sidebar de navegación */}
        <div className="w-64 bg-surface min-h-screen border-r border-gray-800 fixed top-16 left-0 h-[calc(100vh-64px)]">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Panel central - Contenido con scroll */}
        <div className="flex-1 overflow-y-auto ml-64 pr-[380px] pt-6">
          <main className="p-6">
            {children}
          </main>
        </div>

        {/* Panel derecho - Asistente IA fijo */}
        <div className="hidden lg:block fixed top-16 right-0 w-[380px] h-[calc(100vh-64px)] z-30 border-l border-[rgba(255,255,255,0.07)]">
          <div 
            className="h-full"
            style={{
              background: 'linear-gradient(145deg, #0D1117, #10151B)',
            }}
          >
            <RightPanelChat />
          </div>
        </div>
      </div>

      {/* Versión mobile */}
      <div className="md:hidden flex flex-col h-screen pt-16">
        {/* Sidebar de navegación (oculto en mobile, se puede mostrar como overlay) */}
        <div className="flex-1 overflow-y-auto p-4">
          <main>
            {children}
          </main>
        </div>
        
        {/* Chat container centrado en mobile */}
        <div className="mx-4 mb-6 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)]">
          <div 
            className="backdrop-blur-2xl rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, #0D1117, #10151B)',
            }}
          >
            <RightPanelChat />
          </div>
        </div>
      </div>
    </div>
  );
}