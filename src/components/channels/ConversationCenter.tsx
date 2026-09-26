// src/components/channels/ConversationCenter.tsx
// Conversation Center for Agent Management

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Facebook,
  Users,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface Conversation {
  id: string;
  channel: string;
  customerName: string;
  customerId: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'pending' | 'resolved' | 'transferred';
  unreadCount: number;
  assignedAgent?: string;
}

interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: 'customer' | 'agent' | 'system';
  timestamp: string;
  senderName?: string;
}

const ConversationCenter: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      channel: 'webchat',
      customerName: 'John Doe',
      customerId: 'cust-123',
      lastMessage: 'Hello, I need help with my order',
      timestamp: '2025-11-26T10:30:00Z',
      status: 'active',
      unreadCount: 2,
      assignedAgent: 'Agent Smith'
    },
    {
      id: 'conv-2',
      channel: 'whatsapp',
      customerName: 'Maria Garcia',
      customerId: 'cust-456',
      lastMessage: 'Thanks for your help!',
      timestamp: '2025-11-26T09:15:00Z',
      status: 'resolved',
      unreadCount: 0,
      assignedAgent: 'Agent Johnson'
    },
    {
      id: 'conv-3',
      channel: 'email',
      customerName: 'Robert Wilson',
      customerId: 'cust-789',
      lastMessage: 'Waiting for your response',
      timestamp: '2025-11-26T08:45:00Z',
      status: 'pending',
      unreadCount: 1
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      text: 'Hello, I need help with my order #12345',
      sender: 'customer',
      timestamp: '2025-11-26T10:30:00Z',
      senderName: 'John Doe'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      text: 'Hi John, I\'d be happy to help you with your order. Can you please provide more details?',
      sender: 'agent',
      timestamp: '2025-11-26T10:31:00Z',
      senderName: 'Agent Smith'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      text: 'I ordered a blue shirt last week and it hasn\'t arrived yet',
      sender: 'customer',
      timestamp: '2025-11-26T10:32:00Z',
      senderName: 'John Doe'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      text: newMessage,
      sender: 'agent',
      timestamp: new Date().toISOString(),
      senderName: 'You'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage, timestamp: new Date().toISOString() }
        : conv
    ));
  };

  const handleTransferToHuman = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, status: 'transferred', assignedAgent: 'Human Agent' }
        : conv
    ));
    
    const systemMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      text: 'Conversation transferred to human agent',
      sender: 'system',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleResolveConversation = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, status: 'resolved' }
        : conv
    ));
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'webchat': return <MessageSquare className="h-4 w-4" />;
      case 'whatsapp': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'resolved': return 'bg-gray-500';
      case 'transferred': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-gray-800 rounded-lg overflow-hidden">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Conversations</h2>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">{conversations.length}</span>
            </div>
          </div>
          
          <div className="relative">
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white pl-8"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-750 ${
                selectedConversation?.id === conversation.id ? 'bg-gray-750' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="bg-gray-600 rounded-full p-2">
                    {getChannelIcon(conversation.channel)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white truncate">
                      {conversation.customerName}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                  
                  <div className="flex items-center mt-2">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(conversation.status)}`}></span>
                    <span className="text-xs text-gray-500 capitalize">{conversation.status}</span>
                    
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                        {conversation.unreadCount}
                      </span>
                    )}
                    
                    {conversation.assignedAgent && (
                      <span className="ml-2 text-xs text-gray-500">
                        {conversation.assignedAgent}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden mr-3 text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center">
                  <div className="bg-gray-600 rounded-full p-2 mr-3">
                    {getChannelIcon(selectedConversation.channel)}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{selectedConversation.customerName}</h3>
                    <p className="text-xs text-gray-400">
                      {selectedConversation.channel} • {selectedConversation.status}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTransferToHuman(selectedConversation.id)}
                >
                  Transfer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleResolveConversation(selectedConversation.id)}
                >
                  Resolve
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages
                .filter(msg => msg.conversationId === selectedConversation.id)
                .map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${message.sender === 'agent' || message.sender === 'system' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'customer' 
                        ? 'bg-gray-700 text-white' 
                        : message.sender === 'agent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                    }`}>
                      {message.sender !== 'system' && (
                        <div className="text-xs font-medium mb-1">
                          {message.senderName || (message.sender === 'customer' ? selectedConversation.customerName : 'You')}
                        </div>
                      )}
                      <div className="text-sm">{message.text}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-end space-x-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No conversation selected</h3>
              <p className="text-gray-400">Select a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationCenter;