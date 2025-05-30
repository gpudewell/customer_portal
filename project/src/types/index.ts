import { Role } from './Role';
import { TaskStatus } from './TaskStatus';
import { PhaseSlug } from './PhaseSlug';
import { PageReviewStatus } from './PageReviewStatus';
import { Blueprint } from './Blueprint';

export * from './Role';
export * from './TaskStatus';
export * from './PhaseSlug';
export * from './PageReviewStatus';
export * from './Blueprint';

export interface Project {
  id: string;
  name: string;
  templateId: string;
  createdAt: string;
  phaseSlug: PhaseSlug;
}

export interface Comment {
  id: string;
  pageId: string;
  projectId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  status: 'open' | 'resolved';
  replyTo?: string;
  isUnreadForPM?: boolean;
}

export interface PageReview {
  id: string;
  title: string;
  slug: string;
  previewImg: string;
  stagingUrl: string;
  status: PageReviewStatus;
  version: string;
  updatedAt: string;
  feedbackDue: string;
  comments: Comment[];
}

export interface Pin {
  id: string;
  x: number;
  y: number;
  commentId: string;
  status: 'open' | 'resolved';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Phase {
  id: string;
  slug: PhaseSlug;
  title: string;
  order: number;
  isComplete: boolean;
  isCurrent: boolean;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  phaseSlug: PhaseSlug;
  status: TaskStatus;
  focusWeight: number;
  dueDate: string;
  description: string;
  assignedTo?: string;
  tipsRef?: string;
  required?: boolean;
  type?: 'design_review';
  payload?: {
    pages?: PageReview[];
    proposedSiteMap?: Record<string, any>;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface DeliverableAsset {
  id: string;
  taskId: string;
  type: 'image' | 'document' | 'voice';
  url: string;
  name: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'draft' | 'approved';
}

export interface ServicePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  media: string[];
  lastUpdated: string;
  status: 'draft' | 'published';
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  biography: string;
  headshotUrl: string;
}