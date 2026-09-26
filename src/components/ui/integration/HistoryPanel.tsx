import React, { useState, useEffect } from 'react';
import { Clock, Trash2, FileText, Image } from 'lucide-react';

export interface HistoryItem {
  id: string;
  type: 'content' | 'image';
  prompt: string;
  result: string;
  timestamp: string;
}

interface HistoryPanelProps {
  items: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  className?: string;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  items,
  onSelectItem,
  onDeleteItem,
  className = ''
}) => {
  const [filteredItems, setFilteredItems] = useState<HistoryItem[]>(items);
  const [filter, setFilter] = useState<'all' | 'content' | 'image'>('all');

  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.type === filter));
    }
  }, [items, filter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 border-b border-[rgba(255,255,255,0.07)]">
        <h3 className="text-lg font-semibold text-[#E6EDF3] mb-3">Historial</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm ${
              filter === 'all' 
                ? 'bg-[#0066FF] text-white' 
                : 'bg-[#334155] text-[#94A3B8] hover:bg-[#475569]'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('content')}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              filter === 'content' 
                ? 'bg-[#0066FF] text-white' 
                : 'bg-[#334155] text-[#94A3B8] hover:bg-[#475569]'
            }`}
          >
            <FileText className="w-4 h-4" />
            Contenido
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
              filter === 'image' 
                ? 'bg-[#0066FF] text-white' 
                : 'bg-[#334155] text-[#94A3B8] hover:bg-[#475569]'
            }`}
          >
            <Image className="w-4 h-4" />
            Imágenes
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <Clock className="w-12 h-12 text-[#334155] mx-auto mb-3" />
            <p className="text-[#94A3B8]">No hay elementos en el historial</p>
          </div>
        ) : (
          <ul className="divide-y divide-[rgba(255,255,255,0.07)]">
            {filteredItems.map((item) => (
              <li 
                key={item.id} 
                className="p-3 hover:bg-[#334155] cursor-pointer transition-colors"
                onClick={() => onSelectItem(item)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {item.type === 'content' ? (
                      <FileText className="w-5 h-5 text-[#3BA5FF]" />
                    ) : (
                      <Image className="w-5 h-5 text-[#3BA5FF]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E6EDF3] text-sm font-medium truncate">
                      {item.prompt}
                    </p>
                    <p className="text-[#94A3B8] text-xs mt-1 truncate">
                      {item.result.substring(0, 60)}...
                    </p>
                    <p className="text-[#64748B] text-xs mt-1">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(item.id);
                    }}
                    className="p-1 rounded hover:bg-[#475569] text-[#94A3B8] hover:text-[#E6EDF3]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;