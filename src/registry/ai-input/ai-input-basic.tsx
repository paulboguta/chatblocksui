'use client';

import { useState } from 'react';
import {
  AiInput,
  AiInputField,
  AiInputSubmit,
  AiInputToolbar,
  AiInputToolbarRight,
} from '@/components/chatblocks/ai-input';

export default function AiInputDemo() {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      // Handle sending the message to the AI Provider
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
        <AiInputToolbarRight>
          <AiInputSubmit />
        </AiInputToolbarRight>
      </AiInputToolbar>
    </AiInput>
  );
}
