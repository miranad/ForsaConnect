import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterOpportunities } from '../src/lib/catalog';
import type { Opportunity, ScopeType } from '../src/types';

function make(id: string, scope: ScopeType, location: string): Opportunity {
  return {
    id, scope, location,
    title_ar: `فرصة ${id}`, category: 'تطوع', organization: 'جهة اختبار',
    description_ar: 'تفاصيل اختبار', eligibility_ar: 'للشباب',
    event_date: '', application_deadline: '', cost_ar: '',
    application_method_ar: '', verification_status: 'بحاجة إلى تحقق',
    source_url: 'https://example.org', verified_on: '2026-10-29'
  };
}

const items = [
  make('casa', 'داخل المغرب', 'الدار البيضاء'),
  make('rabat', 'داخل المغرب', 'الرباط'),
  make('cyprus', 'خارج المغرب', 'قبرص'),
  make('online', 'عن بعد', 'عبر الإنترنت')
];

test('Moroccan city filter excludes international and remote opportunities', () => {
  const result = filterOpportunities(items, {city: 'الدار البيضاء'});
  assert.deepEqual(result.map(o => o.id), ['casa']);
});

test('International and remote filters remain independent', () => {
  assert.deepEqual(
    filterOpportunities(items, {city: 'خارج المغرب'}).map(o => o.id),
    ['cyprus']
  );
  assert.deepEqual(
    filterOpportunities(items, {city: 'عن بعد'}).map(o => o.id),
    ['online']
  );
});

test('Combined scope and city filters return only intersections', () => {
  assert.deepEqual(
    filterOpportunities(items, {scope: 'عن بعد', city: 'الدار البيضاء'}),
    []
  );
  assert.deepEqual(
    filterOpportunities(items, {scope: 'داخل المغرب', city: 'الدار البيضاء'}).map(o => o.id),
    ['casa']
  );
});
