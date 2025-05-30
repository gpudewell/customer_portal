import React, { useState } from 'react';
import { Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import Avatar from '../common/Avatar';
import { Role } from '../../types';

interface HeaderProps {
  onRoleSwitchChange?: (role: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ onRoleSwitchChange }) => {
  const { user, logout, switchRole } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    switchRole(newRole);
    if (onRoleSwitchChange) {
      onRoleSwitchChange(newRole);
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">VetWeb Portal</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Role Switch for QA */}
            <div className="mr-4 bg-gray-100 px-3 py-1 rounded-md flex items-center">
              <select 
                className="text-sm bg-transparent border-none focus:ring-0 text-gray-700"
                value={user?.role}
                onChange={handleRoleChange}
              >
                <option value="client_owner">Client Owner</option>
                <option value="client_collaborator">Client Collaborator</option>
                <option value="de_pm">DE Project Manager</option>
                <option value="de_admin">DE Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={toggleNotifications}
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2 px-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500 py-4 px-4 text-center">No notifications</p>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                        >
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative ml-3">
              <button
                className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={toggleUserMenu}
              >
                <Avatar src={user?.avatar} name={user?.name || 'User'} size="sm" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <a
                      href="#profile"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Profile
                    </a>
                    <a
                      href="#settings"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-500" />
                      Settings
                    </a>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;