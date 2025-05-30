import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { usePhase } from '../../context/PhaseContext';
import Button from '../../components/common/Button';
import QuickAdjustDrawer from '../../components/admin/QuickAdjustDrawer';
import InboxTable from './InboxTable';
import RiskRadar from './RiskRadar';
import DesignCalendar from './DesignCalendar';
import FocusTodayList from './FocusTodayList';
import WizardModal from './ProjectWizard/WizardModal';
import Portal from '../../components/common/Portal';
import { phases } from '../../data/mockData';
import { Role } from '../../types';

interface PMDashboardProps {
  onQuickAdjust: () => void;
  isAdmin: boolean;
  userRole?: Role;
}

const PMDashboard: React.FC<PMDashboardProps> = ({
  onQuickAdjust,
  isAdmin,
  userRole
}) => {
  console.log('[PMDashboard] render', { userRole, isAdmin });

  const [showWizard, setShowWizard] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isQuickAdjustOpen, setIsQuickAdjustOpen] = useState(false);

  const handleOpenFeedback = (pageId: string, commentId: string) => {
    console.log('Opening feedback:', { pageId, commentId });
  };

  const handleOpenItem = (type: 'task' | 'page', id: string) => {
    console.log('Opening item:', { type, id });
  };

  const handleOpenProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Manager Dashboard</h1>
          <p className="text-gray-600">Manage client projects and timelines</p>
        </div>
        
        {isAdmin && (
          <div className="mt-4 lg:mt-0 flex space-x-3">
            <Button 
              variant="outline"
              leftIcon={<Settings className="w-4 h-4" />}
              onClick={() => setIsQuickAdjustOpen(true)}
            >
              Quick Adjust
            </Button>
            {['super_admin', 'de_admin', 'de_pm'].includes(userRole ?? '') && (
              <Button 
                variant="primary"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => { console.log('NEW-PROJECT PM'); setShowWizard(true); }}
              >
                New Project
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div id="pm-inbox">
          <InboxTable onOpenFeedback={handleOpenFeedback} />
        </div>
        <RiskRadar
          tasks={[]}
          pages={[]}
          onOpenItem={handleOpenItem}
        />
      </div>

      <DesignCalendar onOpenProject={handleOpenProject} />

      <FocusTodayList
        tasks={[]}
        onOpen={(taskId) => handleOpenItem('task', taskId)}
      />
      
      {isQuickAdjustOpen && (
        <QuickAdjustDrawer 
          isOpen={isQuickAdjustOpen}
          onClose={() => setIsQuickAdjustOpen(false)}
          phases={phases}
          activeTasks={[]}
          onUpdateTaskDueDate={(taskId, newDueDate) => {
            console.log('Updating task due date:', { taskId, newDueDate });
          }}
          onMovePhaseDates={(phaseId, daysToAdd) => {
            console.log('Moving phase dates:', { phaseId, daysToAdd });
          }}
        />
      )}

      {showWizard && (
        <Portal>
          <WizardModal onClose={() => setShowWizard(false)} />
        </Portal>
      )}
    </div>
  );
};

export default PMDashboard;