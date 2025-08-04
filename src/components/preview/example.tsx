import { ComponentPreview } from '@/components/preview';

export interface ComponentExampleProps {
  primitive: string;
  example: string;
  display?: 'default' | 'fullscreen';
  className?: string;
}

export function ComponentExample({
  primitive,
  example,
  display = 'default',
  className,
}: ComponentExampleProps) {
  return (
    <ComponentPreview
      className={className}
      display={display}
      example={example}
      primitive={primitive}
    />
  );
}
