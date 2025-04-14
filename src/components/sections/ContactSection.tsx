// src/components/sections/ContactSection.tsx

export default function ContactSection() {
    return (
      <section
        id="contacto"
        className="w-full py-24 bg-gray-50 border-t border-gray-200"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            ¿Listo para llevar tu empresa al siguiente nivel?
          </h2>
  
          <p className="text-gray-600 mb-12 text-lg leading-relaxed">
            Contáctanos y un asesor de <span className="font-semibold text-blue-600">Colombia TIC Ingeniería SAS</span> 
            se pondrá en contacto contigo para crear soluciones a la medida de tu negocio.
          </p>
  
          <a
            href="mailto:contacto@colombiatic.com.co"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Escríbenos a contacto@colombiatic.com.co
          </a>
  
          <div className="mt-6 text-gray-400 text-sm">
            Tiempo de respuesta: máximo 24 horas hábiles.
          </div>
        </div>
      </section>
    );
  }
  