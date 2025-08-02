'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col gap-2', className)}
      data-slot="tabs"
      {...props}
    />
  );
}

interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  variant?: 'default' | 'compact';
}

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex w-fit items-center justify-center text-muted-foreground',
        variant === 'default' && 'h-9 rounded-lg bg-muted p-[3px]',
        variant === 'compact' && 'h-7 gap-1 border-b p-0',
        className
      )}
      data-slot="tabs-list"
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  variant?: 'default' | 'compact';
}

function TabsTrigger({
  className,
  variant = 'default',
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap border border-transparent font-medium transition-all focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
        'text-muted-foreground hover:text-foreground',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variant === 'default' && [
          'h-[calc(100%-1px)] flex-1 gap-1.5 rounded-md px-2 py-1 text-sm',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          'dark:data-[state=active]:border-white/10 dark:data-[state=active]:bg-white/10 dark:data-[state=active]:text-foreground',
        ],
        variant === 'compact' && [
          'h-7 gap-1 rounded-none px-2 py-1 text-xs',
          'data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:font-semibold',
          'dark:data-[state=active]:bg-white/5',
        ],
        'focus-visible:border-ring focus-visible:outline-ring focus-visible:ring-ring/50',
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn('flex-1 outline-none', className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type { TabsListProps, TabsTriggerProps };
