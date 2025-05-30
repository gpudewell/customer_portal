import React, { useState } from 'react';
import { Plus, Copy, Wand } from 'lucide-react';
import Button from '../common/Button';
import ServicePageEditor from './ServicePageEditor';
import { ServicePage } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface ServicePageManagerProps {
  taskId: string;
  onComplete: () => void;
}

const ServicePageManager: React.FC<ServicePageManagerProps> = ({ taskId, onComplete }) => {
  const [isUpToDate, setIsUpToDate] = useState(false);
  const [pages, setPages] = useState<ServicePage[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const handleAddPage = () => {
    const newPage: ServicePage = {
      id: uuidv4(),
      title: '',
      slug: '',
      content: '',
      media: [],
      lastUpdated: new Date().toISOString(),
      status: 'draft'
    };
    setPages([...pages, newPage]);
    setSelectedPageId(newPage.id);
  };

  const handleUpdatePage = (updatedPage: ServicePage) => {
    setPages(pages.map(page => 
      page.id === updatedPage.id ? updatedPage : page
    ));
  };

  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  const handleUpToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpToDate(e.target.checked);
    if (e.target.checked) {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isUpToDate}
            onChange={handleUpToDateChange}
            className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-blue-900 font-medium">
            Copy is up to date on our current site
          </span>
        </label>
        <p className="text-sm text-blue-700 mt-2">
          Select this option if your current website's service pages are already up to date and you want to keep the existing content.
        </p>
      </div>

      {!isUpToDate && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Service Pages</h2>
              <p className="text-sm text-gray-500 mt-1">
                Create and manage your service pages
              </p>
            </div>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleAddPage}
            >
              Add Service Page
            </Button>
          </div>

          <div className="flex flex-grow min-h-0">
            <div className="w-64 border-r border-gray-200 pr-4 overflow-y-auto">
              <div className="space-y-2">
                {pages.map(page => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPageId(page.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedPageId === page.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {page.title || 'Untitled Service'}
                  </button>
                ))}

                {pages.length === 0 && (
                  <div className="text-center py-8">
                    <Copy className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      No service pages yet
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow pl-6 overflow-y-auto">
              {selectedPageId ? (
                <ServicePageEditor
                  page={pages.find(p => p.id === selectedPageId)!}
                  onChange={handleUpdatePage}
                  onDelete={() => handleDeletePage(selectedPageId)}
                />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a service page to edit
                  </h3>
                  <p className="text-gray-500">
                    Or create a new one using the "Add Service Page" button
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicePageManager;