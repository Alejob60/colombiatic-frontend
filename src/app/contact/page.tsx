// src/app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //const formData = new FormData(e.currentTarget);
    /* const message = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
 */
    try {
      const response = await fetch("https://formspree.io/f/xgegjykr", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setStatus("✅ Mensaje enviado correctamente.");
        e.currentTarget.reset();
      } else {
        setStatus("❌ Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      setStatus("❌ Error de red. Intenta nuevamente.");
    }
  };

  return (
    <section className="min-h-screen bg-background text-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-textSecondary mb-8">
          Escríbenos para alianzas, proyectos o asesoría especializada.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            required
            className="w-full px-4 py-3 rounded-md bg-surface text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            required
            className="w-full px-4 py-3 rounded-md bg-surface text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje aquí..."
            rows={5}
            required
            className="w-full px-4 py-3 rounded-md bg-surface text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            Enviar mensaje
          </button>
        </form>

        {status && <p className="mt-4 text-sm text-green-400">{status}</p>}

        <div className="mt-10 text-sm text-muted">
          <p>📞 WhatsApp: +57 302 6404359</p>
          <p>📧 Email: prime@colombiatic.com.co</p>
          <p>📍 Cali, Valle del Cauca, Colombia</p>
        </div>
      </div>
    </section>
  );
}
