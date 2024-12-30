import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Message } from '../types/chat';

export function usePinnedMessages(conversationId: string) {
  const [pinnedMessages, setPinnedMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchPinnedMessages();
    subscribeToPinnedMessages();
  }, [conversationId]);

  async function fetchPinnedMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('is_pinned', true)
      .order('created_at', { ascending: false });

    setPinnedMessages(data || []);
  }

  async function pinMessage(messageId: string) {
    await supabase
      .from('messages')
      .update({ is_pinned: true })
      .eq('id', messageId);
  }

  async function unpinMessage(messageId: string) {
    await supabase
      .from('messages')
      .update({ is_pinned: false })
      .eq('id', messageId);
  }

  function subscribeToPinnedMessages() {
    const subscription = supabase
      .channel(`pinned-messages:${conversationId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId} AND is_pinned=eq.true`
      }, fetchPinnedMessages)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { pinnedMessages, pinMessage, unpinMessage };
}