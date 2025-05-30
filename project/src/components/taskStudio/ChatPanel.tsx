import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ChatMessage, Task } from '../../types';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { formatChatTime } from '../../utils/dateUtils';

interface ChatPanelProps {
  task: Task;
  messages: ChatMessage[];
  onSendMessage: (message: string, attachments?: string[]) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ task, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = [];
  let currentDate = '';
  
  messages.forEach(message => {
    const messageDate = new Date(message.timestamp).toLocaleDateString();
    
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      groupedMessages.push({
        date: messageDate,
        messages: [message]
      });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    }
  });
  
  return (
    <div className="flex flex-col h-full border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">Task Chat</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {groupedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          <>
            {groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <div className="flex justify-center mb-4">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    {group.date === new Date().toLocaleDateString() 
                      ? 'Today' 
                      : group.date === new Date(Date.now() - 86400000).toLocaleDateString()
                        ? 'Yesterday'
                        : group.date}
                  </span>
                </div>
                
                {group.messages.map((message, msgIndex) => {
                  const isConsecutive = msgIndex > 0 && 
                    group.messages[msgIndex - 1].userId === message.userId;
                  
                  return (
                    <div 
                      key={message.id} 
                      className={`flex mb-4 ${isConsecutive ? 'mt-1' : 'mt-4'}`}
                    >
                      {!isConsecutive && (
                        <div className="mr-3 flex-shrink-0">
                          <Avatar 
                            src={message.userAvatar} 
                            name={message.userName} 
                            size="sm" 
                          />
                        </div>
                      )}
                      <div className={`flex-grow ${isConsecutive ? 'pl-10' : ''}`}>
                        {!isConsecutive && (
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-gray-900 mr-2">
                              {message.userName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatChatTime(message.timestamp)}
                            </span>
                          </div>
                        )}
                        <div className="bg-white border border-gray-200 rounded-lg p-3 inline-block max-w-[85%]">
                          <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              {message.attachments.map((attachment, i) => (
                                <div key={i} className="text-blue-500 text-sm hover:underline">
                                  <a href={attachment} target="_blank" rel="noopener noreferrer">
                                    Attachment {i+1}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {isConsecutive && (
                          <div className="mt-1 text-xs text-gray-500 pl-3">
                            {formatChatTime(message.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-end">
          <div className="flex-grow relative">
            <textarea
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Type a message..."
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              type="button" 
              className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700"
              title="Attach a file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <Button 
            type="submit" 
            variant="primary"
            className="ml-2 h-10 flex-shrink-0"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;