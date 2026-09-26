import React, { useState } from 'react';
import { Download, Eye, Trash2 } from 'lucide-react';
import ImageResultDisplay from './ImageResultDisplay';

export interface GalleryItem {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onView?: (item: GalleryItem) => void;
  onDownload?: (item: GalleryItem) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  onView,
  onDownload,
  onDelete,
  className = ''
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleView = (item: GalleryItem) => {
    setSelectedItem(item);
    if (onView) onView(item);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  if (items.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-[#334155] flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-[#94A3B8]" />
        </div>
        <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">Galería vacía</h3>
        <p className="text-[#94A3B8] max-w-md">
          Aún no has generado ninguna imagen. Comienza creando tu primera imagen con IA.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden hover:border-[#3BA5FF] transition-colors"
          >
            <div className="relative">
              <img 
                src={item.url} 
                alt={item.prompt}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleView(item)}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleView(item)}
                  className="p-2 rounded-lg bg-[#0066FF] hover:bg-[#00C2FF] text-white"
                  title="Ver"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDownload && onDownload(item)}
                  className="p-2 rounded-lg bg-[#0066FF] hover:bg-[#00C2FF] text-white"
                  title="Descargar"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete && onDelete(item.id)}
                  className="p-2 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[#E6EDF3] text-sm font-medium truncate" title={item.prompt}>
                {item.prompt}
              </p>
              <p className="text-[#94A3B8] text-xs mt-1">
                {formatDate(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto">
            <button
              onClick={handleClosePreview}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#1A2633] hover:bg-[#334155] text-[#E6EDF3] z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ImageResultDisplay
              imageUrl={selectedItem.url}
              title={selectedItem.prompt}
              className="border-none"
            />
            <div className="mt-4 text-center">
              <p className="text-[#E6EDF3]">{selectedItem.prompt}</p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Generado el {formatDate(selectedItem.timestamp)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;