import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  onOpenFeedback: (pageId: string, commentId: string) => void;
}

const InboxTable: React.FC<Props> = ({ onOpenFeedback }) => {
  const { pageReviews, markCommentRead } = useTasks();
  const unread = pageReviews
    .flatMap(p => p.comments.map(c => ({ ...c, page: p })))
    .filter(c => c.isUnreadForPM)
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

  if (unread.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-8">
        <p className="text-gray-500">🎉 Inbox zero – no new client feedback.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-3 border-b font-semibold">Feedback Inbox</div>
      <ul className="divide-y">
        {unread.map(c => (
          <li
            key={c.id}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between"
            onClick={() => {
              markCommentRead(c.id);
              onOpenFeedback(c.page.id, c.id);
            }}
          >
            <div>
              <p className="font-medium">{c.page.title}</p>
              <p className="text-sm text-gray-600 line-clamp-1">{c.message}</p>
            </div>
            <span className="text-xs text-gray-500 shrink-0">
              {formatDistanceToNow(new Date(c.timestamp), { addSuffix: true })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InboxTable;