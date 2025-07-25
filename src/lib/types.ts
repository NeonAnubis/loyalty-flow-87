export interface User {
  id: string;
  name: string;
  email: string;
  role: 'executive' | 'supervisor' | 'internal' | 'admin';
  department: string;
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  brand: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  type: 'complaint' | 'suggestion' | 'request' | 'loyalty';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customer: Customer;
  assignedTo: User;
  createdBy: User;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  attachments: string[];
  tags: string[];
}

export interface CaseComment {
  id: string;
  caseId: string;
  user: User;
  content: string;
  isInternal: boolean;
  createdAt: Date;
}

export interface CaseTransfer {
  id: string;
  caseId: string;
  fromUser: User;
  toUser: User;
  fromDepartment: string;
  toDepartment: string;
  reason: string;
  createdAt: Date;
}

export interface LoyaltyCampaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetSegment: string;
  startDate: Date;
  endDate: Date;
  contactedCount: number;
  interestedCount: number;
  loyalCount: number;
  createdBy: User;
}

export interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'email' | 'internal';
  category: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'case_assigned' | 'case_overdue' | 'case_transferred' | 'system';
  isRead: boolean;
  createdAt: Date;
}

export interface DashboardMetrics {
  totalCases: number;
  pendingCases: number;
  overdueCases: number;
  resolvedToday: number;
  avgResolutionTime: number;
  casesByType: Record<string, number>;
  casesByStatus: Record<string, number>;
  casesByDepartment: Record<string, number>;
}