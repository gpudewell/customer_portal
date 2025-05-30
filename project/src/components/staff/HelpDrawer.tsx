import React from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const HelpDrawer: React.FC<HelpDrawerProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="fixed inset-y-0 right-0 max-w-md w-full">
          <div className="h-full bg-white shadow-xl flex flex-col">
            <div className="px-4 py-6 bg-blue-600 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Guidelines</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 prose">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDrawer;