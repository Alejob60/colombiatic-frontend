// src/pages/api/proxy/[...path].ts
// Middleware para manejar solicitudes proxy en desarrollo y evitar problemas de CORS

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtener la ruta y método de la solicitud
    const { path } = req.query;
    const method = req.method || 'GET';
    
    // Construir la URL del backend real
    const backendUrl = process.env.NEXT_PUBLIC_MISYBOT_API_URL || 'https://realculture-backend-g3b9deb2fja4b8a2.canadacentral-01.azurewebsites.net';
    const targetUrl = `${backendUrl}/${Array.isArray(path) ? path.join('/') : path}`;
    
    console.log(`Proxying ${method} request to: ${targetUrl}`);
    
    // Preparar las cabeceras para la solicitud al backend
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Copiar las cabeceras de autorización si existen
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    // Copiar otras cabeceras importantes
    if (req.headers['x-tenant-id']) {
      headers['x-tenant-id'] = req.headers['x-tenant-id'] as string;
    }
    
    // Realizar la solicitud al backend
    const response = await axios({
      method,
      url: targetUrl,
      headers,
      data: req.body,
      timeout: 30000, // 30 segundos de timeout
    });
    
    // Copiar las cabeceras de respuesta importantes
    Object.keys(response.headers).forEach(key => {
      if (key.toLowerCase() !== 'transfer-encoding') {
        res.setHeader(key, response.headers[key]);
      }
    });
    
    // Enviar la respuesta al cliente
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    
    // Manejar errores de red o del servidor
    if (error.response) {
      // El servidor respondió con un código de error
      res.status(error.response.status).json({
        error: 'Proxy Error',
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      res.status(502).json({
        error: 'Proxy Error',
        message: 'No response from backend server. The service may be temporarily unavailable.',
      });
    } else {
      // Otro tipo de error
      res.status(500).json({
        error: 'Proxy Error',
        message: error.message,
      });
    }
  }
}