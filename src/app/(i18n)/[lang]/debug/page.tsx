// src/app/(i18n)/[lang]/debug/page.tsx
// Página de debug para verificar el funcionamiento del chat y navbar

'use client';

import { useMetaAgent } from '@/contexts/MetaAgentContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';

export default function DebugPage() {
  // Probar acceso a contextos
  let metaAgentData, authData, tenantData;
  
  try {
    metaAgentData = useMetaAgent();
  } catch (error) {
    metaAgentData = { error: 'Error al acceder a MetaAgentContext' };
  }
  
  try {
    authData = useAuth();
  } catch (error) {
    authData = { error: 'Error al acceder a AuthContext' };
  }
  
  try {
    tenantData = useTenant();
  } catch (error) {
    tenantData = { error: 'Error al acceder a TenantContext' };
  }

  return (
    <div className="min-h-screen bg-[#0C1116] p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Página de Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">MetaAgent Context</h2>
          <pre className="text-gray-300 text-sm overflow-auto">
            {JSON.stringify(metaAgentData, null, 2)}
          </pre>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Auth Context</h2>
          <pre className="text-gray-300 text-sm overflow-auto">
            {JSON.stringify(authData, null, 2)}
          </pre>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Tenant Context</h2>
          <pre className="text-gray-300 text-sm overflow-auto">
            {JSON.stringify(tenantData, null, 2)}
          </pre>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-900/50 p-6 rounded-lg border border-blue-700">
        <h2 className="text-xl font-semibold text-white mb-4">Instrucciones</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Verifica que los contextos se muestren correctamente sin errores</li>
          <li>Verifica que el navbar sea visible en la parte superior</li>
          <li>Verifica que el panel derecho del chat sea visible</li>
          <li>Verifica que puedas escribir mensajes en el chat</li>
        </ul>
      </div>
    </div>
  );
}