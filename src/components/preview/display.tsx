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
        'relative h-full w-full overflow-hidden bg-background',
        display === 'default'
          ? 'flex items-center justify-center'
          : 'overflow-auto'
      )}
    >
      {/* Dotted guide lines - positioned absolutely */}
      <div className='-translate-y-px absolute top-6 right-0 left-0 border-border border-t border-dashed' />
      <div className='absolute right-0 bottom-6 left-0 translate-y-px border-border border-b border-dashed' />
      <div className='-translate-x-px absolute top-0 bottom-0 left-6 border-border border-l border-dashed' />
      <div className='absolute top-0 right-6 bottom-0 translate-x-px border-border border-r border-dashed' />

      {/* Content container with padding inside the guides */}
      <div className="relative z-10 w-full px-6 py-6">{children}</div>
    </div>
  );
}
