import React, { useState } from 'react';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import TaskStudio from './pages/TaskStudio';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { NotificationProvider } from './context/NotificationContext';
import { ChatProvider } from './context/ChatContext';
import { PhaseProvider } from './context/PhaseContext';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  const [isTaskStudioOpen, setIsTaskStudioOpen] = useState(false);

  const handleOpenTask = (taskId: string) => {
    setIsTaskStudioOpen(true);
  };

  const handleCloseTaskStudio = () => {
    setIsTaskStudioOpen(false);
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <PhaseProvider defaultPhase="content">
          <ProjectProvider>
            <TaskProvider>
              <ChatProvider>
                <div className="min-h-screen flex flex-col bg-gray-50">
                  <Header />
                  <main className="flex-grow flex">
                    {isTaskStudioOpen ? (
                      <TaskStudio onClose={handleCloseTaskStudio} />
                    ) : (
                      <Dashboard onOpenTask={handleOpenTask} />
                    )}
                  </main>
                </div>
              </ChatProvider>
            </TaskProvider>
          </ProjectProvider>
        </PhaseProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;