// src/components/sections/ServicesSection.tsx

export default function ServicesSection() {
    return (
      <section
        id="servicios"
        className="w-full py-24 bg-gray-50 border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Nuestros Servicios
          </h2>
  
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mb-12">
            Integramos tecnologías de última generación para potenciar
            a empresas, organizaciones y gobiernos hacia un futuro digital.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  
  const services = [
    {
      title: "Inteligencia Artificial",
      description:
        "Automatización, bots inteligentes, IA para procesos de negocio y análisis predictivo.",
    },
    {
      title: "Blockchain & Web3",
      description:
        "Desarrollo de soluciones seguras y transparentes en redes blockchain públicas y privadas.",
    },
    {
      title: "Ciberseguridad",
      description:
        "Protección de infraestructuras, datos sensibles, auditorías y arquitecturas seguras.",
    },
    {
      title: "Drones Autónomos IA",
      description:
        "Sistemas autónomos sin necesidad de internet para agricultura, defensa y monitoreo.",
    },
    {
      title: "Desarrollo Web & Apps",
      description:
        "Aplicaciones web escalables, APIs modernas y plataformas integradas de alto rendimiento.",
    },
    {
      title: "Consultoría Tecnológica",
      description:
        "Acompañamiento en transformación digital, modernización de infraestructuras y adopción cloud.",
    },
  ];
  