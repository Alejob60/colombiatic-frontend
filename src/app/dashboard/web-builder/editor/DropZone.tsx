// src/app/dashboard/web-builder/editor/DropZone.tsx
"use client";

import { useDrop } from 'react-dnd';
import { useWebsiteBuilder } from '@/contexts/WebsiteBuilderContext';

interface DropZoneProps {
  children: React.ReactNode;
  className?: string;
}

export default function DropZone({ children, className = '' }: DropZoneProps) {
  const { addSection } = useWebsiteBuilder();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: { type: string }) => {
      const newSection = {
        type: item.type as any,
        content: {},
        order: Date.now()
      };
      
      addSection(newSection);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={`min-h-[200px] transition-colors ${
        isOver ? 'bg-blue-900/20 border-2 border-dashed border-blue-500' : 'bg-gray-800'
      } ${className}`}
    >
      {children}
    </div>
  );
}