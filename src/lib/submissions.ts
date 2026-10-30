import { signInAnonymously } from 'firebase/auth';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';
import { auth, db } from './firebase';
import { validateSubmission, type ReviewStatus, type Submission } from './moderation';
import { persistSubmission, transitionSubmission } from './moderationStore';
import type { Opportunity, SubmissionDraft } from '../types';

export async function submitOpportunity(draft: SubmissionDraft) {
  if (!auth || !db) throw new Error('استقبال الاقتراحات غير متاح بعد. يرجى المحاولة لاحقاً.');
  validateSubmission(draft);
  await auth.authStateReady();
  const user = auth.currentUser ?? (await signInAnonymously(auth)).user;
  return persistSubmission(db, user.uid, draft);
}

export function watchPublished(next: (ops: Opportunity[]) => void, error: (e: Error) => void) {
  if (!db) return () => {};
  return onSnapshot(query(collection(db, 'publishedOpportunities'), limit(500)), snapshot => {
    next(snapshot.docs.map(d => d.data().opportunity as Opportunity));
  }, error);
}
export function watchSubmissions(status: ReviewStatus, next: (drafts: Submission[]) => void, error: (e: Error) => void) {
  if (!db) return () => {};
  return onSnapshot(query(collection(db, 'submissions'), where('status', '==', status), limit(200)), snapshot => {
    next(snapshot.docs.map(d => ({ ...d.data(), id: d.id, createdAt: d.data().createdAt?.toDate?.().toISOString() ?? '' }) as Submission));
  }, error);
}
export async function reviewSubmission(id: string, target: ReviewStatus, notes: string) {
  if (!auth?.currentUser || !db) throw new Error('يلزم تسجيل دخول المشرف.');
  return transitionSubmission(db, auth.currentUser.uid, id, target, notes);
}
