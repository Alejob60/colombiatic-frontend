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
