// src/components/layout/DashboardSidebar.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Users, 
  FileText, 
  LogOut,
  X,
  Package,
  ShoppingCart,
  DollarSign,
  ShoppingBag,
  Upload,
  Eye,
  Bot,
  Activity,
  TestTube,
  Key
} from 'lucide-react';

interface DashboardSidebarProps {
  toggleMenu?: () => void;
  isMenuOpen?: boolean;
}

const navigationSections = [
  {
    title: 'Principal',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'Inteligencia IA',
    items: [
      { name: 'IA Omnicanal', href: '/dashboard/ai-omnichannel', icon: Bot },
      { name: 'UX Intelligence', href: '/dashboard/ux-intelligence', icon: Eye },
      { name: 'Canales', href: '/dashboard/channels', icon: MessageSquare },
    ]
  },
  {
    title: 'Comercio',
    items: [
      { name: 'Mis Servicios', href: '/dashboard/my-services', icon: Package },
      { name: 'Productos', href: '/dashboard/products', icon: Package },
      { name: 'Inventario', href: '/dashboard/inventory', icon: ShoppingCart },
      { name: 'Órdenes', href: '/dashboard/orders', icon: ShoppingBag },
      { name: 'Marketplace', href: '/dashboard/marketplace', icon: DollarSign },
    ]
  },
  {
    title: 'Gestión',
    items: [
      { name: 'Usuarios', href: '/dashboard/users', icon: Users },
      { name: 'Importar Datos', href: '/dashboard/bulk-import', icon: Upload },
      { name: 'Data Governance', href: '/dashboard/data-governance', icon: Shield },
      { name: 'Legal', href: '/dashboard/legal', icon: FileText },
    ]
  },
  {
    title: 'Sistema',
    items: [
      { name: 'Monitoreo', href: '/dashboard/monitoring', icon: Activity },
      { name: 'Seguridad', href: '/dashboard/security', icon: Key },
      { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
    ]
  },
];

export default function DashboardSidebar({ toggleMenu, isMenuOpen }: DashboardSidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex items-center justify-between flex-shrink-0 px-4 py-4 border-b border-gray-800">
        <Link href="/es/dashboard" className="flex items-center">
          <span className="text-white font-bold text-xl">Colombia</span>
          <span className="text-primary font-bold text-xl">TIC</span>
          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">IA</span>
        </Link>
        {toggleMenu && (
          <button 
            onClick={toggleMenu}
            className="md:hidden p-1 rounded hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      
      <div className="mt-2 flex-grow flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-4">
          {navigationSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={toggleMenu}
                      className={`${
                        isActive
                          ? 'bg-primary/10 text-white border-l-4 border-primary'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      } group flex items-center px-2 py-2.5 text-sm font-medium rounded-r transition-colors`}
                    >
                      <Icon
                        className={`${
                          isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'
                        } mr-3 flex-shrink-0 h-5 w-5`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs font-medium text-gray-400 truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="ml-auto flex-shrink-0 bg-surface rounded-full p-1 text-gray-400 hover:text-white focus:outline-none"
        >
          <LogOut className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}