import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deadlinePassed } from '../src/lib/deadlines';

test('date-only deadlines close at Morocco midnight, including seasonal clock changes', () => {
  assert.equal(deadlinePassed('2026-06-30', new Date('2026-06-30T22:59:59Z')), false);
  assert.equal(deadlinePassed('2026-06-30', new Date('2026-06-30T23:00:00Z')), true);
  assert.equal(deadlinePassed('2026-02-20', new Date('2026-02-20T23:30:00Z')), false);
  assert.equal(deadlinePassed('2026-02-20', new Date('2026-02-21T00:00:00Z')), true);
});

test('explicit timezone deadlines use their exact cutoff', () => {
  assert.equal(deadlinePassed('2026-10-31T14:00+01:00', new Date('2026-10-31T12:59:59Z')), false);
  assert.equal(deadlinePassed('2026-10-31T14:00+01:00', new Date('2026-10-31T13:00:00Z')), true);
});

test('uncertain deadlines and invalid dates require review instead of guessed expiry', () => {
  const now = new Date('2027-01-01T12:00:00Z');
  for (const value of ['غير محدد', '2026-10-31 (ساعة البوابة 00:49؛ يرجى التحقق من المنطقة الزمنية)', '2026-02-30', '2026-02-30T12:00Z', '31/10/2026', '2026-10-31T14:00']) {
    assert.equal(deadlinePassed(value, now), false, value);
  }
  assert.equal(deadlinePassed('2026-10-31 (بحسب المنصة)', now), true);
});
