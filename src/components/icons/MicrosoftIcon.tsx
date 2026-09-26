// src/components/icons/MicrosoftIcon.tsx
import React from 'react';

interface MicrosoftIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function MicrosoftIcon({ 
  className = 'w-24 h-24', 
  width = 96, 
  height = 96 
}: MicrosoftIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      width={width}
      height={height}
    >
      <rect x="0" y="0" width="11" height="11" fill="#F25022" />
      <rect x="13" y="0" width="11" height="11" fill="#7FBA00" />
      <rect x="0" y="13" width="11" height="11" fill="#00A4EF" />
      <rect x="13" y="13" width="11" height="11" fill="#FFB900" />
    </svg>
  );
}