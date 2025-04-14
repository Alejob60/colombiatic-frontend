// src/components/Navbar.tsx

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="text-xl font-bold text-gray-800">Colombia TIC</div>
      <div className="flex gap-6 text-gray-600 font-medium">
        <Link href="/">Inicio</Link>
        <Link href="/about">Nosotros</Link>
        <Link href="/services">Servicios</Link>
        <Link href="/contact">Contacto</Link>
      </div>
    </nav>
  )
}
