'use client';

import { ArrowUp } from 'lucide-react';
import type * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

function AIInput({
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn(
        'relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border bg-background shadow-xs transition-colors focus-within:border-ring/30',
        className
      )}
      {...props}
    />
  );
}

interface AIInputFieldProps extends React.ComponentProps<typeof Textarea> {
  onSubmit?: () => void;
}

function AIInputField({
  className,
  onSubmit,
  onKeyDown,
  ...props
}: AIInputFieldProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };

  return (
    <Textarea
      className={cn(
        'max-h-[180px] min-h-[56px] resize-none overflow-y-auto border-none px-5 py-3.5 text-base shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0',
        'bg-transparent dark:bg-transparent',
        className
      )}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

function AIInputToolbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between px-3 py-2', className)}
      {...props}
    />
  );
}

function AIInputToolbarLeft({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props} />
  );
}

function AIInputToolbarRight({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-1 items-center justify-end gap-2', className)}
      {...props}
    />
  );
}

interface AIInputSubmitProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode;
}

function AIInputSubmit({
  className,
  icon,
  children,
  ...props
}: AIInputSubmitProps) {
  return (
    <Button
      className={cn(
        'h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90',
        className
      )}
      size="icon"
      type="submit"
      {...props}
    >
      {children || icon || <ArrowUp className="h-5 w-5" />}
    </Button>
  );
}

interface AIInputModelSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  models?: Array<{ label: string; value: string }>;
  placeholder?: string;
  className?: string;
}

function AIInputModelSelector({
  value,
  onValueChange,
  models = [],
  placeholder = 'Select model',
  className,
}: AIInputModelSelectorProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger
        className={cn(
          'h-8 gap-1 rounded-2xl border px-2 text-sm hover:bg-accent',
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export {
  AIInput,
  AIInputField,
  AIInputToolbar,
  AIInputToolbarLeft,
  AIInputToolbarRight,
  AIInputSubmit,
  AIInputModelSelector,
};
export type {
  AIInputFieldProps,
  AIInputSubmitProps,
  AIInputModelSelectorProps,
};
