// src/components/ui/PricingCard.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface PricingCardProps {
  title: string;
  price_monthly: number;
  price_annual: number;
  features: string[];
  cta_label: string;
  trial_days: number;
  limits: {
    requests_per_day: number;
    users: number;
  };
  isPopular?: boolean;
}

export default function PricingCard({
  title,
  price_monthly,
  price_annual,
  features,
  cta_label,
  trial_days,
  limits,
  isPopular = false
}: PricingCardProps) {
  const { t } = useLanguage();

  return (
    <div className={`bg-background/80 backdrop-blur-sm rounded-xl p-8 border transition-all duration-300 hover:scale-105 ${
      isPopular 
        ? "border-primary shadow-lg shadow-primary/20 relative" 
        : "border-gray-800 hover:border-primary/50"
    }`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
          MÁS POPULAR
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">${price_monthly}</span>
          <span className="text-gray-400">/mes</span>
        </div>
        <p className="text-gray-400 text-sm">
          o ${price_annual}/año (ahorra 20%)
        </p>
        <div className="mt-4 text-sm text-primary">
          {trial_days} días de prueba gratuita
        </div>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-300">
            {limits.requests_per_day} solicitudes/día
          </span>
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-300">
            Hasta {limits.users} usuarios
          </span>
        </li>
      </ul>
      
      <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
        isPopular
          ? "bg-primary hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          : "bg-gray-800 hover:bg-gray-700 text-white"
      }`}>
        {cta_label}
      </button>
    </div>
  );
}