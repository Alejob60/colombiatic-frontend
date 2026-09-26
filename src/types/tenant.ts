// src/types/tenant.ts
// Definición de tipos para el tenant

export interface Tenant {
  id: string;
  name: string;
  plan: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  features?: string[];
}