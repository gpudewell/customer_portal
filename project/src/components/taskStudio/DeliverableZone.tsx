import React, { useState, useRef } from 'react';
import { Upload, File, X, Check, Image, FileText, Mic, Info } from 'lucide-react';
import Button from '../common/Button';
import { DeliverableAsset, Task } from '../../types';
import DomainRegistrarForm from './DomainRegistrarForm';
import EmailMigrationForm from './EmailMigrationForm';

interface DeliverableZoneProps {
  task: Task;
  assets: DeliverableAsset[];
  onUpload: (files: File[]) => void;
  onComplete: () => void;
}

const DeliverableZone: React.FC<DeliverableZoneProps> = ({ task, assets, onUpload, onComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      onUpload(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(Array.from(e.target.files));
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Special handling for domain registrar task
  if (task.id === 'domain_creds') {
    return (
      <div className="flex flex-col h-full p-4">
        <DomainRegistrarForm task={task} onComplete={onComplete} />
      </div>
    );
  }

  // Special handling for email migration task
  if (task.id === 'email_migration') {
    return (
      <div className="flex flex-col h-full p-4">
        <EmailMigrationForm task={task} onComplete={onComplete} />
      </div>
    );
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6 text-blue-500" />;
      case 'document':
        return <FileText className="w-6 h-6 text-green-500" />;
      case 'voice':
        return <Mic className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };
  
  return (
    <div className="flex flex-col h-full p-4">
      <div 
        className={`flex-grow border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 mb-4 transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {assets.length === 0 ? (
          <>
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="font-medium text-lg text-gray-700 mb-2">Upload Files</h3>
            <p className="text-gray-500 text-center mb-4">Drag and drop your files here, or click to browse</p>
            <Button variant="primary" onClick={handleButtonClick}>
              Browse Files
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileChange} 
            />
          </>
        ) : (
          <div className="w-full">
            <h3 className="font-medium text-lg text-gray-700 mb-4">Uploaded Files</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto p-2">
              {assets.map(asset => (
                <div 
                  key={asset.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg bg-white"
                >
                  <div className="mr-3">
                    {getFileIcon(asset.type)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-gray-900 truncate">{asset.name}</p>
                    <p className="text-xs text-gray-500">
                      Uploaded {new Date(asset.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-2 flex items-center">
                    {asset.status === 'approved' && (
                      <span className="text-green-500 bg-green-50 p-1 rounded">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={handleButtonClick}>
                Upload More Files
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                onChange={handleFileChange} 
              />
            </div>
          </div>
        )}
      </div>
      
      {task.phaseId === 'content' && task.title.includes('Copy') && (
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-medium text-gray-700 mb-2">Text Editor</h3>
          <textarea 
            className="w-full h-32 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
            placeholder="Type your content here..."
          />
        </div>
      )}
    </div>
  );
};

export default DeliverableZone;