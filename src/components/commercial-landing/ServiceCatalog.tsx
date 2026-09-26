// src/components/commercial-landing/ServiceCatalog.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useServices } from '@/hooks/useServices';
import { ServiceItem } from '@/types/colombiatic';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { 
  Star, 
  ShoppingCart, 
  Filter, 
  Search,
  ChevronDown,
  CheckCircle
} from 'lucide-react';

export default function ServiceCatalog() {
  const { getProducts, getModules, getCategories, formatPrice } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});

  const products = getProducts();
  const modules = getModules();
  const categories = getCategories();

  const allServices = [...products, ...modules];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'price-low') return a.price_cop - b.price_cop;
    if (sortBy === 'price-high') return b.price_cop - a.price_cop;
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  const toggleFeatures = (serviceId: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handlePurchase = (service: ServiceItem) => {
    // This would integrate with the Wompi service
    console.log('Purchase service:', service);
    // Implementation would call wompiService.createOrder()
  };

  return (
    <section className="py-20 bg-background text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Catálogo de Servicios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestros productos estrella y módulos adicionales diseñados para impulsar tu negocio
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-surface/50 rounded-xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              <Filter className="text-gray-400 w-5 h-5 mt-3" />
              <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <ChevronDown className="text-gray-400 w-5 h-5 mt-3" />
              <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Más populares</option>
                <option value="price-low">Precio: Menor a mayor</option>
                <option value="price-high">Precio: Mayor a menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="products">Productos Estrella</TabsTrigger>
            <TabsTrigger value="modules">Módulos Adicionales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard 
                    service={service} 
                    formatPrice={formatPrice}
                    onToggleFeatures={toggleFeatures}
                    expandedFeatures={expandedFeatures}
                    onPurchase={handlePurchase}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard 
                    service={product} 
                    formatPrice={formatPrice}
                    onToggleFeatures={toggleFeatures}
                    expandedFeatures={expandedFeatures}
                    onPurchase={handlePurchase}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="modules">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getModules().map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard 
                    service={module} 
                    formatPrice={formatPrice}
                    onToggleFeatures={toggleFeatures}
                    expandedFeatures={expandedFeatures}
                    onPurchase={handlePurchase}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {sortedServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No se encontraron servicios que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: ServiceItem;
  formatPrice: (amount: number) => string;
  onToggleFeatures: (serviceId: string) => void;
  expandedFeatures: Record<string, boolean>;
  onPurchase: (service: ServiceItem) => void;
}

function ServiceCard({ service, formatPrice, onToggleFeatures, expandedFeatures, onPurchase }: ServiceCardProps) {
  const showAllFeatures = expandedFeatures[service.id] || service.features.length <= 5;
  const featuresToShow = showAllFeatures ? service.features : service.features.slice(0, 5);

  return (
    <Card className="h-full flex flex-col bg-surface/80 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all duration-300">
      {service.type === 'estrella' && (
        <Badge className="self-start mb-4 bg-gradient-to-r from-primary to-secondary">
          <Star className="w-4 h-4 mr-1" />
          Producto Estrella
        </Badge>
      )}
      
      {service.popular && (
        <Badge className="self-start mb-4 bg-gradient-to-r from-accent to-tertiary">
          Más Popular
        </Badge>
      )}

      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{service.name}</h3>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(service.price_cop)}
            {service.billing_cycle === 'mensual' && (
              <span className="text-sm text-gray-400">/mes</span>
            )}
          </span>
        </div>

        <p className="text-gray-400 mb-6">{service.description}</p>

        <div className="mb-6">
          <h4 className="font-semibold mb-3">Características:</h4>
          <ul className="space-y-2">
            {featuresToShow.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          {service.features.length > 5 && (
            <button
              onClick={() => onToggleFeatures(service.id)}
              className="mt-2 text-primary hover:text-primary/80 flex items-center text-sm"
            >
              {showAllFeatures ? 'Ver menos' : `Ver más (${service.features.length - 5} más)`}
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAllFeatures ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {service.setup_time && (
          <div className="mb-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <p className="text-sm text-blue-300">
              <strong>Tiempo de implementación:</strong> {service.setup_time}
            </p>
          </div>
        )}
      </div>

      <div className="p-6 pt-0">
        <Button 
          className="w-full"
          onClick={() => onPurchase(service)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Comprar Ahora
        </Button>
      </div>
    </Card>
  );
}