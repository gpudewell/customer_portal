import { User, Phase, Task, Notification, ChatMessage, DeliverableAsset, PageReview } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Dr. Smith',
    email: 'dr.smith@vetclinic.com',
    role: 'client_owner',
    avatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: '2',
    name: 'Jane Cooper',
    email: 'jane@designengine.com',
    role: 'de_pm',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@designengine.com',
    role: 'super_admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
  }
];

export const currentUser = users[0];

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'Welcome to your veterinary website project! Let\'s get started.',
    timestamp: '2025-05-15T10:00:00Z',
    read: false
  },
  {
    id: '2',
    type: 'success',
    message: 'Discovery phase completed successfully! Moving to Content phase.',
    timestamp: '2025-05-16T14:30:00Z',
    read: true
  },
  {
    id: '3',
    type: 'warning',
    message: 'Staff Biographies task is due in 5 days.',
    timestamp: '2025-05-27T09:15:00Z',
    read: false
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    taskId: 'staff_bios',
    userId: '3',
    userName: 'Sam Davis',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    message: 'Hi Dr. Smith! I\'m here to help with your staff biographies. Let me know if you have any questions.',
    timestamp: '2025-05-17T10:30:00Z'
  },
  {
    id: '2',
    taskId: 'staff_bios',
    userId: '1',
    userName: 'Dr. Smith',
    userAvatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    message: 'Thanks Sam! How long should each bio be? And should I include personal interests?',
    timestamp: '2025-05-17T11:45:00Z'
  },
  {
    id: '3',
    taskId: 'staff_bios',
    userId: '3',
    userName: 'Sam Davis',
    userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    message: 'Great question! Aim for 150-200 words per bio. Personal interests are definitely encouraged - they help clients connect with your team!',
    timestamp: '2025-05-17T12:10:00Z'
  }
];

export const deliverableAssets: DeliverableAsset[] = [
  {
    id: '1',
    taskId: 'staff_bios',
    type: 'document',
    url: '#',
    name: 'Draft_Staff_Bios.docx',
    uploadedBy: '1',
    uploadedAt: '2025-05-18T15:30:00Z',
    status: 'draft'
  }
];

export const phases: Phase[] = [
  {
    id: 'discovery',
    slug: 'discovery',
    title: 'Discovery',
    order: 0,
    isComplete: true,
    isCurrent: false,
    tasks: []
  },
  {
    id: 'content',
    slug: 'content',
    title: 'Content',
    order: 1,
    isComplete: false,
    isCurrent: true,
    tasks: []
  },
  {
    id: 'design',
    slug: 'design',
    title: 'Design',
    order: 2,
    isComplete: false,
    isCurrent: false,
    tasks: []
  },
  {
    id: 'launch',
    slug: 'launch',
    title: 'Launch',
    order: 3,
    isComplete: false,
    isCurrent: false,
    tasks: []
  }
];

export const mockPages: PageReview[] = [
  {
    id: 'home',
    title: 'Homepage',
    slug: '/home',
    previewImg: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stagingUrl: 'https://example.com',
    status: 'pending',
    version: 'v1.0',
    updatedAt: '2025-06-15T10:00:00Z',
    feedbackDue: '2025-06-22T23:59:59Z',
    comments: []
  },
  {
    id: 'services',
    title: 'Services',
    slug: '/services',
    previewImg: 'https://images.pexels.com/photos/6235231/pexels-photo-6235231.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stagingUrl: 'https://example.com/services',
    status: 'changes_requested',
    version: 'v1.1',
    updatedAt: '2025-06-15T10:00:00Z',
    feedbackDue: '2025-06-22T23:59:59Z',
    comments: [
      {
        id: '1',
        pageId: 'services',
        projectId: 'valley-vet',
        userId: '1',
        userName: 'Dr. Smith',
        userAvatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        message: 'Can we make the service cards larger on desktop?',
        timestamp: '2025-06-16T14:30:00Z',
        status: 'open',
        isUnreadForPM: true
      }
    ]
  },
  {
    id: 'about',
    title: 'About Us',
    slug: '/about',
    previewImg: 'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stagingUrl: 'https://example.com/about',
    status: 'approved',
    version: 'v1.0',
    updatedAt: '2025-06-15T10:00:00Z',
    feedbackDue: '2025-06-22T23:59:59Z',
    comments: []
  },
  {
    id: 'contact',
    title: 'Contact',
    slug: '/contact',
    previewImg: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200',
    stagingUrl: 'https://example.com/contact',
    status: 'pending',
    version: 'v1.0',
    updatedAt: '2025-06-15T10:00:00Z',
    feedbackDue: '2025-06-22T23:59:59Z',
    comments: [
      {
        id: '2',
        pageId: 'contact',
        projectId: 'valley-vet',
        userId: '1',
        userName: 'Dr. Smith',
        userAvatar: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        message: 'The contact form needs more fields for pet information',
        timestamp: '2025-06-17T09:15:00Z',
        status: 'open',
        isUnreadForPM: true
      }
    ]
  }
];

const proposedSiteMap = {
  home: {
    title: 'Home',
    description: 'Main landing page with hero section, services overview, and testimonials'
  },
  about: {
    title: 'About Us',
    description: 'Practice history, mission, values, and facility tour'
  },
  services: {
    title: 'Services',
    description: 'Comprehensive list of veterinary services',
    children: [
      { title: 'Wellness Care', description: 'Preventive care and checkups' },
      { title: 'Surgery', description: 'Surgical procedures and recovery care' },
      { title: 'Dental Care', description: 'Dental cleanings and procedures' },
      { title: 'Emergency Care', description: '24/7 emergency services' }
    ]
  },
  team: {
    title: 'Our Team',
    description: 'Staff profiles and credentials'
  },
  contact: {
    title: 'Contact',
    description: 'Location, hours, and contact form'
  },
  resources: {
    title: 'Pet Resources',
    description: 'Educational articles and FAQs',
    children: [
      { title: 'New Patient Info', description: 'First visit information' },
      { title: 'Pet Care Tips', description: 'Care guides and advice' }
    ]
  }
};

export const tasks: Task[] = [
  {
    id: 'staff_bios',
    title: 'Staff Biographies & Headshots',
    phaseSlug: 'content',
    status: 'active',
    focusWeight: 1,
    dueDate: '2025-06-01',
    description: 'Submit biographies and professional headshots for all veterinarians and key staff members. Include education, specialties, years of experience, and a personal note about why they love veterinary medicine.',
    tipsRef: 'ai_bio_tips'
  },
  {
    id: 'service_copy',
    title: 'Service Page Copy',
    phaseSlug: 'content',
    status: 'active',
    focusWeight: 1,
    dueDate: '2025-06-01',
    description: 'Create descriptive content for each service your clinic offers. Focus on what makes your approach unique and the benefits to pet owners.',
    tipsRef: 'ai_copy_tips'
  },
  {
    id: 'domain_creds',
    title: 'Domain Registrar Access',
    phaseSlug: 'content',
    status: 'pending',
    focusWeight: 1,
    dueDate: '2025-06-15',
    description: 'Provide access credentials for your domain registrar (e.g., GoDaddy, Namecheap) to enable DNS updates for the new website.',
    required: true
  },
  {
    id: 'email_migration',
    title: 'Email Migration Preferences',
    phaseSlug: 'content',
    status: 'pending',
    focusWeight: 1,
    dueDate: '2025-06-15',
    description: 'Confirm your email migration preferences and provide a list of email accounts to migrate to the new hosting platform.',
    required: true
  },
  {
    id: 'sitemap_confirmation',
    title: 'Confirmed Site Map',
    phaseSlug: 'content',
    status: 'active',
    focusWeight: 1,
    dueDate: '2025-06-08',
    description: 'Review and approve the proposed site map for your new website. This will define the pages and navigation structure.',
    payload: {
      proposedSiteMap
    }
  },
  {
    id: 'design_review',
    title: 'Design Review',
    phaseSlug: 'design',
    status: 'active',
    focusWeight: 1,
    dueDate: '2025-06-22',
    description: 'Review and approve the design for your new website.',
    type: 'design_review',
    payload: {
      pages: mockPages
    }
  }
];