import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  meta?: {
    suggestions?: string[] | null;
    source?: string | null;
    isExternal?: boolean;
  };
}

const CHATBOT_API_URL =
  'https://sagarsarang.app.n8n.cloud/webhook/c44278f5-b4c8-4f01-9cea-f2895326cbb8/chat';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(CHATBOT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content.trim(),
            history: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) throw new Error('Failed to get response');

        const data = await response.json();

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content:
            data.answer || data.text || data.message || data.output || 'I received your message.',
          timestamp: new Date(),
          meta: {
            suggestions: data.suggestions || null,
            source: data.source || null,
            isExternal: data.is_external || false,
          },
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Chatbot error:', error);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const clearMessages = () => setMessages([]);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return {
    messages,
    isLoading,
    isOpen,
    setIsOpen,
    sendMessage,
    clearMessages,
    toggleOpen,
  };
};
