import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Task, TaskStatus, PhaseSlug, PageReview, Comment } from '../types';
import { tasks as initialTasks, mockPages as initialPages } from '../data/mockData';

interface TaskContextType {
  tasks: Task[];
  activeTask: Task | null;
  pageReviews: PageReview[];
  unreadCount: number;
  getActiveTasks: (phaseSlug?: PhaseSlug) => Task[];
  getPendingTasks: (phaseSlug?: PhaseSlug) => Task[];
  getCompletedTasks: (phaseSlug?: PhaseSlug) => Task[];
  setActiveTask: (taskId: string | null) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  getTaskById: (taskId: string) => Task | undefined;
  approvePage: (pageId: string) => void;
  unapprovePage: (pageId: string) => void;
  addComment: (pageId: string, comment: Comment) => void;
  markCommentRead: (commentId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [pageReviews, setPageReviews] = useState<PageReview[]>(initialPages);

  const unreadCount = useMemo(
    () => pageReviews.reduce(
      (acc, p) => acc + p.comments.filter(c => c.isUnreadForPM).length,
      0
    ),
    [pageReviews]
  );

  const getActiveTasks = (phaseSlug?: PhaseSlug): Task[] => {
    const activeTasks = tasks.filter(task => task.status === 'active');
    return phaseSlug ? activeTasks.filter(task => task.phaseSlug === phaseSlug) : activeTasks;
  };

  const getPendingTasks = (phaseSlug?: PhaseSlug): Task[] => {
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    return phaseSlug ? pendingTasks.filter(task => task.phaseSlug === phaseSlug) : pendingTasks;
  };

  const getCompletedTasks = (phaseSlug?: PhaseSlug): Task[] => {
    const completedTasks = tasks.filter(task => task.status === 'completed' || task.status === 'approved');
    return phaseSlug ? completedTasks.filter(task => task.phaseSlug === phaseSlug) : completedTasks;
  };

  const setActiveTask = (taskId: string | null) => {
    setActiveTaskId(taskId);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.find(task => task.id === taskId);
  };

  const approvePage = (pageId: string) => {
    setPageReviews(pages =>
      pages.map(p => p.id === pageId ? { ...p, status: 'approved' } : p)
    );
  };

  const unapprovePage = (pageId: string) => {
    setPageReviews(pages =>
      pages.map(p => p.id === pageId ? { ...p, status: 'pending' } : p)
    );
  };

  const addComment = (pageId: string, comment: Comment) => {
    const commentWithUnreadFlag = {
      ...comment,
      pageId,
      projectId: 'valley-vet', // In a real app, this would come from the project context
      isUnreadForPM: true // Set this for new comments from clients
    };

    setPageReviews(pages =>
      pages.map(p =>
        p.id === pageId ? { 
          ...p, 
          comments: [...p.comments, commentWithUnreadFlag],
          status: 'changes_requested'
        } : p
      )
    );
  };

  const markCommentRead = (commentId: string) => {
    setPageReviews(prev =>
      prev.map(p => ({
        ...p,
        comments: p.comments.map(c =>
          c.id === commentId ? { ...c, isUnreadForPM: false } : c
        )
      }))
    );
  };

  const activeTask = activeTaskId ? getTaskById(activeTaskId) : null;

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      activeTask,
      pageReviews,
      unreadCount,
      getActiveTasks, 
      getPendingTasks,
      getCompletedTasks,
      setActiveTask, 
      updateTaskStatus,
      getTaskById,
      approvePage,
      unapprovePage,
      addComment,
      markCommentRead
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};