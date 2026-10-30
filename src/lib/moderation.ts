import type { Opportunity, SubmissionDraft } from '../types';
import { asOfficialUrl } from './catalog';

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'published';
export interface Submission extends Omit<SubmissionDraft, 'status'> {
  status: ReviewStatus;
  submittedBy: string;
}
export function validateSubmission(d: SubmissionDraft) {
  const limits: Record<string, [number, number]> = {
    title: [6, 200], organizer: [3, 200], description: [15, 5000],
    category: [1, 80], location: [1, 200], deadline: [1, 200],
    eligibility: [1, 2000], cost: [1, 500], url: [1, 2000],
  };
  for (const [key, [min, max]] of Object.entries(limits)) {
    const value = d[key as keyof SubmissionDraft];
    if (typeof value !== 'string' || value.trim().length < min || value.length > max)
      throw new Error('يرجى مراجعة الحقول وطول النصوص قبل الإرسال.');
  }
  const parsed = new URL(d.url);
  if (!asOfficialUrl(d.url) || parsed.username || parsed.password)
    throw new Error('يرجى إدخال رابط HTTPS رسمي دون بيانات تسجيل دخول.');
  if (!['داخل المغرب', 'خارج المغرب', 'عن بعد'].includes(d.scope))
    throw new Error('يرجى اختيار نطاق صالح.');
}
export function canTransition(from: ReviewStatus, to: ReviewStatus) {
  return (from === 'pending' && ['approved', 'rejected'].includes(to)) ||
    (from === 'approved' && ['published', 'rejected'].includes(to));
}
export function toOpportunity(d: Submission, date: string): Opportunity {
  return {
    id: d.id, title_ar: d.title, category: d.category, scope: d.scope,
    location: d.location, organization: d.organizer, description_ar: d.description,
    eligibility_ar: d.eligibility, event_date: 'يرجى مراجعة المصدر الرسمي',
    application_deadline: d.deadline, cost_ar: d.cost,
    application_method_ar: 'التقديم عبر الرابط الرسمي',
    verification_status: 'بحاجة إلى تحقق', source_url: d.url,
    notes_ar: 'راجع المشرف هذا الاقتراح واعتمد نشره؛ يرجى التأكد من استمرار فتح التسجيل لدى الجهة المنظمة.',
    verified_on: date, isCustom: true, adminStatus: 'approved',
  };
}
