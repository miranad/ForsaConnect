import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { canTransition, toOpportunity, validateSubmission, type Submission } from '../src/lib/moderation';
import type { SubmissionDraft } from '../src/types';
const draft: SubmissionDraft = {
 id: 'test', title: 'ورشة تدريب للشباب', organizer: 'جمعية الاختبار',
 category: 'تكوين', scope: 'داخل المغرب', location: 'الرباط', deadline: '2026-12-01',
 description: 'ورشة تدريب عملية مفتوحة للشباب بالمغرب', eligibility: 'الشباب',
 cost: 'مجاني', url: 'https://example.org/training', createdAt: '2026-10-30', status: 'pending',
};
test('Only reviewed submissions can reach publication; terminal states cannot change', () => {
 assert.equal(canTransition('pending', 'published'), false);
 assert.equal(canTransition('pending', 'approved'), true);
 assert.equal(canTransition('approved', 'published'), true);
 assert.equal(canTransition('approved', 'rejected'), true);
 for (const state of ['published', 'rejected'] as const) {
   for (const target of ['pending', 'approved', 'rejected', 'published'] as const) assert.equal(canTransition(state, target), false);
 }
});
test('Submission validation rejects unsafe links, unsupported scopes and oversized fields', () => {
 assert.doesNotThrow(() => validateSubmission(draft));
 for (const url of ['http://example.org', 'javascript:alert(1)', 'https://name:secret@example.org']) {
   assert.throws(() => validateSubmission({ ...draft, url }));
 }
 assert.throws(() => validateSubmission({ ...draft, description: 'x'.repeat(5001) }));
 assert.throws(() => validateSubmission({ ...draft, title: '  ' }));
 assert.throws(() => validateSubmission({ ...draft, scope: 'other' as any }));
});
test('Public projection excludes private submission identity and review notes', () => {
 const submission: Submission = { ...draft, submittedBy: 'private-uid', adminNotes: 'private notes', status: 'approved' };
 const publicRecord = toOpportunity(submission, '2026-10-30');
 assert.equal(publicRecord.title_ar, draft.title);
 assert.equal(publicRecord.source_url, draft.url);
 assert.equal(publicRecord.verification_status, 'بحاجة إلى تحقق');
 assert.equal(JSON.stringify(publicRecord).includes('private'), false);
});
test('All 25 original records remain present with unique IDs and original scope counts', () => {
 const records = JSON.parse(readFileSync(new URL('../src/data/opportunities.json', import.meta.url), 'utf8'));
 assert.equal(records.length, 25);
 assert.equal(new Set(records.map((d: any) => d.id)).size, 25);
 assert.equal(records.filter((d: any) => d.scope === 'داخل المغرب').length, 17);
 assert.equal(records.filter((d: any) => d.scope === 'خارج المغرب').length, 3);
 assert.equal(records.filter((d: any) => d.scope === 'عن بعد').length, 5);
});
