import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { nanoid } from 'nanoid';
import { BLUEPRINTS } from '../../../data/blueprints';
import { useProjects } from '../../../context/ProjectContext';
import Button from '../../common/Button';

type Step = 1 | 2 | 3;

interface Props {
  onClose: () => void;
}

const WizardModal: React.FC<Props> = ({ onClose }) => {
  const { addProject } = useProjects();
  const [step, setStep] = useState<Step>(1);
  const [chosenTemplate, setChosenTemplate] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1 as Step);
    }
  };

  const handleNext = () => {
    if (step === 1 && !chosenTemplate) return;
    if (step === 2 && !projectName.trim()) return;

    if (step < 3) {
      setStep(step + 1 as Step);
    } else {
      addProject({
        id: nanoid(),
        name: projectName,
        templateId: chosenTemplate!,
        createdAt: new Date().toISOString(),
        phaseSlug: 'discovery'
      });
      onClose();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
        <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl flex flex-col max-h-[90vh] pointer-events-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center">
            {step > 1 && (
              <button 
                onClick={handleBack}
                className="mr-4 p-1 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <h2 className="font-semibold flex-grow">
              {step === 1 && 'Step 1 · Choose Template'}
              {step === 2 && 'Step 2 · Project Details'}
              {step === 3 && 'Step 3 · Timeline'}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            {step === 1 && (
              <ul className="grid sm:grid-cols-2 gap-4">
                {BLUEPRINTS.map(b => (
                  <li
                    key={b.id}
                    className={`border rounded-lg p-4 cursor-pointer hover:border-blue-200 transition-colors ${
                      chosenTemplate === b.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setChosenTemplate(b.id)}
                  >
                    <p className="font-medium">{b.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {b.defaultSiteMap.length} default pages ·{' '}
                      {Object.keys(b.phaseOffsets).length} phases
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Valley Vet Clinic Website"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Selected Template</h3>
                  <p className="text-sm text-gray-600">
                    {BLUEPRINTS.find(b => b.id === chosenTemplate)?.name}
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Timeline Overview</h3>
                  <div className="space-y-2">
                    {Object.entries(BLUEPRINTS.find(b => b.id === chosenTemplate)?.phaseOffsets || {}).map(([phase, offset]) => (
                      <div key={phase} className="flex justify-between text-sm">
                        <span className="text-blue-800 capitalize">{phase}</span>
                        <span className="text-blue-700">Day {offset}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Project Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Project Name</span>
                      <span className="font-medium">{projectName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Template</span>
                      <span className="font-medium">
                        {BLUEPRINTS.find(b => b.id === chosenTemplate)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pages</span>
                      <span className="font-medium">
                        {BLUEPRINTS.find(b => b.id === chosenTemplate)?.defaultSiteMap.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={
                (step === 1 && !chosenTemplate) ||
                (step === 2 && !projectName.trim()) ||
                (step === 3 && !chosenTemplate)
              }
              onClick={handleNext}
            >
              {step === 3 ? 'Create Project' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardModal;