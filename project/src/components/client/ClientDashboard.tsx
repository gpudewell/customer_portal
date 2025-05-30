import React from 'react';
import TaskCard from '../dashboard/TaskCard';
import UpcomingTasks from '../dashboard/UpcomingTasks';
import ProjectTimeline from '../dashboard/ProjectTimeline';
import CompletedTasks from '../dashboard/CompletedTasks';
import DesignPhaseDashboard from './DesignPhaseDashboard';
import Card from '../common/Card';
import { Task, Phase, PhaseSlug } from '../../types';
import { CheckCircle } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

interface ClientDashboardProps {
  phase: PhaseSlug;
  activeTasks: Task[];
  pendingTasks: Task[];
  phases: Phase[];
  onOpenTask: (taskId: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({
  phase,
  activeTasks,
  pendingTasks,
  phases,
  onOpenTask,
}) => {
  const { getCompletedTasks } = useTasks();
  const completedTasks = getCompletedTasks(phase);

  // Find the design review task if we're in the design phase
  const designReviewTask = phase === 'design' 
    ? activeTasks.find(t => t.type === 'design_review')
    : null;

  if (phase === 'design' && designReviewTask?.payload?.pages) {
    return (
      <>
        <ProjectTimeline phases={phases} />
        <DesignPhaseDashboard
          taskId={designReviewTask.id}
          pages={designReviewTask.payload.pages}
          onApprovePage={(pageId) => {
            // Handle page approval
            console.log('Approve page:', pageId);
          }}
          onRequestChanges={(pageId, comment) => {
            // Handle change request
            console.log('Request changes:', pageId, comment);
          }}
        />
      </>
    );
  }

  return (
    <>
      <ProjectTimeline phases={phases} />
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Active Tasks</h2>
          <p className="text-sm text-gray-600">Showing top {activeTasks.length} tasks</p>
        </div>
        
        {activeTasks.length === 0 ? (
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
              <p className="text-gray-700 font-medium mb-2">All caught up!</p>
              <p className="text-sm text-gray-500">
                You've completed all your active tasks. Great job!
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onOpen={onOpenTask} 
              />
            ))}
          </div>
        )}
      </div>
      
      {pendingTasks.length > 0 && (
        <UpcomingTasks tasks={pendingTasks} onOpen={onOpenTask} />
      )}

      <CompletedTasks tasks={completedTasks} onOpen={onOpenTask} />
    </>
  );
};

export default ClientDashboard;