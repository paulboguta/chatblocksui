import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function AiInput() {
  return (
    <div className="flex items-end gap-2">
      <Textarea
        className="min-h-[60px] resize-none"
        placeholder="Ask me anything..."
        rows={2}
      />
      <Button className="h-[60px] w-[60px]" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
