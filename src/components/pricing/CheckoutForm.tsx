// src/components/pricing/CheckoutForm.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePricing } from '@/contexts/PricingContext';
import { useTenant } from '@/contexts/TenantContext';
import { CheckCircle } from 'lucide-react';

export default function CheckoutForm() {
  const { selectedPlan } = usePricing();
  const { tenant } = useTenant();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingPeriod: 'month'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      setError('Por favor seleccione un plan primero');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the payment API
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-400" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white">¡Pago procesado con éxito!</h2>
        <p className="mt-2 text-gray-400">
          Gracias por tu suscripción al plan {selectedPlan?.name}. 
          Tu cuenta ha sido creada y ya puedes comenzar a usar nuestros servicios.
        </p>
        <div className="mt-8">
          <Link 
            href="/es/dashboard" 
            className="inline-block bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Ir al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Plan no seleccionado</h2>
        <p className="mt-2 text-gray-400">
          Por favor regresa a la página de precios y selecciona un plan.
        </p>
        <div className="mt-8">
          <Link 
            href="/es/pricing" 
            className="inline-block bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Ver Planes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Resumen del Pedido</h2>
          
          <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
            <div>
              <h3 className="font-medium text-white">{selectedPlan.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{selectedPlan.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">${selectedPlan.price}<span className="text-gray-400 text-sm">/mes</span></p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between text-lg font-medium text-white">
              <span>Total</span>
              <span>${selectedPlan.price}<span className="text-gray-400 text-sm">/mes</span></span>
            </div>
          </div>
          
          {tenant && (
            <div className="mt-4 p-4 bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-300">
                Tenant: {tenant.name} ({tenant.domain})
              </p>
            </div>
          )}
        </div>
        
        {/* Payment Form */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Información de Pago</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                Empresa (Opcional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                Número de Tarjeta
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="0000 0000 0000 0000"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Procesando...' : `Pagar $${selectedPlan.price}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}