'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from '@/components/chatblocks/code-block';
import { Button } from '@/components/ui/button';

const reactCode = `import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}`;

export default function CodeBlockAdvanced() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reactCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore in the demo
    }
  };

  return (
    <div className="w-full">
      <CodeBlock>
        <CodeBlockGroup>
          <span className="text-muted-foreground text-sm">
            example.tsx
          </span>
          <Button
            className="h-8 w-8 p-0"
            onClick={copyToClipboard}
            size="sm"
            variant="ghost"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </CodeBlockGroup>
        <CodeBlockCode code={reactCode} language="tsx" />
      </CodeBlock>
    </div>
  );
}
