import { ComponentPreview } from '@/components/preview';

export interface ComponentExampleProps {
  name: string;
  display?: 'default' | 'fullscreen';
  className?: string;
}

export function ComponentExample({
  name,
  display = 'default',
  className,
}: ComponentExampleProps) {
  return (
    <ComponentPreview
      className={className}
      display={display}
      name={name}
    />
  );
}
