import React from 'react';
import { ConversationList } from '../components/ConversationList';
import { ChatWindow } from '../components/ChatWindow';

export function Chat() {
  return (
    <div className="h-full flex">
      <div className="w-80">
        <ConversationList />
      </div>
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
}