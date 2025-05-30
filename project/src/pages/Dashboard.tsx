import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { usePhase } from '../context/PhaseContext';
import Button from '../components/common/Button';
import QuickAdjustDrawer from '../components/admin/QuickAdjustDrawer';
import PMDashboard from '../components/pm/PMDashboard';
import ClientDashboard from '../components/client/ClientDashboard';
import { phases } from '../data/mockData';

interface DashboardProps {
  onOpenTask: (taskId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenTask }) => {
  const { getActiveTasks, getPendingTasks, setActiveTask } = useTasks();
  const { user } = useAuth();
  const { current } = usePhase();
  const [isQuickAdjustOpen, setIsQuickAdjustOpen] = useState(false);

  if (!user) return null;

  const activeTasks = getActiveTasks(current);
  const pendingTasks = getPendingTasks(current);

  const handleOpenTask = (taskId: string) => {
    setActiveTask(taskId);
    onOpenTask(taskId);
  };

  const handleUpdateTaskDueDate = (taskId: string, newDueDate: string) => {
    console.log(`Updating task ${taskId} due date to ${newDueDate}`);
  };

  const handleMovePhaseDates = (phaseId: string, daysToAdd: number) => {
    console.log(`Moving phase ${phaseId} dates by ${daysToAdd} days`);
  };

  switch (user.role) {
    case 'super_admin':
    case 'de_admin':
    case 'de_pm':
      return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <PMDashboard
            onQuickAdjust={() => setIsQuickAdjustOpen(true)}
            isAdmin={true}
            userRole={user.role}
          />
          
          {isQuickAdjustOpen && (
            <QuickAdjustDrawer
              isOpen={isQuickAdjustOpen}
              onClose={() => setIsQuickAdjustOpen(false)}
              phases={phases}
              activeTasks={[...activeTasks, ...pendingTasks]}
              onUpdateTaskDueDate={handleUpdateTaskDueDate}
              onMovePhaseDates={handleMovePhaseDates}
            />
          )}
        </div>
      );

    case 'client_owner':
    case 'client_collaborator':
    default:
      return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <ClientDashboard
            phase={current}
            activeTasks={activeTasks}
            pendingTasks={pendingTasks}
            phases={phases}
            onOpenTask={handleOpenTask}
          />
        </div>
      );
  }
};

export default Dashboard;