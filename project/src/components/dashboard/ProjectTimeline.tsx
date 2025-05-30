import React from 'react';
import { Phase } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import { ChevronRight, ChevronLeft, Paintbrush } from 'lucide-react';
import { usePhase } from '../../context/PhaseContext';

interface ProjectTimelineProps {
  phases: Phase[];
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ phases }) => {
  const { current, setCurrent } = usePhase();
  
  // Sort phases by order
  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);
  const activePhase = phases.find(p => p.slug === current);
  const activeIndex = sortedPhases.findIndex(p => p.slug === current);

  const handlePreviousPhase = () => {
    if (activeIndex > 0) {
      setCurrent(sortedPhases[activeIndex - 1].slug);
    }
  };

  const handleNextPhase = () => {
    if (activeIndex < sortedPhases.length - 1) {
      setCurrent(sortedPhases[activeIndex + 1].slug);
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Project Timeline</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPhase}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPhase}
            disabled={activeIndex === sortedPhases.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative flex items-center justify-between mb-6">
        <div className="absolute left-0 right-0 h-1 bg-gray-200 z-0"></div>
        
        {sortedPhases.map((phase, index) => {
          const isComplete = phase.isComplete;
          const isCurrent = phase.slug === current;
          
          let dotClasses = "w-6 h-6 rounded-full z-10 flex items-center justify-center cursor-pointer transition-all duration-200";
          let lineClasses = "absolute top-1/2 h-1 transform -translate-y-1/2 z-0";
          
          if (isComplete) {
            dotClasses += " bg-green-500 text-white";
            lineClasses += " bg-green-500";
          } else if (isCurrent) {
            dotClasses += " bg-blue-500 text-white ring-4 ring-blue-100";
            lineClasses += " bg-gray-200";
          } else {
            dotClasses += " bg-gray-200 text-gray-500 hover:bg-gray-300";
            lineClasses += " bg-gray-200";
          }
          
          // Calculate line width
          const width = index === sortedPhases.length - 1 ? 0 : `${100 / (sortedPhases.length - 1)}%`;
          
          return (
            <div 
              key={phase.id} 
              className="flex flex-col items-center relative z-10" 
              style={{ flex: 1 }}
              onClick={() => setCurrent(phase.slug)}
            >
              <div className={dotClasses}>
                {isComplete ? "✓" : (index + 1)}
              </div>
              <p className={`mt-2 text-sm font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {phase.title}
              </p>
              
              {index < sortedPhases.length - 1 && (
                <div 
                  className={lineClasses} 
                  style={{ 
                    left: '50%', 
                    width: width
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {current === 'design' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start space-x-3">
            <Paintbrush className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900">Design Phase</h4>
              <p className="text-sm text-blue-700 mt-1">
                Our designers are working on your website's visual identity. You'll receive design previews for review soon.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs font-medium text-blue-800">First Design Drop</p>
                  <p className="text-sm text-blue-600">Jun 15, 2025</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs font-medium text-blue-800">Revisions Due</p>
                  <p className="text-sm text-blue-600">Jun 22, 2025</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs font-medium text-blue-800">Final Approval</p>
                  <p className="text-sm text-blue-600">Jun 29, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProjectTimeline;