'use client';

import React from 'react';
import { CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'text' }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2"
        onClick={copyToClipboard}
      >
        <CopyIcon className="h-4 w-4 mr-2" />
        {copied ? 'Copiado!' : 'Copiar'}
      </Button>
    </div>
  );
};