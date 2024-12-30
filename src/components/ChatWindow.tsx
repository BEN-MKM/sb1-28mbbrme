import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export function ChatWindow() {
  const { conversationId } = useParams();
  
  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <MessageList conversationId={conversationId} />
      <MessageInput conversationId={conversationId} />
    </div>
  );
}