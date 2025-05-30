import React, { useState } from 'react';
import { Upload, Trash2, Wand } from 'lucide-react';
import Button from '../common/Button';
import { ServicePage } from '../../types';

interface ServicePageEditorProps {
  page: ServicePage;
  onChange: (page: ServicePage) => void;
  onDelete: () => void;
}

const ServicePageEditor: React.FC<ServicePageEditorProps> = ({
  page,
  onChange,
  onDelete
}) => {
  const [showAIOptions, setShowAIOptions] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onChange({ ...page, title, slug });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...page, content: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(file => URL.createObjectURL(file));
    onChange({ ...page, media: [...page.media, ...urls] });
  };

  const handleRemoveMedia = (index: number) => {
    const newMedia = [...page.media];
    newMedia.splice(index, 1);
    onChange({ ...page, media: newMedia });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service Title
        </label>
        <input
          type="text"
          value={page.title}
          onChange={handleTitleChange}
          className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Wellness Exams"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Service Description
          </label>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Wand className="w-4 h-4" />}
            onClick={() => setShowAIOptions(!showAIOptions)}
          >
            AI Assist
          </Button>
        </div>
        <textarea
          value={page.content}
          onChange={handleContentChange}
          className="w-full h-64 rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe this service..."
        />
        
        {showAIOptions && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">AI Writing Assistant</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white rounded transition-colors">
                🎯 Make more concise
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white rounded transition-colors">
                ✨ Improve readability
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white rounded transition-colors">
                💡 Add key benefits
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-white rounded transition-colors">
                ⭐ Highlight unique features
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Media
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {page.media.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveMedia(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add media</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 className="w-4 h-4" />}
          onClick={onDelete}
        >
          Delete Page
        </Button>
      </div>
    </div>
  );
};

export default ServicePageEditor;