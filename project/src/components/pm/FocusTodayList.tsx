import React from 'react';
import { Task } from '../../types';
import { AlertCircle, Clock, AlertTriangle } from 'lucide-react';
import dayjs from 'dayjs';

interface FocusTodayListProps {
  tasks: Task[];
  onOpen: (taskId: string) => void;
}

const FocusTodayList: React.FC<FocusTodayListProps> = ({ tasks, onOpen }) => {
  const getBadgeStyles = (task: Task) => {
    const dueDate = dayjs(task.dueDate);
    const today = dayjs();

    if (dueDate.isBefore(today, 'day')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (dueDate.isSame(today, 'day')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getIcon = (task: Task) => {
    const dueDate = dayjs(task.dueDate);
    const today = dayjs();

    if (dueDate.isBefore(today, 'day')) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    if (dueDate.isSame(today, 'day')) {
      return <Clock className="w-4 h-4 text-yellow-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Focus Today</h2>
      <div className="space-y-3 max-h-[28rem] overflow-auto">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onOpen(task.id)}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                {getIcon(task)}
                <span className="font-medium">{task.title}</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${getBadgeStyles(task)}`}>
                {dayjs(task.dueDate).isBefore(dayjs(), 'day')
                  ? `${dayjs().diff(task.dueDate, 'day')} days overdue`
                  : dayjs(task.dueDate).isSame(dayjs(), 'day')
                  ? 'Due Today'
                  : 'Blocked'}
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-6">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusTodayList;