# ColombiaTIC IA Ecosystem - Frontend

Sitio web corporativo con enfoque en inteligencia artificial desarrollado en Next.js con Tailwind CSS siguiendo arquitectura profesional y diseño premium.

## Tecnologías Usadas 🚀

- Next.js 15.3.0 (App Router)
- Tailwind CSS 3
- TypeScript
- Framer Motion para animaciones
- React Icons y Lucide React para íconos
- Internacionalización (i18n) con enfoque App Router

## Estructura del Proyecto

```
src/
├── app/                  # Rutas y páginas (Next.js App Router)
│   ├── (i18n)/           # Rutas internacionalizadas
│   │   └── [lang]/       # Páginas por idioma
│   └── api/              # API routes
├── components/           # Componentes reutilizables
│   ├── layout/           # Componentes de layout global
│   ├── pages/            # Componentes de página
│   ├── sections/         # Secciones de páginas
│   └── ui/               # UI Atómica (Button, Card, Input)
├── contexts/             # Context providers (i18n)
├── lib/                  # Helpers y Funciones
├── locales/              # Archivos de traducción
│   ├── es/               # Español
│   └── en/               # Inglés
└── types/                # Definiciones de tipos TypeScript
```

## Características 🌟

- **Internacionalización**: Soporte para español e inglés
- **Diseño Responsivo**: Totalmente adaptable a móviles, tablets y desktop
- **Animaciones Modernas**: Usando Framer Motion
- **Arquitectura Limpia**: Separación clara de responsabilidades
- **Componentes Reutilizables**: Diseño atómico de componentes

## Despliegue 🚀

Sitio desplegado con [Vercel](https://vercel.com/)
Automatizado desde rama `main`

## Cómo Clonar y Levantar en Local

```bash
git clone https://github.com/Alejob60/colombiatic-frontend.git
cd colombiatic-frontend
npm install
npm run dev
```

El servidor de desarrollo se iniciará en [http://localhost:3000](http://localhost:3000)

## Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Internacionalización

La aplicación soporta dos idiomas:
- Español (es) - Idioma por defecto
- Inglés (en)

Los usuarios son redirigidos automáticamente según su configuración de navegador, pero pueden cambiar de idioma usando el selector en la barra de navegación.

## Estructura de Componentes

### Secciones de la Página Principal
1. **HeroIA** - Sección principal con llamada a la acción
2. **HowItWorks** - Explicación del flujo de valor
3. **Solutions** - Tarjetas de servicios
4. **Pricing** - Planes y precios
5. **WebsiteAI** - Sección sobre sitios web inteligentes
6. **Testimonials** - Casos de éxito
7. **ContactCTA** - Formulario de contacto
8. **Legal** - Información legal

## API Routes

- `POST /api/lead` - Captura de leads del formulario de contacto
- `GET /api/pricing` - Obtención de planes de precios

## Contacto

ColombiaTIC Ingeniería SAS
Soluciones tecnológicas IA - Blockchain - Ciberseguridad - Gobierno Digital
Página Oficial: https://colombiatic.com.co