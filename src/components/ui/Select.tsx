// src/components/ui/Select.tsx
// Select component

import React, { useState, useRef, useEffect } from 'react';

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}>({
  open: false,
  setOpen: () => {},
  value: '',
  onValueChange: () => {},
  disabled: false,
  children: null,
});

const Select: React.FC<SelectProps> = ({ children, value = '', onValueChange, disabled }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange, disabled, children }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className = '' }) => {
  const { open, setOpen, disabled } = React.useContext(SelectContext);
  
  return (
    <button
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => !disabled && setOpen(!open)}
      disabled={disabled}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
};

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value, children } = React.useContext(SelectContext);
  
  // Find the selected item's children
  const childArray = React.Children.toArray(children);
  const selectedItem = childArray.find(
    (child): child is React.ReactElement<SelectItemProps> =>
      React.isValidElement<SelectItemProps>(child) && child.props.value === value
  );
  
  return (
    <>
      {value
        ? (selectedItem?.props.children ?? value)
        : <span className="text-gray-400">{placeholder}</span>
      }
    </>
  );
};

const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  const { open, setOpen } = React.useContext(SelectContext);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);
  
  if (!open) return null;
  
  return (
    <div
      ref={contentRef}
      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-600 bg-gray-800 text-white shadow-md"
    >
      {children}
    </div>
  );
};

const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  const { value: selectedValue, onValueChange, setOpen } = React.useContext(SelectContext);
  
  const isSelected = selectedValue === value;
  
  const handleClick = () => {
    if (onValueChange) {
      onValueChange(value);
    }
    setOpen(false);
  };
  
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-700 ${
        isSelected ? 'bg-gray-700' : ''
      }`}
      onClick={handleClick}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };