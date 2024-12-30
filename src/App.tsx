import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Messages } from './pages/Messages';
import { LiveStream } from './pages/LiveStream';
import { Chat } from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="chat/:conversationId?" element={<Chat />} />
          <Route path="live" element={<LiveStream />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;