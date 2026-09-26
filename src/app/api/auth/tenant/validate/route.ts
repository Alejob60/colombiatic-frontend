// src/app/api/auth/tenant/validate/route.ts
import { NextResponse } from 'next/server';

// Mock tenant data for demonstration
const mockTenants = [
  {
    id: 'tenant-1',
    name: 'Colombiatic Demo',
    domain: 'colombiatic-demo.com',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'tenant-2',
    name: 'Misybot Enterprise',
    domain: 'misybot-enterprise.com',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'dev-tenant',
    name: 'Development Tenant',
    domain: 'localhost',
    createdAt: '2025-01-01T00:00:00Z'
  }
];

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();
    
    // Handle development domains
    if (domain === 'localhost' || domain === '127.0.0.1' || domain.includes('localhost')) {
      const devTenant = mockTenants.find(t => t.id === 'dev-tenant');
      return NextResponse.json({ 
        valid: true, 
        tenant: devTenant
      });
    }
    
    // Find tenant by domain
    const tenant = mockTenants.find(t => t.domain === domain);
    
    if (tenant) {
      return NextResponse.json({ 
        valid: true, 
        tenant: {
          id: tenant.id,
          name: tenant.name,
          domain: tenant.domain,
          createdAt: tenant.createdAt
        }
      });
    } else {
      return NextResponse.json({ valid: false }, { status: 404 });
    }
  } catch (error) {
    console.error('Error validating tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}