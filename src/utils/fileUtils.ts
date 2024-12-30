import { supabase } from '../lib/supabase';

export async function uploadFile(file: File, conversationId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${conversationId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('message-attachments')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('message-attachments')
    .getPublicUrl(filePath);

  return publicUrl;
}