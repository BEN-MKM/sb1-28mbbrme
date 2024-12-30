import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageReactions } from './MessageReactions';
import { PinnedMessage } from './PinnedMessage';
import { TranslationButton } from './TranslationButton';
import type { Message } from '../types/chat';

interface MessageListProps {
  conversationId: string;
}

export function MessageList({ conversationId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
    
    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId]);

  const renderMessage = (message: Message) => {
    return (
      <div key={message.id} className="flex flex-col">
        <div className="bg-white rounded-lg shadow p-3 max-w-[80%]">
          {message.type === 'voice' ? (
            <>
              <audio src={message.content} controls className="w-full" />
              <TranslationButton content={message.content} type="voice" />
            </>
          ) : (
            <>
              <p>{message.content}</p>
              <TranslationButton content={message.content} type="text" />
            </>
          )}
          <span className="text-xs text-gray-500">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
        <MessageReactions messageId={message.id} />
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <PinnedMessage conversationId={conversationId} />
      <div className="p-4 space-y-4">
        {messages.map(renderMessage)}
      </div>
    </div>
  );
}