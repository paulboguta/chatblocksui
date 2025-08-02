import { AiInput } from '@/registry/ai-input/ai-input';

export default function AiInputDemo() {
  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">Chat with AI</h3>
          <p className="text-muted-foreground text-sm">Ask me anything!</p>
        </div>
        <AiInput />
      </div>
    </div>
  );
}
