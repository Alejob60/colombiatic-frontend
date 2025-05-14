import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Ayuda a encontrar problemas en dev
  experimental: {
    // appDir: true,         // Estructura moderna con /app
  },
  images: {
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejemplo.com',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    styledComponents: true, // Si usas styled-components
  },
};

export default nextConfig;
