import React, { useEffect, useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useChat } from '../context/ChatContext';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/common/Breadcrumb';
import RequirementsPanel from '../components/taskStudio/RequirementsPanel';
import DeliverableZone from '../components/taskStudio/DeliverableZone';
import ChatPanel from '../components/taskStudio/ChatPanel';
import TaskStudioFooter from '../components/taskStudio/TaskStudioFooter';
import StaffList from '../components/staff/StaffList';
import ServicePageManager from '../components/services/ServicePageManager';
import SiteMapManager from '../components/sitemap/SiteMapManager';
import HelpDrawer from '../components/staff/HelpDrawer';
import { useStaffTask } from '../hooks/useStaffTask';
import { deliverableAssets } from '../data/mockData';
import { DeliverableAsset } from '../types';
import Button from '../components/common/Button';

interface TaskStudioProps {
  onClose: () => void;
}

const TaskStudio: React.FC<TaskStudioProps> = ({ onClose }) => {
  const { activeTask, updateTaskStatus } = useTasks();
  const { getMessagesForTask, sendMessage } = useChat();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [assets, setAssets] = useState<DeliverableAsset[]>(deliverableAssets);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const isStaffBiosTask = activeTask?.id === 'staff_bios';
  const isServiceCopyTask = activeTask?.id === 'service_copy';
  const isSiteMapTask = activeTask?.id === 'sitemap_confirmation';
  const { staff, setStaff } = useStaffTask(activeTask?.id || '');
  
  useEffect(() => {
    if (activeTask) {
      document.title = `${activeTask.title} - VetWeb Portal`;
    }
    
    return () => {
      document.title = 'VetWeb Portal';
    };
  }, [activeTask]);
  
  if (!activeTask) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No task selected</p>
      </div>
    );
  }
  
  const taskMessages = getMessagesForTask(activeTask.id);
  
  const handleSave = () => {
    addNotification({
      type: 'success',
      message: 'Draft saved successfully'
    });
  };
  
  const handleSubmit = () => {
    updateTaskStatus(activeTask.id, 'completed');
    addNotification({
      type: 'success',
      message: `Task "${activeTask.title}" completed successfully`
    });
    
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleUncomplete = () => {
    updateTaskStatus(activeTask.id, 'active');
    addNotification({
      type: 'info',
      message: `Task "${activeTask.title}" reopened for editing`
    });
  };
  
  const handleAskQuestion = () => {
    setIsHelpOpen(true);
  };
  
  const handleSendMessage = (message: string, attachments?: string[]) => {
    sendMessage(activeTask.id, message, attachments);
  };
  
  const handleUploadFiles = (files: File[]) => {
    const newAssets: DeliverableAsset[] = files.map(file => ({
      id: Date.now().toString() + files.indexOf(file),
      taskId: activeTask.id,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      url: '#',
      name: file.name,
      uploadedBy: user?.id || '',
      uploadedAt: new Date().toISOString(),
      status: 'draft'
    }));
    
    setAssets([...assets, ...newAssets]);
    
    addNotification({
      type: 'success',
      message: `${files.length} file${files.length === 1 ? '' : 's'} uploaded successfully`
    });
  };
  
  const breadcrumbItems = [
    { label: 'Dashboard', href: '#' },
    { label: activeTask.phaseId?.charAt(0).toUpperCase() + activeTask.phaseId?.slice(1) || 'Unknown Phase', href: '#' },
    { label: activeTask.title }
  ];
  
  const helpContent = isStaffBiosTask ? `
### Headshot Guidelines
* 600×600 px or larger, square crop
* Neutral background, good lighting
* Only one person in the frame

### Bio Guidelines
* 150–200 words
* Include credential letters once ("DVM")
* Write in third person ("Dr. Smith...")
` : '';
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {isStaffBiosTask && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Info className="w-4 h-4" />}
              onClick={() => setIsHelpOpen(true)}
            >
              Guidelines
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-grow flex overflow-hidden">
        <div className="w-1/4 p-6 border-r border-gray-200 overflow-y-auto">
          <RequirementsPanel task={activeTask} />
        </div>
        
        <div className="w-1/2 overflow-y-auto flex flex-col">
          {isStaffBiosTask ? (
            <div className="p-6">
              <StaffList
                taskId={activeTask.id}
                staff={staff}
                onChange={setStaff}
              />
            </div>
          ) : isServiceCopyTask ? (
            <div className="p-6">
              <ServicePageManager
                taskId={activeTask.id}
                onComplete={handleSubmit}
              />
            </div>
          ) : isSiteMapTask ? (
            <div className="p-6">
              <SiteMapManager
                taskId={activeTask.id}
                proposedSiteMap={activeTask.payload?.proposedSiteMap || {}}
                onComplete={handleSubmit}
              />
            </div>
          ) : (
            <DeliverableZone 
              task={activeTask} 
              assets={assets.filter(asset => asset.taskId === activeTask.id)}
              onUpload={handleUploadFiles}
              onComplete={handleSubmit}
            />
          )}
        </div>
        
        <div className="w-1/4 flex flex-col overflow-hidden">
          <ChatPanel 
            task={activeTask} 
            messages={taskMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
      
      <TaskStudioFooter 
        task={activeTask}
        onSave={handleSave}
        onSubmit={handleSubmit}
        onAskQuestion={handleAskQuestion}
        onUncomplete={handleUncomplete}
      />

      {isStaffBiosTask && (
        <HelpDrawer
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
          content={helpContent}
        />
      )}
    </div>
  );
};

export default TaskStudio;