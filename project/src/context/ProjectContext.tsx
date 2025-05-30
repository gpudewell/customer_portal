import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Project } from '../types';

interface ProjectContextType {
  projects: Project[];
  addProject: (p: Project) => void;
}

const ProjectContext = createContext<ProjectContextType>({ 
  projects: [], 
  addProject: () => {} 
});

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};