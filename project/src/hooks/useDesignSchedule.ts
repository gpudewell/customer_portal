import { useTasks } from '../context/TaskContext';
import dayjs from 'dayjs';

interface DesignEvent {
  id: string;
  date: string;
  label: string;
  type: 'drop1' | 'drop2' | 'drop3' | 'launch' | 'wireframes';
  projectId: string;
}

export const useDesignSchedule = () => {
  const { tasks } = useTasks();
  
  // Mock design events - in a real app, this would come from your task/project data
  const events: DesignEvent[] = [
    {
      id: '1',
      date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      label: 'Valley Vet Drop',
      type: 'drop1',
      projectId: 'valley-vet'
    },
    {
      id: '2',
      date: dayjs().format('YYYY-MM-DD'),
      label: 'PawPerfect Drop',
      type: 'drop2',
      projectId: 'paw-perfect'
    },
    {
      id: '3',
      date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      label: 'Happy Tails Wireframes',
      type: 'wireframes',
      projectId: 'happy-tails'
    },
    {
      id: '4',
      date: dayjs().add(5, 'day').format('YYYY-MM-DD'),
      label: 'PetCare Launch',
      type: 'launch',
      projectId: 'pet-care'
    }
  ];

  return events;
};