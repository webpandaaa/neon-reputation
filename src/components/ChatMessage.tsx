import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  meta?: {
    suggestions?: string[] | null;
    source?: string | null;
    isExternal?: boolean;
  };
  onSuggestionClick?: (text: string) => void;
}

export const ChatMessage = ({ role, content, timestamp, meta, onSuggestionClick }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-3 rounded-lg animate-fade-in',
        isUser ? 'bg-primary/10 ml-4' : 'bg-muted/50 mr-4'
      )}
    >
      {/* Avatar + Header */}
      <div className="flex gap-3">
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{isUser ? 'You' : 'AI Assistant'}</span>
            <span className="text-xs text-muted-foreground">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* ANSWER (HTML supported) */}
          <div
            className="text-sm text-foreground/90 whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      {/* SOURCE */}
      {meta?.source && (
        <div className="text-xs text-muted-foreground ml-11">
          Source: <span className="font-medium">{meta.source}</span>
        </div>
      )}

      {/* SUGGESTIONS */}
      {meta?.suggestions && (
        <div className="flex flex-wrap gap-2 ml-11">
          {meta.suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSuggestionClick?.(s)}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 hover:bg-primary/20 transition text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
