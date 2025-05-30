import React, { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../common/Button';
import StaffRow from './StaffRow';
import { StaffMember } from '../../types';
import { useTasks } from '../../context/TaskContext';

interface StaffListProps {
  taskId: string;
  onChange: (staff: StaffMember[]) => void;
  staff: StaffMember[];
}

const StaffList: React.FC<StaffListProps> = ({ taskId, onChange, staff }) => {
  const { updateTaskStatus } = useTasks();
  const [isWebsiteUpToDate, setIsWebsiteUpToDate] = useState(false);

  const handleAddMember = () => {
    const newMember: StaffMember = {
      id: uuidv4(),
      name: '',
      title: '',
      biography: '',
      headshotUrl: ''
    };
    onChange([...staff, newMember]);
  };

  const handleUpdateMember = (updatedMember: StaffMember) => {
    onChange(staff.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
  };

  const handleRemoveMember = (id: string) => {
    onChange(staff.filter(member => member.id !== id));
  };

  const handleWebsiteUpToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWebsiteUpToDate(e.target.checked);
    if (e.target.checked) {
      updateTaskStatus(taskId, 'completed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-grow">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isWebsiteUpToDate}
                onChange={handleWebsiteUpToDateChange}
                className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-blue-900 font-medium">
                Use existing team information from our current website
              </span>
            </label>
            <p className="text-sm text-blue-700 mt-2 leading-relaxed">
              Select this option if your current website already has accurate and up-to-date team information that you'd like to reuse. We'll retrieve the content from your existing site.
            </p>
          </div>
        </div>
      </div>

      {!isWebsiteUpToDate && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleAddMember}
            >
              Add Team Member
            </Button>
          </div>

          <div className="space-y-6">
            {staff.map(member => (
              <StaffRow
                key={member.id}
                member={member}
                onChange={handleUpdateMember}
                onRemove={handleRemoveMember}
              />
            ))}

            {staff.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <h3 className="text-gray-500 font-medium mb-2">No team members added yet</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Start by adding your first team member
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={handleAddMember}
                >
                  Add Team Member
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StaffList;