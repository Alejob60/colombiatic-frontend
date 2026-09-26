// src/middleware/apiLogger.ts
// Middleware to log all API requests for debugging

import { NextRequest, NextFetchEvent } from 'next/server';

export function apiLogger(request: NextRequest, event: NextFetchEvent) {
  // Log the request details
  console.log('API Request:', {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers),
    cookies: request.cookies.getAll(),
    timestamp: new Date().toISOString()
  });
  
  // Continue with the request
  return undefined;
}

export default apiLogger;