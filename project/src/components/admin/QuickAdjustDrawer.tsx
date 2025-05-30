import React, { useState } from 'react';
import { X, Calendar, Edit, Clock } from 'lucide-react';
import Button from '../common/Button';
import { Task, Phase } from '../../types';

interface QuickAdjustDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  phases: Phase[];
  activeTasks: Task[];
  onUpdateTaskDueDate: (taskId: string, newDueDate: string) => void;
  onMovePhaseDates: (phaseId: string, daysToAdd: number) => void;
}

const QuickAdjustDrawer: React.FC<QuickAdjustDrawerProps> = ({
  isOpen,
  onClose,
  phases,
  activeTasks,
  onUpdateTaskDueDate,
  onMovePhaseDates
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newDueDate, setNewDueDate] = useState<string>('');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [daysToAdd, setDaysToAdd] = useState<number>(0);
  
  if (!isOpen) return null;
  
  const handleUpdateTaskDueDate = () => {
    if (selectedTaskId && newDueDate) {
      onUpdateTaskDueDate(selectedTaskId, newDueDate);
      setSelectedTaskId(null);
      setNewDueDate('');
    }
  };
  
  const handleMovePhaseDates = () => {
    if (selectedPhaseId) {
      onMovePhaseDates(selectedPhaseId, daysToAdd);
      setSelectedPhaseId(null);
      setDaysToAdd(0);
    }
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
          <div className="h-full w-full bg-white shadow-xl flex flex-col">
            <div className="px-4 py-6 bg-blue-600 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Quick Adjust Timeline</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                {/* Task Due Date Adjustment */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    Adjust Task Due Date
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Task
                      </label>
                      <select
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={selectedTaskId || ''}
                        onChange={(e) => setSelectedTaskId(e.target.value || null)}
                      >
                        <option value="">-- Select a task --</option>
                        {activeTasks.map(task => (
                          <option key={task.id} value={task.id}>
                            {task.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Due Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                      />
                    </div>
                    
                    <Button
                      variant="primary"
                      onClick={handleUpdateTaskDueDate}
                      disabled={!selectedTaskId || !newDueDate}
                      fullWidth
                    >
                      Update Due Date
                    </Button>
                  </div>
                </div>
                
                {/* Shift Phase Dates */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Shift Phase Timeline
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Phase
                      </label>
                      <select
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={selectedPhaseId || ''}
                        onChange={(e) => setSelectedPhaseId(e.target.value || null)}
                      >
                        <option value="">-- Select a phase --</option>
                        {phases.map(phase => (
                          <option key={phase.id} value={phase.id}>
                            {phase.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Days to Add/Subtract
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={daysToAdd}
                        onChange={(e) => setDaysToAdd(parseInt(e.target.value, 10) || 0)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Use positive numbers to add days, negative to subtract
                      </p>
                    </div>
                    
                    <Button
                      variant="primary"
                      onClick={handleMovePhaseDates}
                      disabled={!selectedPhaseId}
                      fullWidth
                    >
                      Shift Timeline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAdjustDrawer;