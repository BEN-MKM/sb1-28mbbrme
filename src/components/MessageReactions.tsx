import React from 'react';
import { useMessageReactions } from '../hooks/useMessageReactions';
import { ReactionType } from '../types/chat';

interface MessageReactionsProps {
  messageId: string;
}

export function MessageReactions({ messageId }: MessageReactionsProps) {
  const { reactions, addReaction } = useMessageReactions(messageId);

  const reactionTypes: ReactionType[] = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  return (
    <div className="flex gap-1 mt-1">
      {reactions.map((reaction) => (
        <button
          key={reaction.type}
          onClick={() => addReaction(reaction.type)}
          className="px-2 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
        >
          {reaction.type} {reaction.count}
        </button>
      ))}
      <div className="relative group">
        <button className="px-2 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
          +
        </button>
        <div className="absolute bottom-full left-0 hidden group-hover:flex bg-white shadow-lg rounded-lg p-2 gap-1">
          {reactionTypes.map((type) => (
            <button
              key={type}
              onClick={() => addReaction(type)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}