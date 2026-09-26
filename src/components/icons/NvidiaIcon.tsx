// src/components/icons/NvidiaIcon.tsx
import React from 'react';

interface NvidiaIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function NvidiaIcon({ 
  className = 'w-24 h-24', 
  width = 96, 
  height = 96 
}: NvidiaIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      width={width}
      height={height}
    >
      <rect width="24" height="24" fill="#76B900" rx="4" />
      <path 
        d="M6 6h12v12H6z" 
        fill="white" 
      />
      <path 
        d="M8 8h8v8H8z" 
        fill="#76B900" 
      />
      <path 
        d="M10 10h4v4h-4z" 
        fill="white" 
      />
    </svg>
  );
}