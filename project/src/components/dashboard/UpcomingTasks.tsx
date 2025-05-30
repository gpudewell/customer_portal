import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Task } from '../../types';
import Card from '../common/Card';
import { formatDueDate } from '../../utils/dateUtils';

interface UpcomingTasksProps {
  tasks: Task[];
  onOpen: (taskId: string) => void;
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks, onOpen }) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id}
            className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onOpen(task.id)}
          >
            <div>
              <p className="font-medium text-gray-900">{task.title}</p>
              <p className="text-sm text-gray-500">Due {formatDueDate(task.dueDate)}</p>
            </div>
            <ChevronRight className="text-gray-400 h-5 w-5" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingTasks;