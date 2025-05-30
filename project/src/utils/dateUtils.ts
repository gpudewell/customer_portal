import { format, formatDistanceToNow, differenceInDays, parseISO } from 'date-fns';

export const formatDueDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const getDaysRemaining = (dateString: string): number => {
  try {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return differenceInDays(dueDate, today);
  } catch (error) {
    console.error('Error calculating days remaining:', error);
    return 0;
  }
};

export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Unknown time';
  }
};

export const formatChatTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting chat time:', error);
    return '';
  }
};