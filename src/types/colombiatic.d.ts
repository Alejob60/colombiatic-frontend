// src/types/colombiatic.d.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'estrella' | 'adicional';
  price_cop: number;
  billing_cycle: 'mensual' | 'único';
  features: string[];
  setup_time?: string;
  popular?: boolean;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  price_cop: number;
  billing_cycle: 'mensual' | 'único';
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ServiceItem extends Product, Module {
  id: string;
  name: string;
  description: string;
  price_cop: number;
  billing_cycle: 'mensual' | 'único';
  features: string[];
  type?: 'estrella' | 'adicional';
  category?: string;
  setup_time?: string;
  popular?: boolean;
}

export interface ColombiaTICServices {
  products: Product[];
  modules: Module[];
  categories: Category[];
}

export interface WompiCreateOrderRequest {
  userId: string;
  moduleId: string;
  amount: number;
  currency: string;
  callbackUrl: string;
}

export interface WompiOrderResponse {
  checkoutUrl: string;
  orderId: string;
  status: string;
}