import React from 'react';
import { ExternalLink, MessageSquare, CheckCircle, X } from 'lucide-react';
import { PageReview } from '../../types';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

interface DesignReviewTableProps {
  pages: PageReview[];
  onOpenFeedback: (page: PageReview) => void;
  onApprove: (pageId: string) => void;
}

const DesignReviewTable: React.FC<DesignReviewTableProps> = ({
  pages,
  onOpenFeedback,
  onApprove,
}) => {
  const { user } = useAuth();
  const { unapprovePage } = useTasks();
  const isClient = user?.role === 'client_owner' || user?.role === 'client_collaborator';

  if (pages.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No pages yet – your PM will add them soon.</p>
      </div>
    );
  }

  const getStatusBadge = (page: PageReview) => {
    switch (page.status) {
      case 'approved':
        return (
          <div className="flex items-center space-x-1">
            <Badge variant="green">Approved</Badge>
            {isClient && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  unapprovePage(page.id);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="Unapprove page"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        );
      case 'changes_requested':
        return <Badge variant="yellow">Changes Requested</Badge>;
      default:
        return <Badge variant="blue">Pending Review</Badge>;
    }
  };

  const hasUnresolvedComments = (page: PageReview) => {
    return page.comments.some(c => c.status === 'open');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Page
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pages.map((page) => (
            <tr key={page.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{page.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  onClick={() => window.open(page.stagingUrl, '_blank')}
                >
                  <span className="hidden md:inline">Open</span>
                </Button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(page)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                    onClick={() => onOpenFeedback(page)}
                  >
                    Feedback
                  </Button>
                  {isClient && page.status !== 'approved' && (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<CheckCircle className="w-4 h-4" />}
                      onClick={() => onApprove(page.id)}
                      disabled={hasUnresolvedComments(page)}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesignReviewTable;