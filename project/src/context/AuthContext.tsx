import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';
import { currentUser, users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  switchRole: (role: Role) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getPermissions: () => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const switchRole = (role: Role) => {
    const newUser = users.find(u => u.role === role) || null;
    setUser(newUser);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login functionality
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const getPermissions = (): string[] => {
    // Return permissions based on user role
    if (!user) return [];
    
    switch (user.role) {
      case 'client_owner':
        return ['upload_assets', 'complete_tasks', 'approve_designs', 'invite_users', 'view_timeline'];
      case 'client_collaborator':
        return ['upload_assets', 'complete_tasks', 'view_timeline'];
      case 'de_pm':
        return ['manage_tasks', 'edit_automations', 'impersonate_client', 'adjust_timeline', 'view_analytics'];
      case 'de_admin':
        return ['manage_tasks', 'edit_automations', 'impersonate_client', 'adjust_timeline', 'view_analytics', 'edit_templates', 'edit_automations'];
      case 'super_admin':
        return ['manage_tasks', 'edit_automations', 'impersonate_client', 'adjust_timeline', 'view_analytics', 'edit_templates', 'edit_automations', 'platform_settings', 'billing', 'sso'];
      default:
        return [];
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, switchRole, login, logout, getPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};