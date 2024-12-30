import React, { useEffect, useRef, useState } from 'react';
import { initializeVideoCall, joinVideoCall } from '../utils/videoUtils';

interface VideoCallProps {
  conversationId: string;
  onEnd: () => void;
}

export function VideoCall({ conversationId, onEnd }: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const setupCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        await initializeVideoCall(stream, conversationId, remoteVideoRef);
        setIsConnecting(false);
      } catch (error) {
        console.error('Error setting up video call:', error);
        onEnd();
      }
    };

    setupCall();

    return () => {
      // Cleanup video streams
      if (localVideoRef.current?.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [conversationId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="relative aspect-video mb-4">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full bg-gray-900 rounded"
          />
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute bottom-4 right-4 w-48 bg-gray-900 rounded"
          />
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onEnd}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
          >
            End Call
          </button>
        </div>
        
        {isConnecting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white">Connecting...</div>
          </div>
        )}
      </div>
    </div>
  );
}