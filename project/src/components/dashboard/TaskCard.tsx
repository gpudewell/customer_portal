import React from 'react';
import { Calendar, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Task } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatDueDate, getDaysRemaining } from '../../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onOpen: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onOpen }) => {
  const daysRemaining = getDaysRemaining(task.dueDate);
  
  const getBadgeVariant = () => {
    if (task.status === 'completed') return 'green';
    if (task.status === 'approved') return 'indigo';
    if (task.status === 'overdue') return 'red';
    if (daysRemaining <= 3) return 'yellow';
    return 'blue';
  };

  const getStatusText = () => {
    if (task.status === 'completed') return 'Completed';
    if (task.status === 'approved') return 'Approved';
    if (task.status === 'overdue') return 'Overdue';
    if (daysRemaining <= 0) return 'Due Today';
    if (daysRemaining === 1) return '1 Day Left';
    return `${daysRemaining} Days Left`;
  };

  return (
    <Card className="h-full transition-transform duration-200 hover:translate-y-[-4px]" hover>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <Badge variant={getBadgeVariant()}>
            <span className="flex items-center">
              {(task.status === 'completed' || task.status === 'approved') && (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {getStatusText()}
            </span>
          </Badge>
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDueDate(task.dueDate)}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {task.description.length > 120 
            ? `${task.description.substring(0, 120)}...` 
            : task.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Button 
            variant={task.status === 'completed' ? 'success' : 'primary'}
            fullWidth 
            rightIcon={task.status === 'completed' ? <CheckCircle size={16} /> : <ArrowRight size={16} />}
            onClick={() => onOpen(task.id)}
          >
            {task.status === 'completed' ? 'View Details' : 'Open Task'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;