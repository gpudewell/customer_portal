import { useState, useEffect } from 'react';
import { StaffMember } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useStaffTask = (taskId: string) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const savedStaff = localStorage.getItem(`staff-${taskId}`);
    if (savedStaff) {
      setStaff(JSON.parse(savedStaff));
    }
  }, [taskId]);

  useEffect(() => {
    if (isDirty) {
      // In a real app, this would be debounced and save to your API
      localStorage.setItem(`staff-${taskId}`, JSON.stringify(staff));
    }
  }, [staff, taskId, isDirty]);

  const updateStaff = (newStaff: StaffMember[]) => {
    setStaff(newStaff);
    setIsDirty(true);
  };

  return { staff, setStaff: updateStaff, isDirty };
};