import React, { useState, useRef } from 'react';
import { startRecording, stopRecording } from '../utils/audioUtils';

interface VoiceRecorderProps {
  onRecordingComplete: (audioUrl: string) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    try {
      const recorder = await startRecording();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handleStopRecording = async () => {
    if (!mediaRecorderRef.current) return;
    
    try {
      const audioUrl = await stopRecording(mediaRecorderRef.current);
      onRecordingComplete(audioUrl);
      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={isRecording ? handleStopRecording : handleStartRecording}
      className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'hover:bg-gray-100'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isRecording ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    </button>
  );
}