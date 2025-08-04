'use client';

import { useState } from 'react';
import {
  AIInput,
  AIInputField,
  AIInputSubmit,
  AIInputToolbar,
  AIInputToolbarRight,
} from '@/components/chatblocks/ai-input';

export default function AIInputDemo() {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      // Handle sending the message to the AI Provider
      setValue('');
    }
  };

  return (
    <AIInput onSubmit={handleSubmit}>
      <AIInputField
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything"
        value={value}
      />
      <AIInputToolbar>
        <AIInputToolbarRight>
          <AIInputSubmit />
        </AIInputToolbarRight>
      </AIInputToolbar>
    </AIInput>
  );
}
