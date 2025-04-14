// src/components/sections/AboutSection.tsx

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      className="w-full py-24 bg-white border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          ¿Quiénes somos?
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          En <span className="font-bold text-blue-600">Colombia TIC Ingeniería SAS</span> 
          desarrollamos soluciones tecnológicas de última generación para empresas, gobierno y sector agroindustrial.
          <br /><br />
          Nos especializamos en Inteligencia Artificial, Blockchain, Ciberseguridad, Automatización de Procesos,
          Drones Autónomos y Plataformas Web Escalables.
        </p>

        <div className="mt-10">
          <p className="text-sm text-gray-400 uppercase tracking-wide">
            Innovación · Tecnología · Futuro
          </p>
        </div>

      </div>
    </section>
  );
}
