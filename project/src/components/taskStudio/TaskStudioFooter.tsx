import React from 'react';
import { Send, HelpCircle, Undo } from 'lucide-react';
import Button from '../common/Button';
import { Task } from '../../types';
import confetti from 'canvas-confetti';

interface TaskStudioFooterProps {
  task: Task;
  onSave: () => void;
  onSubmit: () => void;
  onAskQuestion: () => void;
  onUncomplete?: () => void;
}

const TaskStudioFooter: React.FC<TaskStudioFooterProps> = ({
  task,
  onSave,
  onSubmit,
  onAskQuestion,
  onUncomplete
}) => {
  const handleSubmit = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onSubmit();
  };

  const isCompleted = task.status === 'completed' || task.status === 'approved';
  const isDomainRegistrarTask = task.id === 'domain_creds';
  const isEmailMigrationTask = task.id === 'email_migration';

  return (
    <div className="border-t border-gray-200 bg-white py-4 px-6 flex justify-between items-center">
      <div className="text-sm text-gray-500">
        <span className="font-medium">Current Status:</span> {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </div>
      
      <div className="flex space-x-3">
        {!isCompleted && !isDomainRegistrarTask && !isEmailMigrationTask && (
          <Button 
            variant="outline" 
            size="md" 
            onClick={onSave}
          >
            Save
          </Button>
        )}
        
        {isCompleted ? (
          <Button
            variant="outline"
            size="md"
            leftIcon={<Undo className="w-4 h-4" />}
            onClick={onUncomplete}
          >
            Resume Editing
          </Button>
        ) : !isDomainRegistrarTask && !isEmailMigrationTask && (
          <Button
            variant="primary"
            size="md"
            leftIcon={<Send className="w-4 h-4" />}
            onClick={handleSubmit}
          >
            Task completed
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="md"
          leftIcon={<HelpCircle className="w-4 h-4" />}
          onClick={onAskQuestion}
        >
          Ask a Question
        </Button>
      </div>
    </div>
  );
};

export default TaskStudioFooter