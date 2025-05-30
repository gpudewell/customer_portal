import React from 'react';
import { Flag } from 'lucide-react';
import dayjs from 'dayjs';
import { useDesignSchedule } from '../../hooks/useDesignSchedule';

interface DesignCalendarProps {
  onOpenProject: (projectId: string) => void;
}

const DesignCalendar: React.FC<DesignCalendarProps> = ({ onOpenProject }) => {
  const events = useDesignSchedule();
  const today = dayjs();
  const startOfMonth = today.startOf('month');
  const endOfMonth = today.endOf('month');
  const daysInMonth = endOfMonth.date();
  
  const eventsByDate: Record<string, Array<{
    id: string;
    date: string;
    label: string;
    type: 'drop1' | 'drop2' | 'drop3' | 'launch' | 'wireframes';
    projectId: string;
  }>> = {};

  events.forEach(event => {
    const date = dayjs(event.date).format('YYYY-MM-DD');
    if (!eventsByDate[date]) {
      eventsByDate[date] = [];
    }
    eventsByDate[date].push(event);
  });

  const getEventColor = (type: 'drop1' | 'drop2' | 'drop3' | 'launch' | 'wireframes') => {
    switch (type) {
      case 'drop1':
        return 'bg-blue-500 text-white';
      case 'drop2':
        return 'bg-indigo-500 text-white';
      case 'drop3':
        return 'bg-violet-500 text-white';
      case 'launch':
        return 'bg-green-600 text-white';
      case 'wireframes':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Design Calendar</h2>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-sm font-medium text-gray-500 text-center p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOfMonth.day() }).map((_, i) => (
              <div key={`empty-start-${i}`} className="h-24 bg-gray-50 rounded-lg"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = startOfMonth.add(i, 'day');
              const dateStr = date.format('YYYY-MM-DD');
              const dayEvents = eventsByDate[dateStr] || [];
              const isToday = date.isSame(today, 'day');

              return (
                <div
                  key={i}
                  className={`h-24 p-1 border rounded-lg ${
                    isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-100'
                  }`}
                >
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    {date.format('D')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map(event => (
                      <button
                        key={event.id}
                        onClick={() => onOpenProject(event.projectId)}
                        className={`w-full text-left px-2 py-1 rounded text-xs font-medium flex items-center justify-between ${getEventColor(
                          event.type
                        )}`}
                      >
                        <span className="truncate">{event.label}</span>
                        {event.type === 'launch' && <Flag className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCalendar;