import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ content: newMessage }]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message: any) => (
          <div key={message.id} className="mb-4">
            <div className="bg-white p-3 rounded-lg shadow">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}