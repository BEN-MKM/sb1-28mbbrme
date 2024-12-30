import { supabase } from '../lib/supabase';

const SUPPORTED_LANGUAGES = ['fr', 'en', 'es', 'de', 'it'];

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke('translate', {
      body: { text, targetLang }
    });
    
    if (error) throw error;
    return data.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
}

export function getAvailableLanguages(): string[] {
  return SUPPORTED_LANGUAGES;
}