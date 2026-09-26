// src/hooks/useServices.ts
import { useState, useEffect } from 'react';
import { getColombiaTICServices } from '@/services/serviceCatalog';
import { ColombiaTICServices, ServiceItem } from '@/types/colombiatic';
import wompiService from '@/services/wompi.service';

export const useServices = () => {
  const [services, setServices] = useState<ColombiaTICServices>({
    products: [],
    modules: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setServices(getColombiaTICServices());
      setLoading(false);
    } catch (err) {
      setError('Failed to load services data');
      setLoading(false);
    }
  }, []);

  const getProducts = (): ServiceItem[] => {
    return services.products.map(product => ({
      ...product,
      type: 'estrella'
    })) as ServiceItem[];
  };

  const getModules = (): ServiceItem[] => {
    return services.modules.map(module => ({
      ...module,
      category: module.category
    })) as ServiceItem[];
  };

  const getCategories = () => {
    return services.categories;
  };

  const getServiceById = (id: string): ServiceItem | undefined => {
    const allServices = [...getProducts(), ...getModules()];
    return allServices.find(service => service.id === id);
  };

  const getModulesByCategory = (categoryId: string): ServiceItem[] => {
    return getModules().filter(module => module.category === categoryId);
  };

  const formatPrice = (amount: number): string => {
    return wompiService.formatCurrency(amount);
  };

  const calculateTotal = (service: ServiceItem, quantity: number = 1): number => {
    return wompiService.calculateAmount(service, quantity);
  };

  return {
    services,
    loading,
    error,
    getProducts,
    getModules,
    getCategories,
    getServiceById,
    getModulesByCategory,
    formatPrice,
    calculateTotal
  };
};