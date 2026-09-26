// src/app/dashboard/web-builder/editor/DraggableComponent.tsx
"use client";

import { useDrag } from 'react-dnd';
import { useTranslations } from '@/lib/i18n';

interface DraggableComponentProps {
  id: string;
  type: string;
  name: string;
  icon: React.ReactNode;
}

export default function DraggableComponent({ id, type, name, icon }: DraggableComponentProps) {
  const { t } = useTranslations();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { id, type },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      className={`flex items-center p-3 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors text-left cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-white">{name}</span>
      </div>
    </div>
  );
}