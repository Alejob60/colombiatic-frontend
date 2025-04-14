// src/app/contact/page.tsx
export default function ContactPage() {
    return (
      <main className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
        <p className="mb-4">Estamos listos para asesorarte en tu próximo proyecto de innovación tecnológica.</p>
        <form className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Mensaje"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enviar
          </button>
        </form>
      </main>
    );
  }