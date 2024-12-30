import React, { useState } from 'react';
import { translateText, getAvailableLanguages } from '../utils/translationUtils';

interface TranslationButtonProps {
  content: string;
  type: 'text' | 'voice';
}

export function TranslationButton({ content, type }: TranslationButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('fr');

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const translated = await translateText(content, selectedLang);
      setTranslatedContent(translated);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="mt-1 flex items-center gap-2">
      <select 
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        className="text-sm border rounded px-2 py-1"
      >
        {getAvailableLanguages().map(lang => (
          <option key={lang} value={lang}>{lang.toUpperCase()}</option>
        ))}
      </select>
      <button
        onClick={handleTranslate}
        disabled={isTranslating}
        className="text-sm text-blue-500 hover:text-blue-700"
      >
        {isTranslating ? 'Traduction...' : 'Traduire'}
      </button>
      {translatedContent && (
        <div className="text-sm text-gray-600 italic">
          {translatedContent}
        </div>
      )}
    </div>
  );
}