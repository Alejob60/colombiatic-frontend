import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#3BA5FF',
  className = '',
  message = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const spinnerSize = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`${spinnerSize} rounded-full border-2 border-t-transparent animate-spin`}
        style={{ borderColor: color }}
      />
      {message && (
        <p className="mt-2 text-sm text-[#94A3B8]">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;