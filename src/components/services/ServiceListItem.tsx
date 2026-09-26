// src/components/services/ServiceListItem.tsx
"use client";

import { motion } from 'framer-motion';
import { MoreVertical, Circle } from 'lucide-react';
import { Service } from '@/hooks/useServicesData';
import { useState, useRef } from 'react';

interface ServiceListItemProps {
  service: Service;
  index: number;
  onOpenActions: (service: Service, position: { x: number; y: number }) => void;
}

export default function ServiceListItem({ service, index, onOpenActions }: ServiceListItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleActionsClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      onOpenActions(service, {
        x: rect.left,
        y: rect.bottom + 5
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="group"
    >
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
        
        {/* Status indicator */}
        <div className="flex-shrink-0">
          <motion.div
            animate={{
              scale: service.active ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: service.active ? Infinity : 0,
            }}
          >
            <Circle 
              className={`w-3 h-3 ${
                service.active 
                  ? 'fill-green-400 text-green-400' 
                  : 'fill-gray-600 text-gray-600'
              }`} 
            />
          </motion.div>
        </div>

        {/* Service info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
            {service.name}
          </h4>
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {service.description}
          </p>
        </div>

        {/* Status badge */}
        <div className="flex-shrink-0">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            service.active 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-gray-700/50 text-gray-500 border border-gray-600/20'
          }`}>
            {service.active ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        {/* Actions button */}
        <div className="flex-shrink-0">
          <motion.button
            ref={buttonRef}
            onClick={handleActionsClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
