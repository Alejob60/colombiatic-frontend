// src/components/dashboard/UserPreferences.tsx
"use client";

import { motion } from 'framer-motion';
import { Globe, CreditCard, FileText, Users, Bell } from 'lucide-react';

export default function UserPreferences() {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Preferencias del Usuario</h1>
        <p className="text-gray-400">Gestiona tus preferencias y configuraciones personales</p>
      </motion.div>

      {/* Idioma */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center mb-6">
          <Globe className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-white">Idioma</h2>
        </div>
        
        <div className="max-w-md">
          <label className="block text-gray-300 mb-2">Selecciona tu idioma preferido</label>
          <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Español</option>
            <option>English</option>
            <option>Português</option>
          </select>
        </div>
      </motion.div>

      {/* Métodos de pago */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <CreditCard className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-white">Métodos de Pago</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Tarjeta terminada en 4242</div>
              <div className="text-gray-400 text-sm">Expira 12/2027</div>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors">
              Eliminar
            </button>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium text-white">PayPal</div>
              <div className="text-gray-400 text-sm">usuario@ejemplo.com</div>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors">
              Eliminar
            </button>
          </div>
          
          <button className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-dashed border-gray-600">
            + Agregar método de pago
          </button>
        </div>
      </motion.div>

      {/* Facturación */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <FileText className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-white">Facturación</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Nombre de la empresa</label>
            <input 
              type="text" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nombre de tu empresa"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">NIT/RUT</label>
            <input 
              type="text" 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Número de identificación tributaria"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2">Dirección de facturación</label>
            <textarea 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Dirección completa"
              rows={3}
            ></textarea>
          </div>
        </div>
      </motion.div>

      {/* Equipo / permisos de usuarios */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center mb-6">
          <Users className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-white">Equipo y Permisos</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span className="text-primary font-bold">JD</span>
              </div>
              <div>
                <div className="font-medium text-white">Juan Pérez</div>
                <div className="text-gray-400 text-sm">Administrador</div>
              </div>
            </div>
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Administrador</option>
              <option>Editor</option>
              <option>Visualizador</option>
            </select>
          </div>
          
          <div className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span className="text-primary font-bold">MA</span>
              </div>
              <div>
                <div className="font-medium text-white">María Álvarez</div>
                <div className="text-gray-400 text-sm">Editor</div>
              </div>
            </div>
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Administrador</option>
              <option>Editor</option>
              <option>Visualizador</option>
            </select>
          </div>
          
          <button className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-dashed border-gray-600">
            + Invitar miembro del equipo
          </button>
        </div>
      </motion.div>

      {/* Notificaciones */}
      <motion.div
        className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Bell className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-2xl font-bold text-white">Notificaciones</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-white">Alertas de métricas</div>
              <div className="text-gray-400 text-sm">Notificaciones cuando se alcancen ciertos umbrales</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-white">Actualizaciones de productos</div>
              <div className="text-gray-400 text-sm">Novedades y mejoras en nuestros servicios</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-white">Boletines informativos</div>
              <div className="text-gray-400 text-sm">Contenido educativo y consejos especializados</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Botón de guardar */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <button className="px-8 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300">
          Guardar Preferencias
        </button>
      </motion.div>
    </div>
  );
}