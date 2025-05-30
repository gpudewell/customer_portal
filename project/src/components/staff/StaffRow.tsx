import React, { useState } from 'react';
import { Trash2, Upload, X } from 'lucide-react';
import Button from '../common/Button';
import { StaffMember } from '../../types';

interface StaffRowProps {
  member: StaffMember;
  onChange: (member: StaffMember) => void;
  onRemove: (id: string) => void;
}

const StaffRow: React.FC<StaffRowProps> = ({ member, onChange, onRemove }) => {
  const [error, setError] = useState<string | null>(null);

  const validateImage = (file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) return;

    // In a real app, this would upload to your storage service
    const url = URL.createObjectURL(file);
    onChange({ ...member, headshotUrl: url });
    setError(null);
  };

  const handleRemoveImage = () => {
    onChange({ ...member, headshotUrl: '' });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={member.name}
              onChange={e => onChange({ ...member, name: e.target.value })}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Dr. Jane Smith"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={member.title}
              onChange={e => onChange({ ...member, title: e.target.value })}
              className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Chief Veterinarian"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biography
            </label>
            <textarea
              value={member.biography}
              onChange={e => onChange({ ...member, biography: e.target.value })}
              className="w-full h-48 rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="Write a brief biography (150-200 words recommended)..."
              maxLength={750}
              style={{ minHeight: '12rem' }}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                {member.biography.length}/750 characters
              </p>
              <p className="text-xs text-gray-500">
                ~{Math.round(member.biography.split(/\s+/).length)} words
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Headshot
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            {member.headshotUrl ? (
              <div className="relative">
                <img
                  src={member.headshotUrl}
                  alt={member.name}
                  className="w-48 h-48 object-cover rounded-lg mx-auto"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">
                      Upload a file
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 className="w-4 h-4" />}
          onClick={() => onRemove(member.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default StaffRow;