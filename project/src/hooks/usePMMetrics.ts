import { useTasks } from '../context/TaskContext';
import dayjs from 'dayjs';

export const usePMMetrics = () => {
  const { tasks } = useTasks();
  const today = dayjs();

  const overdue = tasks.filter(t => 
    dayjs(t.dueDate).isBefore(today) && 
    t.status !== 'completed' && 
    t.status !== 'approved'
  ).length;

  const atRisk = tasks.filter(t =>
    dayjs(t.dueDate).isAfter(today) &&
    dayjs(t.dueDate).diff(today, 'day') <= 7 &&
    t.status !== 'completed' &&
    t.status !== 'approved'
  ).length;

  const activeProjects = new Set(tasks.map(t => t.phaseId)).size;

  return { activeProjects, overdue, atRisk };
};