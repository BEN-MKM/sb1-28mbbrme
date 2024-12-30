export interface Message {
  id: string;
  content: string;
  user_id: string;
  conversation_id: string;
  created_at: string;
  type: 'text' | 'file' | 'voice' | 'video';
  is_pinned?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  is_group: boolean;
  created_at: string;
  members: string[];
}

export interface MessageReaction {
  type: string;
  count: number;
}

export type ReactionType = '👍' | '❤️' | '😂' | '😮' | '😢' | '🙏';