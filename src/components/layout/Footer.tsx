// src/components/layout/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#0A0F14] border-t border-[rgba(255,255,255,0.07)] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#E6EDF3] mb-4">ColombiaTIC IA</h3>
            <p className="text-[#A3B4C8] mb-4">
              Plataforma de inteligencia artificial para transformar tu negocio.
            </p>
            <div className="text-[#A3B4C8] text-sm">
              © 2025 ColombiaTIC IA<br />
              Todos los derechos reservados.
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#E6EDF3] mb-4">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Precios</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Casos de uso</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Integraciones</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#E6EDF3] mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Documentación</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Tutoriales</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#E6EDF3] mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Acerca de</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Contacto</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Carreras</a></li>
              <li><a href="#" className="text-[#A3B4C8] hover:text-[#3BA5FF] transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}