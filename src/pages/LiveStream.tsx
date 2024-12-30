import React, { useState } from 'react';
import ReactPlayer from 'react-player';

export function LiveStream() {
  const [streamUrl, setStreamUrl] = useState('');

  return (
    <div className="h-full p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Live Streaming</h1>
        
        {/* Stream player */}
        <div className="aspect-video bg-black mb-4">
          {streamUrl ? (
            <ReactPlayer
              url={streamUrl}
              width="100%"
              height="100%"
              playing
              controls
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white">
              No active stream
            </div>
          )}
        </div>

        {/* Stream URL input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="Enter stream URL..."
          />
          <button
            onClick={() => setStreamUrl('')}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}