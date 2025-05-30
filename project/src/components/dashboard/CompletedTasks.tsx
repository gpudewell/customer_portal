import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { Task } from '../../types';
import Card from '../common/Card';
import { formatDueDate } from '../../utils/dateUtils';

interface CompletedTasksProps {
  tasks: Task[];
  onOpen: (taskId: string) => void;
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks, onOpen }) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Completed Tasks</h2>
        <span className="text-sm text-gray-500">{tasks.length} tasks completed</span>
      </div>
      
      <Card>
        <div className="divide-y divide-gray-100">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onOpen(task.id)}
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">Completed on {formatDueDate(task.dueDate)}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompletedTasks;