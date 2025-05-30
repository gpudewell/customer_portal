import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessage } from '../types';
import { chatMessages as initialChatMessages } from '../data/mockData';
import { useAuth } from './AuthContext';

interface ChatContextType {
  messages: ChatMessage[];
  getMessagesForTask: (taskId: string) => ChatMessage[];
  sendMessage: (taskId: string, message: string, attachments?: string[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const { user } = useAuth();

  const getMessagesForTask = (taskId: string): ChatMessage[] => {
    return messages
      .filter(message => message.taskId === taskId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const sendMessage = (taskId: string, message: string, attachments?: string[]) => {
    if (!user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      taskId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      message,
      timestamp: new Date().toISOString(),
      attachments
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      getMessagesForTask, 
      sendMessage 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};