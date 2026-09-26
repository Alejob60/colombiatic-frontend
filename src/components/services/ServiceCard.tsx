// src/components/services/ServiceCard.tsx
"use client";

import { motion } from 'framer-motion';
import { Globe, Bot, MessageSquare, ShoppingCart, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Category } from '@/hooks/useServicesData';

interface ServiceCardProps {
  category: Category;
  index: number;
  onExplore: (categoryId: string) => void;
}

const iconMap: { [key: string]: any } = {
  Globe,
  Bot,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  Sparkles
};

export default function ServiceCard({ category, index, onExplore }: ServiceCardProps) {
  const Icon = iconMap[category.icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 3,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Glass morphism card */}
      <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 overflow-hidden transition-all duration-300 group-hover:border-gray-600/80 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
        
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        </div>

        {/* Content */}
        <div className="relative p-6 sm:p-8 flex flex-col h-full">
          {/* Icon with gradient background */}
          <div className="mb-6 relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
          </div>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {category.services.length} servicios
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow line-clamp-3">
            {category.description}
          </p>

          {/* Services list preview */}
          <div className="mb-6 space-y-2">
            {category.services.slice(0, 3).map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                <span className="truncate">{service.name}</span>
              </motion.div>
            ))}
            {category.services.length > 3 && (
              <div className="text-xs text-gray-600 pl-3.5">
                +{category.services.length - 3} más...
              </div>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => onExplore(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${category.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
          >
            <span>Explorar servicios</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  );
}
