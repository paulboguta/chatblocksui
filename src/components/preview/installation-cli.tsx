'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export function ComponentCliInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex items-center overflow-x-auto rounded-lg border">
      <div className="no-scrollbar flex-1 overflow-x-auto px-4 py-3.5">
        <code
          className="relative border-none bg-transparent font-mono text-sm leading-none"
          data-language="bash"
        >
          {command}
        </code>
      </div>
      <Button
        className="z-10 mr-4 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={() => handleCopy(command)}
        size="icon"
        title="Copy to clipboard"
        variant="ghost"
      >
        <span className="sr-only">Copy</span>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
