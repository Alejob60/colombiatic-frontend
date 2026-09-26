// src/app/(i18n)/[lang]/(dashboard)/test-layout/page.tsx
"use client";

import { useState } from 'react';
import { withAuth } from '@/components/hoc/withAuth';

function TestLayoutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatPanelOpen, setChatPanelOpen] = useState(true);

  return (
    <div className="dashboard h-screen bg-gray-900 overflow-hidden">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50 flex items-center space-x-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-gray-800 p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
        >
          ☰
        </button>
        <button
          onClick={() => setChatPanelOpen(!chatPanelOpen)}
          className="bg-gray-800 p-2 rounded-md text-gray-300 hover:text-white focus:outline-none md:hidden"
        >
          💬
        </button>
      </div>

      {/* Left Panel - Vertical Menu */}
      <div className={`menu-panel absolute md:relative inset-y-0 left-0 z-40 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-4">
            <div className="flex items-center">
              <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="ml-2 text-white text-xl font-semibold">ColombiaTIC</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              ×
            </button>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto pb-4">
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Menu Item 1
            </div>
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Menu Item 2
            </div>
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              Menu Item 3
            </div>
          </nav>
          <div className="flex flex-shrink-0 p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white">U</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">User Name</p>
                <p className="text-xs font-medium text-gray-300 truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {(sidebarOpen || chatPanelOpen) && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => {
            setSidebarOpen(false);
            setChatPanelOpen(false);
          }}
        ></div>
      )}

      {/* Center Panel - Dashboard Content */}
      <div className="center-panel flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4">
              <h1 className="text-2xl font-semibold text-white">Dashboard Test Layout</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4">Center Panel Content</h2>
                  <p className="text-gray-300 mb-4">
                    This is the main content area of the dashboard. It should have infinite scroll functionality
                    and contain all the main dashboard information.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="bg-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-white mb-2">Card {item}</h3>
                        <p className="text-gray-300">
                          This is a sample card to demonstrate the layout and scrolling behavior.
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-2">Infinite Scroll Test</h3>
                    <div className="space-y-4">
                      {Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-4">
                          <p className="text-gray-300">
                            This is line {index + 1} to test the infinite scroll functionality of the center panel.
                            The panel should scroll independently while the left menu and right chat panel remain fixed.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Widget */}
      <div className={`chat-panel absolute md:relative inset-y-0 right-0 z-40 w-full md:w-96 bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 ease-in-out ${chatPanelOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Asistente IA</h2>
                <p className="text-sm text-gray-400">Conectado a meta-agentes</p>
              </div>
              <button
                onClick={() => setChatPanelOpen(false)}
                className="md:hidden text-gray-300 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            <div className="bg-gray-800 rounded-lg p-4 h-full">
              <h3 className="text-lg font-medium text-white mb-2">Chat Panel</h3>
              <p className="text-gray-300">
                This is the chat panel connected to the meta agent service. It should remain fixed
                and not scroll with the center content.
              </p>
              <div className="mt-4 space-y-3">
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-300">Hello! I'm your AI assistant connected to meta-agents.</p>
                </div>
                <div className="bg-primary rounded-lg p-3 text-white">
                  <p>Hi there! How can I help you today?</p>
                </div>
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Type your message..."
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none"
                  rows={2}
                />
                <button className="mt-2 bg-primary text-white rounded-lg px-4 py-2 float-right">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(TestLayoutPage);