import React from 'react';
import { usePinnedMessages } from '../hooks/usePinnedMessages';

interface PinnedMessageProps {
  conversationId: string;
}

export function PinnedMessage({ conversationId }: PinnedMessageProps) {
  const { pinnedMessages, unpinMessage } = usePinnedMessages(conversationId);
  
  if (pinnedMessages.length === 0) return null;

  const latestPinned = pinnedMessages[0];

  return (
    <div className="border-b p-2 bg-yellow-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="text-sm">{latestPinned.content}</span>
        </div>
        <button
          onClick={() => unpinMessage(latestPinned.id)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
}