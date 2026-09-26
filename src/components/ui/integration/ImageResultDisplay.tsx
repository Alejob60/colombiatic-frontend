import React, { useState, useEffect } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ImageResultDisplayProps {
  imageUrl: string;
  title?: string;
  onDownload?: () => void;
  onRegenerate?: () => void;
  isLoading?: boolean;
  className?: string;
}

const ImageResultDisplay: React.FC<ImageResultDisplayProps> = ({
  imageUrl,
  title = 'Imagen Generada',
  onDownload,
  onRegenerate,
  isLoading = false,
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setImageLoaded(false);
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (onDownload) onDownload();
  };

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl p-8 ${className}`}>
        <LoadingSpinner size="lg" message="Generando imagen..." />
      </div>
    );
  }

  return (
    <div className={`bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.07)]">
        <h3 className="text-lg font-semibold text-[#E6EDF3]">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            disabled={!imageUrl}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#334155] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Descargar imagen"
          >
            <Download className="w-4 h-4 text-[#94A3B8]" />
          </button>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#334155] transition-colors"
              title="Regenerar imagen"
            >
              <RotateCcw className="w-4 h-4 text-[#94A3B8]" />
            </button>
          )}
        </div>
      </div>
      <div className="p-4 flex items-center justify-center">
        {!imageLoaded ? (
          <LoadingSpinner size="md" message="Cargando imagen..." />
        ) : (
          <img 
            src={imageUrl} 
            alt={title}
            className="max-w-full h-auto rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ImageResultDisplay;