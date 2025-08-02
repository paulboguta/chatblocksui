'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ComponentPreviewDisplayProps {
  children: ReactNode;
  display: 'default' | 'fullscreen';
}

export function ComponentPreviewDisplay({
  children,
  display,
}: ComponentPreviewDisplayProps) {
  return (
    <div
      className={cn(
        'h-full w-full',
        display === 'default'
          ? 'flex items-center justify-center p-8'
          : 'overflow-auto p-4'
      )}
    >
      {children}
    </div>
  );
}
