<<<<<<< HEAD
"use client";

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-background py-24 px-6  dark:bg-gray-950 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-title">
          Contáctanos
        </h2>

        <p className="mt-4 text-lg text-muted">
          ¿Tienes un proyecto o necesitas asesoría tecnológica? Escríbenos y te
          responderemos lo más pronto posible.
        </p>

        <form className="mt-10 space-y-5 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Tu correo"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            rows={5}
            placeholder="Cuéntanos más sobre tu necesidad..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
=======
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
  
>>>>>>> feature/hero-section
