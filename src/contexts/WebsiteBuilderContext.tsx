// src/contexts/WebsiteBuilderContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTenant } from '@/contexts/TenantContext';

interface Section {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'testimonials' | 'contact' | 'faq';
  content: any;
  order: number;
}

interface Website {
  id: string;
  name: string;
  domain: string;
  sections: Section[];
  theme: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

interface WebsiteBuilderContextType {
  website: Website | null;
  loading: boolean;
  error: string | null;
  createWebsite: (name: string, domain: string) => Promise<boolean>;
  updateWebsite: (website: Website) => Promise<boolean>;
  addSection: (section: Omit<Section, 'id'>) => void;
  removeSection: (sectionId: string) => void;
  updateSection: (sectionId: string, content: any) => void;
  publishWebsite: () => Promise<boolean>;
}

const WebsiteBuilderContext = createContext<WebsiteBuilderContextType | undefined>(undefined);

export function WebsiteBuilderProvider({ children }: { children: ReactNode }) {
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tenant } = useTenant();

  // Create a new website
  const createWebsite = async (name: string, domain: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      if (!tenant) {
        throw new Error('No tenant selected');
      }
      
      // In a real implementation, this would call the backend API
      // For now, we'll create a mock website
      const newWebsite: Website = {
        id: `website-${Date.now()}`,
        name,
        domain,
        sections: [],
        theme: 'default',
        tenantId: tenant.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setWebsite(newWebsite);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create website');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update website
  const updateWebsite = async (updatedWebsite: Website): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call the backend API
      // For now, we'll just update the local state
      setWebsite(updatedWebsite);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update website');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add section to website
  const addSection = (section: Omit<Section, 'id'>) => {
    if (!website) return;
    
    const newSection: Section = {
      ...section,
      id: `section-${Date.now()}`
    };
    
    const updatedWebsite: Website = {
      ...website,
      sections: [...website.sections, newSection].sort((a, b) => a.order - b.order),
      updatedAt: new Date().toISOString()
    };
    
    setWebsite(updatedWebsite);
  };

  // Remove section from website
  const removeSection = (sectionId: string) => {
    if (!website) return;
    
    const updatedWebsite: Website = {
      ...website,
      sections: website.sections.filter(section => section.id !== sectionId),
      updatedAt: new Date().toISOString()
    };
    
    setWebsite(updatedWebsite);
  };

  // Update section content
  const updateSection = (sectionId: string, content: any) => {
    if (!website) return;
    
    const updatedSections = website.sections.map(section => 
      section.id === sectionId ? { ...section, content } : section
    );
    
    const updatedWebsite: Website = {
      ...website,
      sections: updatedSections,
      updatedAt: new Date().toISOString()
    };
    
    setWebsite(updatedWebsite);
  };

  // Publish website
  const publishWebsite = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      if (!website) {
        throw new Error('No website to publish');
      }
      
      // In a real implementation, this would call the backend API to publish the website
      // For now, we'll just simulate a successful publish
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish website');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize with a default website if tenant exists
  useEffect(() => {
    if (tenant && !website) {
      // Create a default website for the tenant
      const defaultWebsite: Website = {
        id: `website-${tenant.id}`,
        name: `${tenant.name} Website`,
        domain: tenant.domain,
        sections: [
          {
            id: 'section-1',
            type: 'hero',
            content: {
              title: 'Bienvenido a ' + tenant.name,
              subtitle: 'Transforma tu negocio con inteligencia artificial',
              ctaText: 'Comenzar ahora',
              ctaLink: '/contact'
            },
            order: 1
          }
        ],
        theme: 'default',
        tenantId: tenant.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setWebsite(defaultWebsite);
    }
    
    setLoading(false);
  }, [tenant]);

  return (
    <WebsiteBuilderContext.Provider value={{ 
      website, 
      loading, 
      error, 
      createWebsite, 
      updateWebsite, 
      addSection, 
      removeSection, 
      updateSection, 
      publishWebsite 
    }}>
      {children}
    </WebsiteBuilderContext.Provider>
  );
}

export function useWebsiteBuilder() {
  const context = useContext(WebsiteBuilderContext);
  if (context === undefined) {
    throw new Error('useWebsiteBuilder must be used within a WebsiteBuilderProvider');
  }
  return context;
}