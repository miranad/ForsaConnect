import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { toOpportunity, type Submission } from '../../src/lib/moderation';
let env: RulesTestEnvironment;
const projectId = 'demo-forsaconnect';
const id = 'FC-PROP-' + 'a'.repeat(64);
const fields = {
 id, title: 'ورشة تدريب للشباب', organizer: 'جمعية الاختبار', description: 'ورشة تدريب عملية مفتوحة للشباب بالمغرب',
 category: 'تكوين', scope: 'داخل المغرب' as const, location: 'الرباط', deadline: '2026-12-01',
 eligibility: 'الشباب', cost: 'مجاني', url: 'https://example.org/training', status: 'pending', submittedBy: 'visitor',
};
const admin = () => env.authenticatedContext('reviewer', { admin: true, email_verified: true }).firestore();
const visitor = () => env.authenticatedContext('visitor', { firebase: { sign_in_provider: 'anonymous' } }).firestore();
const guest = () => env.unauthenticatedContext().firestore();
const review = (status: string) => ({ status, adminNotes: 'تم فحص المصدر', reviewedBy: 'reviewer', reviewedAt: serverTimestamp() });
before(async () => { env = await initializeTestEnvironment({ projectId, firestore: { rules: readFileSync('firestore.rules','utf8') } }); });
after(async () => { await env?.cleanup(); });
beforeEach(async () => { await env.clearFirestore(); });
async function submit() { await assertSucceeds(setDoc(doc(visitor(), 'submissions', id), { ...fields, createdAt: serverTimestamp() })); }
test('Anonymous visitor can submit pending data but cannot read, review, delete or publish', async () => {
 await submit();
 await assertFails(getDoc(doc(visitor(), 'submissions', id)));
 await assertFails(getDocs(collection(guest(), 'submissions')));
 await assertFails(updateDoc(doc(visitor(), 'submissions', id), review('approved')));
 await assertFails(deleteDoc(doc(visitor(), 'submissions', id)));
 await assertFails(setDoc(doc(visitor(), 'publishedOpportunities', id), { submissionId: id }));
});
test('Forged status, timestamps, owners, fields, insecure URLs and duplicates are denied', async () => {
 for (const patch of [{status:'approved'}, {submittedBy:'someone-else'}, {createdAt:new Date(0)}, {adminNotes:'forged'}, {url:'http://example.org'}, {url:'https://user:secret@example.org'}, {title:'a'}]) {
   await assertFails(setDoc(doc(visitor(), 'submissions', id), { ...fields, createdAt: serverTimestamp(), ...patch }));
 }
 await assertFails(setDoc(doc(guest(), 'submissions', id), { ...fields, createdAt: serverTimestamp() }));
 await submit();
 await assertFails(setDoc(doc(visitor(), 'submissions', id), { ...fields, createdAt: serverTimestamp() }));
});
test('Unverified or non-admin signed-in users cannot access moderation', async () => {
 await submit();
 for (const claims of [{email_verified:true}, {admin:true,email_verified:false}]) {
   const db = env.authenticatedContext('intruder',claims).firestore();
   await assertFails(getDoc(doc(db,'submissions',id)));
   await assertFails(updateDoc(doc(db,'submissions',id),review('approved')));
 }
});
test('Review approval and atomic publication expose only the public projection', async () => {
 await submit();
 const db = admin();
 await assertSucceeds(getDocs(collection(db,'submissions')));
 await assertFails(updateDoc(doc(db,'submissions',id),review('published')));
 await assertSucceeds(updateDoc(doc(db,'submissions',id),review('approved')));
 await assertFails(updateDoc(doc(db,'submissions',id),review('published')));
 const batch = writeBatch(db);
 batch.update(doc(db,'submissions',id),review('published'));
 batch.set(doc(db,'publishedOpportunities',id),{
   submissionId:id, opportunity:toOpportunity({...fields,status:'approved',createdAt:'2026-10-30'} as Submission,'2026-10-30'),
   publishedBy:'reviewer', publishedAt:serverTimestamp(),
 });
 await assertSucceeds(batch.commit());
 await assertSucceeds(getDoc(doc(guest(),'publishedOpportunities',id)));
 await assertFails(updateDoc(doc(db,'submissions',id),review('rejected')));
 await assertFails(deleteDoc(doc(db,'publishedOpportunities',id)));
});
test('Rejected entries stay private; administrators cannot edit submission content', async () => {
 await submit(); const db=admin();
 await assertFails(updateDoc(doc(db,'submissions',id),{...review('approved'),title:'tampered'}));
 await assertSucceeds(updateDoc(doc(db,'submissions',id),review('rejected')));
 await assertFails(getDoc(doc(guest(),'submissions',id)));
 await assertFails(updateDoc(doc(db,'submissions',id),review('approved')));
});

