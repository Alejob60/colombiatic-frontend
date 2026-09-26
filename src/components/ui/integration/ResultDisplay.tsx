import React from 'react';
import { Copy, Download } from 'lucide-react';

interface ResultDisplayProps {
  content: string;
  title?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  className?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  content,
  title = 'Resultado',
  onCopy,
  onDownload,
  className = ''
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    if (onCopy) onCopy();
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (onDownload) onDownload();
  };

  return (
    <div className={`bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.07)]">
        <h3 className="text-lg font-semibold text-[#E6EDF3]">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#334155] transition-colors"
            title="Copiar al portapapeles"
          >
            <Copy className="w-4 h-4 text-[#94A3B8]" />
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#334155] transition-colors"
            title="Descargar"
          >
            <Download className="w-4 h-4 text-[#94A3B8]" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <pre className="whitespace-pre-wrap text-[#E6EDF3] font-sans">
          {content}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;