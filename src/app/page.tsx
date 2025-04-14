'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h1 className="text-5xl font-extrabold mb-4">
            Impulsamos la innovación en Colombia
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Colombia TIC Ingeniería SAS desarrolla soluciones en inteligencia artificial, ciberseguridad, antidrones, blockchain y más.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Contáctanos
          </a>
        </section>

        {/* Beneficios */}
        <section className="py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Por qué elegirnos?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">🔒 Seguridad Avanzada</h3>
              <p>Soluciones de ciberseguridad para proteger infraestructuras críticas y datos confidenciales.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🚀 Tecnología de Punta</h3>
              <p>Implementamos IA, RAG, blockchain y drones inteligentes sin necesidad de internet.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🤝 Alianzas Estratégicas</h3>
              <p>Apoyamos proyectos gubernamentales, militares y agroindustriales de alto impacto.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
