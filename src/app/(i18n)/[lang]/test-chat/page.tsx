// src/app/(i18n)/[lang]/test-chat/page.tsx
// Página de prueba para verificar el chat

export default function TestChatPage() {
  return (
    <div className="min-h-screen bg-[#0C1116] p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Página de prueba del chat</h1>
      <p className="text-gray-300 mb-8">
        Esta página te permite verificar que el panel derecho del chat se muestre correctamente.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-2">Instrucciones</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Verifica que el panel derecho del chat sea visible</li>
          <li>Verifica que puedas escribir mensajes en el chat</li>
          <li>Verifica que el chat muestre respuestas simuladas si no hay conexión</li>
        </ul>
      </div>
    </div>
  );
}