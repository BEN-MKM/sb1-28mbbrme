import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FileUpload } from './FileUpload';
import { VoiceRecorder } from './VoiceRecorder';

interface MessageInputProps {
  conversationId: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            content: message,
            conversation_id: conversationId,
            type: 'text'
          }
        ]);

      if (error) throw error;
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const handleVoiceMessage = async (audioUrl: string) => {
    try {
      await supabase
        .from('messages')
        .insert([
          {
            content: audioUrl,
            conversation_id: conversationId,
            type: 'voice'
          }
        ]);
    } catch (error) {
      console.error('Error sending voice message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center gap-2">
        <FileUpload 
          conversationId={conversationId}
          onUploadComplete={(fileUrl) => {}}
        />
        <VoiceRecorder onRecordingComplete={handleVoiceMessage} />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
  );
}