import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-800 to-purple-900 text-white">
        <div className="p-4 border-b border-purple-700">
          <h1 className="text-2xl font-bold">SololaApp</h1>
          <p className="text-sm text-purple-200">Votre messagerie moderne</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 hover:bg-purple-700 rounded transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Messages
              </Link>
            </li>
            <li>
              <Link to="/live" className="flex items-center p-2 hover:bg-purple-700 rounded transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Live Streaming
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center p-2 hover:bg-purple-700 rounded transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Profil
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}