import React from 'react';
import { useConversations } from '../hooks/useConversations';
import { Link, useParams } from 'react-router-dom';

export function ConversationList() {
  const { conversations, loading } = useConversations();
  const { conversationId } = useParams();

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  return (
    <div className="h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>
      <div className="overflow-y-auto">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/chat/${conversation.id}`}
            className={`block p-4 hover:bg-gray-100 ${
              conversationId === conversation.id ? 'bg-gray-100' : ''
            }`}
          >
            <div className="font-medium">{conversation.name}</div>
            <div className="text-sm text-gray-500">
              {conversation.is_group ? 'Group Chat' : 'Direct Message'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}