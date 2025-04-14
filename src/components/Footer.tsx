// src/components/Footer.tsx

export default function Footer() {
    return (
      <footer className="w-full py-6 px-8 bg-gray-900 text-gray-400 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span>© {new Date().getFullYear()} Colombia TIC Ingeniería SAS. Todos los derechos reservados.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </div>
      </footer>
    )
  }
  