test('Actual application persistence and transaction functions complete the full workflow', async () => {
 const { persistSubmission, transitionSubmission } = await import('../../src/lib/moderationStore');
 const asDb = (db: unknown) => db as import('firebase/firestore').Firestore;
 const draft = { ...fields, status:'pending' as const, createdAt:'2026-10-30' };
 const actualId = await persistSubmission(asDb(visitor()), 'visitor', draft);
 await assertFails(transitionSubmission(asDb(visitor()),'visitor',actualId,'approved','forged'));
 await assertSucceeds(transitionSubmission(asDb(admin()),'reviewer',actualId,'approved','تم فحص المصدر'));
 const before = await getDoc(doc(guest(),'publishedOpportunities',actualId));
 if (before.exists()) throw new Error('Approval published prematurely');
 await assertSucceeds(transitionSubmission(asDb(admin()),'reviewer',actualId,'published','اعتماد النشر النهائي'));
 const published = await getDoc(doc(guest(),'publishedOpportunities',actualId));
 if (!published.exists() || published.data().opportunity.title_ar !== fields.title) throw new Error('Published data mismatch');
 await assert.rejects(transitionSubmission(asDb(admin()),'reviewer',actualId,'published','duplicate publication'));
});

test('Owner-managed roles enable the full workflow without claims; revocation and verification are enforced', async () => {
 await env.withSecurityRulesDisabled(async context => {
   await setDoc(doc(context.firestore(),'administrators','reviewer'),{active:true});
 });
 const db = env.authenticatedContext('reviewer',{email_verified:true}).firestore();
 const unverified = env.authenticatedContext('reviewer',{email_verified:false}).firestore();
 await submit();
 await assertFails(getDoc(doc(unverified,'submissions',id)));
 await assertSucceeds(getDoc(doc(db,'administrators','reviewer')));
 await assertFails(getDocs(collection(db,'administrators')));
 await assertFails(getDoc(doc(visitor(),'administrators','reviewer')));
 await assertFails(setDoc(doc(visitor(),'administrators','visitor'),{active:true}));
 await assertFails(updateDoc(doc(db,'administrators','reviewer'),{active:false}));
 await assertFails(deleteDoc(doc(db,'administrators','reviewer')));
 const { transitionSubmission } = await import('../../src/lib/moderationStore');
 const asDb = db as unknown as import('firebase/firestore').Firestore;
 await assertSucceeds(transitionSubmission(asDb,'reviewer',id,'approved','تم فحص المصدر'));
 assert.equal((await getDoc(doc(guest(),'publishedOpportunities',id))).exists(),false);
 await assertSucceeds(transitionSubmission(asDb,'reviewer',id,'published','اعتماد النشر النهائي'));
 await assertSucceeds(getDoc(doc(guest(),'publishedOpportunities',id)));
 await env.withSecurityRulesDisabled(async context => {
   await updateDoc(doc(context.firestore(),'administrators','reviewer'),{active:false});
 });
 await assertFails(getDocs(collection(db,'submissions')));
});
