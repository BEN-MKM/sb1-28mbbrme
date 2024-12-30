import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../utils/fileUtils';

interface FileUploadProps {
  conversationId: string;
  onUploadComplete: (fileUrl: string) => void;
}

export function FileUpload({ conversationId, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);

    try {
      const fileUrl = await uploadFile(file, conversationId);
      onUploadComplete(fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </label>
      {uploading && (
        <span className="ml-2 text-sm text-gray-500">Uploading...</span>
      )}
    </div>
  );
}