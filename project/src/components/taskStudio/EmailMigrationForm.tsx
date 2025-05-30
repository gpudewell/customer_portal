import React, { useState } from 'react';
import { Info, Plus, Trash2, Mail, AlertCircle } from 'lucide-react';
import Button from '../common/Button';
import { Task } from '../../types';

interface EmailMigrationFormProps {
  task: Task;
  onComplete: () => void;
}

const EmailMigrationForm: React.FC<EmailMigrationFormProps> = ({ task, onComplete }) => {
  const [needsMigration, setNeedsMigration] = useState<boolean | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [emailAddresses, setEmailAddresses] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');

  const handleAddEmail = () => {
    if (!newEmail) {
      setError('Please enter an email address');
      return;
    }

    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    if (emailAddresses.includes(newEmail)) {
      setError('This email address has already been added');
      return;
    }

    setEmailAddresses([...emailAddresses, newEmail]);
    setNewEmail('');
    setError('');
  };

  const handleRemoveEmail = (email: string) => {
    setEmailAddresses(emailAddresses.filter(e => e !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the migration preferences
    console.log({
      needsMigration,
      emailAddresses: needsMigration ? emailAddresses : []
    });
    onComplete();
  };

  const handleMigrationChoice = (choice: boolean) => {
    setNeedsMigration(choice);
    if (!choice) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmNoMigration = () => {
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-blue-900 font-medium mb-1">About Email Migration</h3>
            <p className="text-sm text-blue-700">
              We can migrate your existing email accounts to the new hosting platform, 
              ensuring uninterrupted email service. Alternatively, you can keep your 
              current email provider if you prefer.
            </p>
          </div>
        </div>
      </div>

      {showConfirmation ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start space-x-3 mb-6">
            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Confirm Email Setup Decision
              </h3>
              <p className="text-gray-600">
                You've chosen to keep your current email setup. This means:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-center">
                  • Your email service will remain with your current provider
                </li>
                <li className="flex items-center">
                  • No migration will be performed
                </li>
                <li className="flex items-center">
                  • Your website launch won't affect your email service
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Go Back
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmNoMigration}
            >
              Yes, Keep Current Setup
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-base font-medium text-gray-900">
              Would you like us to migrate your email accounts?
            </label>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="migration"
                  checked={needsMigration === true}
                  onChange={() => handleMigrationChoice(true)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">Yes, migrate my email accounts</span>
                  <p className="text-sm text-gray-500 mt-1">
                    We'll handle the migration of your email accounts to the new hosting platform
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="migration"
                  checked={needsMigration === false}
                  onChange={() => handleMigrationChoice(false)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">No, keep my current email setup</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Your email service will remain with your current provider
                  </p>
                </div>
              </label>
            </div>
          </div>

          {needsMigration && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Accounts to Migrate</h3>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-grow rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddEmail}
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Add
                  </Button>
                </div>
                
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                {emailAddresses.length > 0 ? (
                  <div className="space-y-2">
                    {emailAddresses.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{email}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveEmail(email)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No email addresses added yet
                  </p>
                )}

                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Mail className="w-4 h-4" />}
                  >
                    Submit Migration Request
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default EmailMigrationForm