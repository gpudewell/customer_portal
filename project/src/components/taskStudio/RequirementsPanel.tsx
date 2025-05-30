import React from 'react';
import { Calendar, Clock, Info } from 'lucide-react';
import { Task } from '../../types';
import { formatDueDate, getDaysRemaining } from '../../utils/dateUtils';

interface RequirementsPanelProps {
  task: Task;
}

const RequirementsPanel: React.FC<RequirementsPanelProps> = ({ task }) => {
  const daysRemaining = getDaysRemaining(task.dueDate);

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Requirements</h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Due {formatDueDate(task.dueDate)}</span>
        </div>
        
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            {daysRemaining <= 0 
              ? 'Due Today!' 
              : daysRemaining === 1 
                ? '1 Day Remaining' 
                : `${daysRemaining} Days Remaining`}
          </span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md border border-gray-200 mb-4">
        <h3 className="font-medium mb-2">Task Description</h3>
        <p className="text-gray-700 text-sm">{task.description}</p>
      </div>
      
      {task.tipsRef && (
        <div className="mt-auto">
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-700 mb-1">Helpful Tips</h3>
                {task.tipsRef === 'ai_bio_tips' && (
                  <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                    <li>Include education, specialties, and years of experience</li>
                    <li>Add a personal touch about why they love veterinary medicine</li>
                    <li>Keep each bio between 150-200 words</li>
                    <li>Use a consistent format for all team members</li>
                  </ul>
                )}
                {task.tipsRef === 'ai_copy_tips' && (
                  <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                    <li>Focus on benefits to pet owners, not just features</li>
                    <li>Highlight what makes your services unique</li>
                    <li>Use clear headings and bullet points for easy scanning</li>
                    <li>Include pricing information where relevant</li>
                  </ul>
                )}
                {task.tipsRef === 'ai_photo_tips' && (
                  <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                    <li>Use natural lighting when possible</li>
                    <li>Choose neutral backgrounds for consistency</li>
                    <li>Take photos in landscape orientation for website use</li>
                    <li>Ensure high resolution (at least 1500px wide)</li>
                  </ul>
                )}
                {task.tipsRef === 'brand_guidelines' && (
                  <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                    <li>Vector formats (SVG, AI, EPS) are preferred for logos</li>
                    <li>Include color codes (HEX, RGB) if available</li>
                    <li>Upload any brand fonts or typography guidelines</li>
                    <li>Share existing brand materials for reference</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementsPanel;