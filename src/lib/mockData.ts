import { User, Customer, Case, LoyaltyCampaign, DashboardMetrics, Notification } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'executive',
    department: 'Customer Service',
    avatar: 'SJ'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'supervisor',
    department: 'Customer Service',
    avatar: 'MC'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    role: 'internal',
    department: 'Technical Support',
    avatar: 'LR'
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'admin',
    department: 'IT',
    avatar: 'JS'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Alice Wilson',
    email: 'alice.wilson@email.com',
    phone: '+1-555-0123',
    brand: 'Premium Brand'
  },
  {
    id: '2',
    name: 'Bob Martinez',
    email: 'bob.martinez@email.com',
    phone: '+1-555-0124',
    brand: 'Standard Brand'
  },
  {
    id: '3',
    name: 'Carol Brown',
    email: 'carol.brown@email.com',
    phone: '+1-555-0125',
    brand: 'Premium Brand'
  }
];

export const mockCases: Case[] = [
  {
    id: 'CS-001',
    title: 'Product delivery delay complaint',
    description: 'Customer reports that their premium product order was delayed by 5 days without prior notification.',
    type: 'complaint',
    status: 'in_progress',
    priority: 'high',
    customer: mockCustomers[0],
    assignedTo: mockUsers[0],
    createdBy: mockUsers[0],
    department: 'Customer Service',
    createdAt: new Date('2024-01-15T09:30:00'),
    updatedAt: new Date('2024-01-15T14:20:00'),
    dueDate: new Date('2024-01-17T17:00:00'),
    attachments: [],
    tags: ['delivery', 'premium']
  },
  {
    id: 'CS-002',
    title: 'Request for product exchange',
    description: 'Customer wants to exchange their product due to size issues.',
    type: 'request',
    status: 'pending',
    priority: 'medium',
    customer: mockCustomers[1],
    assignedTo: mockUsers[0],
    createdBy: mockUsers[0],
    department: 'Customer Service',
    createdAt: new Date('2024-01-14T11:45:00'),
    updatedAt: new Date('2024-01-14T11:45:00'),
    dueDate: new Date('2024-01-16T17:00:00'),
    attachments: [],
    tags: ['exchange', 'size']
  },
  {
    id: 'CS-003',
    title: 'Suggestion for mobile app improvement',
    description: 'Customer suggests adding dark mode to the mobile application.',
    type: 'suggestion',
    status: 'resolved',
    priority: 'low',
    customer: mockCustomers[2],
    assignedTo: mockUsers[2],
    createdBy: mockUsers[0],
    department: 'Technical Support',
    createdAt: new Date('2024-01-13T16:20:00'),
    updatedAt: new Date('2024-01-14T10:30:00'),
    dueDate: new Date('2024-01-20T17:00:00'),
    attachments: [],
    tags: ['mobile', 'app', 'feature']
  },
  {
    id: 'CS-004',
    title: 'Billing inquiry - overcharge',
    description: 'Customer believes they were overcharged on their last invoice.',
    type: 'complaint',
    status: 'pending',
    priority: 'urgent',
    customer: mockCustomers[0],
    assignedTo: mockUsers[1],
    createdBy: mockUsers[0],
    department: 'Customer Service',
    createdAt: new Date('2024-01-15T08:15:00'),
    updatedAt: new Date('2024-01-15T08:15:00'),
    dueDate: new Date('2024-01-15T17:00:00'),
    attachments: [],
    tags: ['billing', 'overcharge']
  }
];

export const mockCampaigns: LoyaltyCampaign[] = [
  {
    id: '1',
    name: 'Premium Customer Appreciation',
    description: 'Special offers for premium customers who have been with us for over 2 years',
    status: 'active',
    targetSegment: 'Premium customers 2+ years',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
    contactedCount: 245,
    interestedCount: 89,
    loyalCount: 156,
    createdBy: mockUsers[1]
  },
  {
    id: '2',
    name: 'New Year Loyalty Boost',
    description: 'Incentivize customers to upgrade their membership level',
    status: 'completed',
    targetSegment: 'Standard customers',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    contactedCount: 1200,
    interestedCount: 340,
    loyalCount: 890,
    createdBy: mockUsers[1]
  }
];

export const mockMetrics: DashboardMetrics = {
  totalCases: 156,
  pendingCases: 23,
  overdueCases: 7,
  resolvedToday: 12,
  avgResolutionTime: 2.4,
  casesByType: {
    complaint: 67,
    suggestion: 23,
    request: 45,
    loyalty: 21
  },
  casesByStatus: {
    pending: 23,
    in_progress: 45,
    resolved: 67,
    closed: 21
  },
  casesByDepartment: {
    'Customer Service': 89,
    'Technical Support': 34,
    'Sales': 18,
    'Billing': 15
  }
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'New case assigned',
    message: 'Case CS-004 has been assigned to you',
    type: 'case_assigned',
    isRead: false,
    createdAt: new Date('2024-01-15T08:16:00')
  },
  {
    id: '2',
    userId: '1',
    title: 'Case overdue',
    message: 'Case CS-001 is overdue and requires immediate attention',
    type: 'case_overdue',
    isRead: false,
    createdAt: new Date('2024-01-15T09:00:00')
  },
  {
    id: '3',
    userId: '1',
    title: 'Case transferred',
    message: 'Case CS-003 has been transferred to Technical Support',
    type: 'case_transferred',
    isRead: true,
    createdAt: new Date('2024-01-14T16:30:00')
  }
];