<<<<<<< HEAD
"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1117] text-gray-400 border-t border-gray-800 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <strong>Colombia TIC Ingeniería SAS</strong>. Todos los derechos reservados.
        </span>
        <div className="flex gap-5 text-sm">
          <a
            href="https://www.linkedin.com/company/colombiatic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/colombiatic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://github.com/Colombiatic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
=======
// src/components/layout/Footer.tsx

export default function Footer() {
    return (
      <footer className="w-full border-t border-gray-800 bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-center text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">
              Colombia TIC Ingeniería SAS
            </span>{" "}
            — Todos los derechos reservados.
          </span>
  
          <div className="flex gap-5 text-sm">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Instagram
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
>>>>>>> feature/hero-section
