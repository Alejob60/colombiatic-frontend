// src/app/(i18n)/[lang]/test-page.tsx
// Página de prueba para diagnosticar problemas de navbar

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[#0C1116] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Página de prueba</h1>
        <p className="text-xl text-gray-300">Si ves el navbar rojo arriba, el problema está en la estructura de layouts</p>
      </div>
    </div>
  );
}