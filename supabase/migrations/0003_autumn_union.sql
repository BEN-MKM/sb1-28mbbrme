/*
  # Add file sharing support

  1. Changes
    - Add `type` column to messages table
    - Create storage bucket for file attachments
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'type'
  ) THEN
    ALTER TABLE messages ADD COLUMN type text DEFAULT 'text';
  END IF;
END $$;