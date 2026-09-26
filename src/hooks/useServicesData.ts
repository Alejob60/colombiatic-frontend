// src/hooks/useServicesData.ts
import { useState, useEffect } from 'react';
import servicesData from '@/data/services.json';

export interface Service {
  id: string;
  name: string;
  description: string;
  active: boolean;
  actions: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  services: Service[];
}

export interface ServicesData {
  categories: Category[];
}

export function useServicesData() {
  const [data, setData] = useState<ServicesData>(servicesData as ServicesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get all categories
  const getCategories = () => {
    return data.categories;
  };

  // Function to get a specific category by ID
  const getCategoryById = (categoryId: string) => {
    return data.categories.find(cat => cat.id === categoryId);
  };

  // Function to get all services from all categories
  const getAllServices = () => {
    return data.categories.flatMap(cat => 
      cat.services.map(service => ({
        ...service,
        categoryId: cat.id,
        categoryName: cat.name
      }))
    );
  };

  // Function to toggle service active state
  const toggleServiceActive = (categoryId: string, serviceId: string) => {
    setData(prevData => ({
      ...prevData,
      categories: prevData.categories.map(cat => 
        cat.id === categoryId 
          ? {
              ...cat,
              services: cat.services.map(service =>
                service.id === serviceId
                  ? { ...service, active: !service.active }
                  : service
              )
            }
          : cat
      )
    }));
  };

  // Function to get services count
  const getServicesCount = () => {
    return data.categories.reduce((total, cat) => total + cat.services.length, 0);
  };

  // Function to get active services count
  const getActiveServicesCount = () => {
    return getAllServices().filter(service => service.active).length;
  };

  return {
    categories: data.categories,
    loading,
    error,
    getCategories,
    getCategoryById,
    getAllServices,
    toggleServiceActive,
    getServicesCount,
    getActiveServicesCount
  };
}
