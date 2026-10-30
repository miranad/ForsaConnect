import { doc, runTransaction, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore';
import { canTransition, toOpportunity, validateSubmission, type ReviewStatus, type Submission } from './moderation';
import type { SubmissionDraft } from '../types';

export async function persistSubmission(database: Firestore, submittedBy: string, draft: SubmissionDraft) {
  validateSubmission(draft);
  // Stable ID makes repeated sends and exact duplicate source URLs create-only.
  const canonical = new URL(draft.url).href;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  const id = 'FC-PROP-' + [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, '0')).join('');
  const { title, category, scope, organizer, location, deadline, description, eligibility, cost } = draft;
  await setDoc(doc(database, 'submissions', id), {
    id, title, category, scope, organizer, location, deadline, description, eligibility, cost,
    url: canonical, status: 'pending', submittedBy, createdAt: serverTimestamp(),
  });
  return id;
}

export async function transitionSubmission(database: Firestore, reviewer: string, id: string, target: ReviewStatus, notes: string) {
  if (!notes.trim() || notes.length > 2000) throw new Error('أضف ملاحظات المراجعة (حتى 2000 حرف).');
  await runTransaction(database, async tx => {
    const ref = doc(database, 'submissions', id);
    const snapshot = await tx.get(ref);
    if (!snapshot.exists()) throw new Error('لم يعد الاقتراح موجوداً.');
    const draft = { ...snapshot.data(), id } as Submission;
    if (!canTransition(draft.status, target)) throw new Error('تغيرت حالة الاقتراح؛ حدّث القائمة ثم حاول مجدداً.');
    tx.update(ref, { status: target, adminNotes: notes.trim(), reviewedBy: reviewer, reviewedAt: serverTimestamp() });
    if (target === 'published') tx.set(doc(database, 'publishedOpportunities', id), {
      submissionId: id,
      opportunity: toOpportunity(draft, new Date().toISOString().slice(0, 10)),
      publishedAt: serverTimestamp(), publishedBy: reviewer,
    });
  });
}
