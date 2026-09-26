// src/store/useDashboardStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'text' | 'command' | 'link' | 'action';
    data?: Record<string, any>;
  };
  quickReplies?: string[];
  actions?: Array<{
    label: string;
    action: string;
    data?: Record<string, any>;
  }>;
}

export interface DynamicView {
  type: 'service_detail' | 'product_detail' | 'service_activation' | 'catalog_list' | 'custom';
  data: Record<string, any>;
}

export interface PendingAction {
  type: 'activate_service' | 'navigate' | 'open_panel' | 'show_product' | 'render_view';
  payload: Record<string, any>;
  timestamp: number;
}

interface DashboardState {
  // Chat state
  conversationId: string | null;
  messages: Message[];
  isTyping: boolean;
  
  // UI state
  currentView: DynamicView | null;
  sidebarCollapsed: boolean;
  currentRoute: string;
  
  // Actions
  pendingAction: PendingAction | null;
  
  // WebSocket
  isConnected: boolean;
  
  // Actions
  setConversationId: (id: string) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
  setIsTyping: (typing: boolean) => void;
  
  setCurrentView: (view: DynamicView | null) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentRoute: (route: string) => void;
  
  setPendingAction: (action: PendingAction | null) => void;
  executePendingAction: () => void;
  
  setIsConnected: (connected: boolean) => void;
  
  // Reset
  reset: () => void;
}

const initialState = {
  conversationId: null,
  messages: [],
  isTyping: false,
  currentView: null,
  sidebarCollapsed: false,
  currentRoute: '/dashboard',
  pendingAction: null,
  isConnected: false,
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setConversationId: (id) => set({ conversationId: id }),
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
      })),
      
      setMessages: (messages) => set({ messages }),
      
      clearMessages: () => set({ messages: [] }),
      
      setIsTyping: (typing) => set({ isTyping: typing }),
      
      setCurrentView: (view) => set({ currentView: view }),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      setCurrentRoute: (route) => set({ currentRoute: route }),
      
      setPendingAction: (action) => set({ pendingAction: action }),
      
      executePendingAction: () => {
        const { pendingAction } = get();
        if (!pendingAction) return;
        
        console.log('[DashboardStore] Executing pending action:', pendingAction);
        
        // Clear pending action after execution
        set({ pendingAction: null });
      },
      
      setIsConnected: (connected) => set({ isConnected: connected }),
      
      reset: () => set(initialState)
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversationId: state.conversationId,
        messages: state.messages,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
