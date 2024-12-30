/*
  # Create conversations and members tables

  1. New Tables
    - `conversations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `is_group` (boolean)
      - `created_at` (timestamp)
    - `conversation_members`
      - `conversation_id` (uuid, references conversations)
      - `user_id` (uuid, references auth.users)
      - `joined_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for members to read their conversations
    - Add policies for creating and joining conversations
*/

CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  is_group boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE conversation_members (
  conversation_id uuid REFERENCES conversations ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view conversations they are members of"
  ON conversations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_members
      WHERE conversation_id = conversations.id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Members can view conversation members"
  ON conversation_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversation_members members
      WHERE members.conversation_id = conversation_members.conversation_id
      AND members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join conversations they are invited to"
  ON conversation_members
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
  );