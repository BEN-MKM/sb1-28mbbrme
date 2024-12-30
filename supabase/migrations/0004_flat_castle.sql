/*
  # Add support for message reactions and pins

  1. New Tables
    - message_reactions: Stores user reactions to messages
  2. Changes
    - Add is_pinned column to messages table
*/

-- Create message reactions table
CREATE TABLE IF NOT EXISTS message_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES messages ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(message_id, user_id, type)
);

-- Add is_pinned column to messages
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'is_pinned'
  ) THEN
    ALTER TABLE messages ADD COLUMN is_pinned boolean DEFAULT false;
  END IF;
END $$;

-- Enable RLS on message_reactions
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for message_reactions
CREATE POLICY "Users can read reactions"
  ON message_reactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add reactions"
  ON message_reactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);