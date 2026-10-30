export type ScopeType = 'داخل المغرب' | 'خارج المغرب' | 'عن بعد';

export interface Opportunity {
  id: string;
  title_ar: string;
  category: string;
  scope: ScopeType;
  location: string;
  organization: string;
  description_ar: string;
  eligibility_ar: string;
  event_date: string;
  application_deadline: string;
  cost_ar: string;
  application_method_ar: string;
  verification_status: string;
  source_url: string;
  notes_ar?: string;
  verified_on: string;
  isCustom?: boolean;
  adminStatus?: 'approved' | 'pending' | 'rejected' | 'needs_review';
}

export interface SubmissionDraft {
  id: string;
  title: string;
  category: string;
  scope: ScopeType;
  organizer: string;
  location: string;
  deadline: string;
  url: string;
  description: string;
  eligibility: string;
  cost: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

export type ActiveTab = 'opportunities' | 'submit' | 'admin' | 'verification' | 'about' | 'contact';
