// src/services/serviceCatalog.ts
// Normaliza el catálogo plano de servicios (src/data/colombiatic-services.json)
// al contrato ColombiaTICServices que consumen el hook y el checkout.

import catalog from '@/data/colombiatic-services.json';
import { Category, ColombiaTICServices, Module, Product, ServiceItem } from '@/types/colombiatic';

export interface ServiceCatalogEntry {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  category: string;
  categoryId: number;
  subcategory: string;
  features: string[];
}

const entries = catalog as ServiceCatalogEntry[];

/**
 * El precio de un servicio es el mínimo del rango: cuando `max` supera a `min`
 * el precio varía según el alcance y se cotiza como servicio mensual.
 */
function billingCycle(entry: ServiceCatalogEntry): 'mensual' | 'único' {
  return entry.priceRange.max > entry.priceRange.min ? 'mensual' : 'único';
}

function toProduct(entry: ServiceCatalogEntry): Product {
  return {
    id: entry.id,
    name: entry.name,
    description: entry.description,
    type: 'estrella',
    price_cop: entry.priceRange.min,
    billing_cycle: billingCycle(entry),
    features: entry.features
  };
}

function toModule(entry: ServiceCatalogEntry): Module {
  return {
    id: entry.id,
    name: entry.name,
    description: entry.description,
    category: entry.category,
    price_cop: entry.priceRange.min,
    billing_cycle: billingCycle(entry),
    features: entry.features
  };
}

function toServiceItem(entry: ServiceCatalogEntry): ServiceItem {
  return {
    ...toProduct(entry),
    category: toModule(entry).category
  };
}

/**
 * Todos los servicios del catálogo como ServiceItem
 */
export function getAllServices(): ServiceItem[] {
  return entries.map(toServiceItem);
}

/**
 * Buscar un servicio del catálogo por su id
 */
export function getServiceById(id: string): ServiceItem | undefined {
  return getAllServices().find(service => service.id === id);
}

/**
 * Categorías agrupadas por categoryId, usando el subcategory del catálogo
 */
export function getCatalogCategories(): Category[] {
  const seen = new Map<number, Category>();

  for (const entry of entries) {
    if (!seen.has(entry.categoryId)) {
      seen.set(entry.categoryId, {
        id: String(entry.categoryId),
        name: entry.subcategory,
        icon: entry.category
      });
    }
  }

  return [...seen.values()];
}

/**
 * El catálogo completo con la forma que espera ColombiaTICServices
 */
export function getColombiaTICServices(): ColombiaTICServices {
  return {
    products: entries.map(toProduct),
    modules: entries.map(toModule),
    categories: getCatalogCategories()
  };
}

export default {
  getAllServices,
  getServiceById,
  getCatalogCategories,
  getColombiaTICServices
};
