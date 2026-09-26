import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  placeholder = "Escribe tu prompt aquí...",
  isLoading = false,
  className = ""
}) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative flex items-end gap-2 p-3 bg-[#1A2633] border border-[rgba(255,255,255,0.07)] rounded-xl focus-within:border-[#3BA5FF] transition-colors">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 bg-transparent border-none outline-none resize-none text-[#E6EDF3] placeholder-[#94A3B8] min-h-[24px] max-h-[120px]"
          rows={1}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0066FF] hover:bg-[#00C2FF] disabled:bg-[#334155] disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          ) : (
            <Send className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptInput;