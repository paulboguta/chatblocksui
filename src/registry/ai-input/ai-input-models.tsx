'use client';

import { useState } from 'react';
import {
  AiInput,
  AiInputField,
  AiInputModelSelector,
  AiInputSubmit,
  AiInputToolbar,
  AiInputToolbarLeft,
  AiInputToolbarRight,
} from '@/components/chatblocks/ai-input';

const models = [
  { label: 'Claude 4.1 Nano', value: 'claude-4.1-nano' },
  { label: 'Claude Sonnet 4', value: 'claude-sonnet-4' },
  { label: 'Claude Opus 4', value: 'claude-opus-4' },
  { label: 'GPT-4.5', value: 'gpt-4.5' },
  { label: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro' },
  { label: 'Grok 4', value: 'grok-4' },
];

export default function AiInputModelsDemo() {
  const [value, setValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('claude-4.1-nano');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      // Handle sending the message to the AI Provider with selected model
      setValue('');
    }
  };

  return (
    <AiInput onSubmit={handleSubmit}>
      <AiInputField
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything"
        value={value}
      />
      <AiInputToolbar>
        <AiInputToolbarLeft>
          <AiInputModelSelector
            models={models}
            onValueChange={setSelectedModel}
            value={selectedModel}
          />
        </AiInputToolbarLeft>
        <AiInputToolbarRight>
          <AiInputSubmit />
        </AiInputToolbarRight>
      </AiInputToolbar>
    </AiInput>
  );
}