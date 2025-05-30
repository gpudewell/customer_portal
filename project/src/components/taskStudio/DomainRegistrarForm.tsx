import React, { useState } from 'react';
import { Info, Lock } from 'lucide-react';
import Button from '../common/Button';
import { Task } from '../../types';

interface DomainRegistrarForm {
  task: Task;
}

const DomainRegistrarForm: React.FC<DomainRegistrarForm> = ({ task }) => {
  const [formData, setFormData] = useState({
    registrarName: '',
    registrarUrl: '',
    username: '',
    password: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would securely submit the credentials
    console.log('Submitting credentials:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-blue-900 font-medium mb-1">Why we need this information</h3>
            <p className="text-sm text-blue-700">
              To make your new website live, we need access to your domain registrar account. 
              This allows us to update your DNS settings and ensure a smooth transition to the new site.
              Your credentials will be stored securely and only used for website deployment.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain Registrar Name
          </label>
          <input
            type="text"
            name="registrarName"
            value={formData.registrarName}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., GoDaddy, Namecheap, Google Domains"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registrar Login URL
          </label>
          <input
            type="url"
            name="registrarUrl"
            value={formData.registrarUrl}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., https://www.godaddy.com/login"
            required
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Login Credentials</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username / Email
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full h-24 rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any additional information or special instructions..."
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Lock className="w-4 h-4" />}
          >
            Submit Securely
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DomainRegistrarForm;