// src/lib/securityUtils.ts
import crypto from 'crypto';

// Generate a secure random token
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// Hash a password with salt
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Generate a salt
export function generateSalt(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Generate CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Validate CSRF token
export function validateCSRFToken(token: string, expectedToken: string): boolean {
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
}

// Create JWT-like token (simplified for demo)
export function createSecureToken(payload: any, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64');
  
  return `${header}.${body}.${signature}`;
}

// Verify JWT-like token (simplified for demo)
export function verifySecureToken(token: string, secret: string): any | null {
  try {
    const [header, body, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64');
    
    if (signature === expectedSignature) {
      return JSON.parse(Buffer.from(body, 'base64').toString());
    }
    
    return null;
  } catch {
    return null;
  }
}

// Check if we're in a secure context (HTTPS) or in development
export function isSecureContext(): boolean {
  if (typeof window !== 'undefined') {
    // Allow in development (localhost) or HTTPS
    return window.location.protocol === 'https:' || 
           window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1';
  }
  return false;
}

// Clear authentication cookies
export function clearAuthCookies(): void {
  // In a real implementation, this would clear auth-related cookies
  // For now, we'll just log that it was called
  console.log('Clearing authentication cookies');
  
  // Example of how you might clear cookies:
  // document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}