import React, { useState, useRef, useEffect } from 'react';
import { PageReview, Comment } from '../../types';
import DesignReviewTable from './DesignReviewTable';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { Mic, MicOff, Reply, X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { formatDistanceToNow } from 'date-fns';

interface DesignPhaseDashboardProps {
  taskId: string;
  pages: PageReview[];
}

const DesignPhaseDashboard: React.FC<DesignPhaseDashboardProps> = ({ taskId, pages }) => {
  const { pageReviews, addComment, approvePage } = useTasks();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState(false);
  const [draftComment, setDraftComment] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const { user } = useAuth();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const selectedPage = selectedPageId ? pageReviews.find(p => p.id === selectedPageId) : null;

  const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
  const [recognizer] = useState(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      return recognition;
    }
    return null;
  });

  useEffect(() => {
    if (feedbackDrawerOpen) {
      textRef.current?.focus();
    }
  }, [feedbackDrawerOpen]);

  useEffect(() => {
    if (!recognizer) return;

    const handleResult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setDraftComment(prev => (prev ? prev + ' ' : '') + transcript);
    };

    const handleEnd = () => {
      setIsRecognizing(false);
    };

    const handleError = (e: any) => {
      console.error('Speech recognition error:', e);
      setIsRecognizing(false);
    };

    recognizer.addEventListener('result', handleResult);
    recognizer.addEventListener('end', handleEnd);
    recognizer.addEventListener('error', handleError);

    return () => {
      recognizer.removeEventListener('result', handleResult);
      recognizer.removeEventListener('end', handleEnd);
      recognizer.removeEventListener('error', handleError);
    };
  }, [recognizer]);

  const approvedPages = pageReviews.filter(p => p.status === 'approved').length;
  const progress = Math.round((approvedPages / pageReviews.length) * 100);

  const handleOpenFeedback = (page: PageReview) => {
    setSelectedPageId(page.id);
    setFeedbackDrawerOpen(true);
    setReplyingTo(null);
  };

  const handleSubmitComment = () => {
    if (!selectedPage || !draftComment.trim() || !user) return;

    const newComment: Comment = {
      id: nanoid(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      message: draftComment,
      timestamp: new Date().toISOString(),
      status: 'open',
      replyTo: replyingTo?.id
    };

    addComment(selectedPage.id, newComment);
    setDraftComment('');
    setReplyingTo(null);

    // Scroll to the new comment
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStartVoice = () => {
    if (!recognizer || isRecognizing) return;

    try {
      recognizer.start();
      setIsRecognizing(true);
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsRecognizing(false);
    }
  };

  const handleStopVoice = () => {
    if (!recognizer || !isRecognizing) return;

    try {
      recognizer.stop();
      setIsRecognizing(false);
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment);
    textRef.current?.focus();
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const isPM = user?.role === 'de_pm' || user?.role === 'de_admin' || user?.role === 'super_admin';
    const isAuthor = user?.id === comment.userId;

    return (
      <div
        key={comment.id}
        id={comment.id}
        className={`relative mb-6 ${isReply ? 'ml-8' : ''}`}
      >
        {!isReply && <div className="absolute left-8 top-12 bottom-0 w-px bg-gray-200" />}
        <div className={`comment-bubble relative bg-white p-4 rounded-lg shadow-sm border ${
          isAuthor ? 'border-blue-100' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {comment.userAvatar && (
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-6 h-6 rounded-full mr-2"
                />
              )}
              <span className={`font-medium ${isAuthor ? 'text-blue-600' : 'text-gray-900'}`}>
                {comment.userName}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{comment.message}</p>
          <div className="flex justify-between items-center">
            {!isReply && (isPM || !isAuthor) && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Reply className="w-4 h-4" />}
                onClick={() => handleReply(comment)}
              >
                Reply
              </Button>
            )}
            {comment.status === 'open' && isPM && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {/* Handle resolve */}}
              >
                Resolve
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Design Review Progress</h2>
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {approvedPages} of {pageReviews.length} pages approved ({progress}%)
            </div>
          </div>
        </div>

        <DesignReviewTable
          pages={pageReviews}
          onOpenFeedback={handleOpenFeedback}
          onApprove={approvePage}
        />
      </Card>

      {/* Feedback Drawer */}
      {selectedPage && feedbackDrawerOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setFeedbackDrawerOpen(false)}
            />
            
            <div className="fixed inset-y-0 right-0 max-w-3xl w-full sm:w-2/3">
              <div className="h-full bg-white shadow-xl flex flex-col">
                <div className="px-4 py-6 bg-blue-600 sm:px-6 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-white">
                    Feedback for {selectedPage.title}
                  </h2>
                  <button
                    onClick={() => setFeedbackDrawerOpen(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                  {selectedPage.comments
                    .filter(comment => !comment.replyTo)
                    .map(comment => (
                      <React.Fragment key={comment.id}>
                        {renderComment(comment)}
                        {selectedPage.comments
                          .filter(reply => reply.replyTo === comment.id)
                          .map(reply => renderComment(reply, true))}
                      </React.Fragment>
                    ))}
                  <div ref={commentsEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                  {replyingTo && (
                    <div className="mb-2 p-2 bg-gray-50 rounded-lg text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Replying to {replyingTo.userName}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    <textarea
                      ref={textRef}
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 mb-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      value={draftComment}
                      onChange={(e) => setDraftComment(e.target.value)}
                      placeholder={replyingTo ? "Write your reply..." : "Add your feedback..."}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmitComment();
                        }
                      }}
                    />
                    {recognizer && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 bottom-5"
                        onClick={isRecognizing ? handleStopVoice : handleStartVoice}
                        leftIcon={isRecognizing ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
                      />
                    )}
                  </div>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleSubmitComment}
                    disabled={!draftComment.trim()}
                  >
                    {replyingTo ? 'Send Reply' : 'Submit Feedback'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPhaseDashboard;