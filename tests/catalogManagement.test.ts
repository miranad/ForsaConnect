import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mergeCatalog, sanitizeCatalogEdit } from '../src/lib/catalogManagement';
import type { Opportunity } from '../src/types';
const original = JSON.parse(readFileSync('src/data/opportunities.json', 'utf8')) as Opportunity[];

test('Every original record can be managed without changing the bundled catalog', () => {
  const before = JSON.stringify(original);
  for (const item of original) assert.equal(sanitizeCatalogEdit(item).id, item.id);
  const changed = { ...original[0], title_ar: 'عنوان بعد مراجعة المشرف' };
  assert.equal(mergeCatalog(original, [{ opportunity: changed, visible: true }])[0].title_ar, changed.title_ar);
  assert.equal(mergeCatalog(original, [{ opportunity: changed, visible: false }]).length, 24);
  assert.equal(mergeCatalog(original, [{ opportunity: changed, visible: false }], true).length, 25);
  assert.equal(mergeCatalog(original, [{ opportunity: original[0], visible: true }]).length, 25);
  assert.equal(JSON.stringify(original), before);
});

test('Public edits strip private fields and reject unsafe links, oversized data and invalid identities', () => {
  const safe = sanitizeCatalogEdit({ ...original[0], submittedBy: 'private', adminNotes: 'private' } as Opportunity);
  assert.equal('submittedBy' in safe, false); assert.equal('adminNotes' in safe, false);
  for (const patch of [{ source_url: 'javascript:alert(1)' }, { source_url: 'https://user:secret@example.org' }, { description_ar: 'a'.repeat(5001) }, { id: 'administrators' }]) {
    assert.throws(() => sanitizeCatalogEdit({ ...original[0], ...patch }));
  }
});
