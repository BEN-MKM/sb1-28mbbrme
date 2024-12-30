import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { MessageReaction } from '../types/chat';

export function useMessageReactions(messageId: string) {
  const [reactions, setReactions] = useState<MessageReaction[]>([]);

  useEffect(() => {
    fetchReactions();
    subscribeToReactions();
  }, [messageId]);

  async function fetchReactions() {
    const { data } = await supabase
      .from('message_reactions')
      .select('type, count(*)')
      .eq('message_id', messageId)
      .group('type');

    setReactions(data || []);
  }

  async function addReaction(type: string) {
    await supabase
      .from('message_reactions')
      .upsert([
        {
          message_id: messageId,
          user_id: supabase.auth.user()?.id,
          type
        }
      ]);
  }

  function subscribeToReactions() {
    const subscription = supabase
      .channel(`message-reactions:${messageId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'message_reactions',
        filter: `message_id=eq.${messageId}`
      }, fetchReactions)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  return { reactions, addReaction };
}