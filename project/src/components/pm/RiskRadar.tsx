import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Task, PageReview } from '../../types';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDistanceToNow } from 'date-fns';

interface RiskItem {
  id: string;
  title: string;
  dueDate: string;
  type: 'task' | 'page';
  status: string;
  projectName: string;
}

interface RiskRadarProps {
  tasks: Task[];
  pages: PageReview[];
  onOpenItem: (type: 'task' | 'page', id: string) => void;
}

const RiskRadar: React.FC<RiskRadarProps> = ({ tasks, pages, onOpenItem }) => {
  const riskItems: RiskItem[] = [
    ...tasks
      .filter(task => task.status !== 'completed' && task.status !== 'approved')
      .map(task => ({
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
        type: 'task' as const,
        status: task.status,
        projectName: 'Project Name' // In real app, get from task.projectId
      })),
    ...pages
      .filter(page => page.status !== 'approved')
      .map(page => ({
        id: page.id,
        title: page.title,
        dueDate: page.feedbackDue,
        type: 'page' as const,
        status: page.status,
        projectName: 'Project Name' // In real app, get from page.projectId
      }))
  ].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  if (riskItems.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-600 font-medium">No items at risk</h3>
          <p className="text-sm text-gray-500">All tasks and pages are on track</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">Risk Radar</h2>
        </div>
        <span className="text-sm text-gray-500">{riskItems.length} items need attention</span>
      </div>

      <div className="space-y-3">
        {riskItems.map(item => (
          <div
            key={item.id}
            className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onOpenItem(item.type, item.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <Badge
                    variant={item.status === 'overdue' ? 'red' : 'yellow'}
                  >
                    {item.status === 'overdue' ? 'Overdue' : 'Due Soon'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{item.projectName}</p>
              </div>
              <div className="text-sm text-gray-500">
                Due {formatDistanceToNow(new Date(item.dueDate), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RiskRadar;