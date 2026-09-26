import React from 'react';
import { Coins, Zap } from 'lucide-react';

interface CreditsDisplayProps {
  balance: number;
  plan: string;
  onUpgrade?: () => void;
  className?: string;
}

const CreditsDisplay: React.FC<CreditsDisplayProps> = ({
  balance,
  plan,
  onUpgrade,
  className = ''
}) => {
  const isLowBalance = balance < 10;
  const isOutOfCredits = balance <= 0;

  return (
    <div className={`bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#334155]">
            <Coins className="w-6 h-6 text-[#3BA5FF]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#E6EDF3]">Créditos</h3>
            <p className="text-sm text-[#94A3B8]">{plan}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            isOutOfCredits ? 'text-red-400' : 
            isLowBalance ? 'text-yellow-400' : 'text-[#3BA5FF]'
          }`}>
            {balance}
          </p>
          <p className="text-xs text-[#94A3B8]">disponibles</p>
        </div>
      </div>
      
      {isOutOfCredits && (
        <div className="mt-3 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-400" />
            <p className="text-sm text-red-400">
              ¡Sin créditos! Necesitas recargar para continuar.
            </p>
          </div>
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="mt-2 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Recargar créditos
            </button>
          )}
        </div>
      )}
      
      {isLowBalance && !isOutOfCredits && (
        <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <p className="text-sm text-yellow-400">
              Créditos bajos. Considera recargar pronto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditsDisplay;