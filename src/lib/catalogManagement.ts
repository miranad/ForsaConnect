import type { Opportunity } from '../types';
import { asOfficialUrl } from './catalog';

export interface CatalogEdit { opportunity: Opportunity; visible: boolean }
export const contentFields = [
  ['title_ar', 'عنوان الفرصة', 6, 200], ['organization', 'الجهة المنظمة', 3, 200],
  ['category', 'الفئة', 1, 80], ['location', 'المكان', 1, 200],
  ['description_ar', 'الوصف', 15, 5000], ['eligibility_ar', 'شروط الأهلية', 1, 2000],
  ['event_date', 'موعد النشاط', 1, 200], ['application_deadline', 'آخر أجل للتقديم', 1, 200],
  ['cost_ar', 'التكاليف والدعم', 1, 500], ['application_method_ar', 'طريقة التقديم', 1, 500],
  ['verification_status', 'حالة التحقق', 1, 200], ['source_url', 'الرابط الرسمي', 1, 2000],
] as const;

// Copy public fields only; exclude review notes and user identities.
export function sanitizeCatalogEdit(value: Opportunity): Opportunity {
  if (!/^FC-(?:\d{3}|PROP-[a-f0-9]{64})$/.test(value.id)) throw new Error('معرف الفرصة غير صالح.');
  const result = { id: value.id, scope: value.scope, verified_on: value.verified_on } as Opportunity;
  for (const [key, label, min, max] of contentFields) {
    const text = value[key];
    if (typeof text !== 'string' || text.trim().length < min || text.length > max) throw new Error(`راجع حقل ${label} وطول النص.`);
    result[key] = text.trim();
  }
  if (!['داخل المغرب', 'خارج المغرب', 'عن بعد'].includes(result.scope)) throw new Error('اختر نطاقاً صالحاً.');
  const url = asOfficialUrl(result.source_url);
  if (!url || new URL(url).username || new URL(url).password) throw new Error('استخدم رابط HTTPS دون بيانات تسجيل دخول.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result.verified_on)) throw new Error('تاريخ التحقق غير صالح.');
  if (value.notes_ar) {
    if (typeof value.notes_ar !== 'string' || value.notes_ar.length > 2000) throw new Error('ملاحظات الإعلان طويلة جداً.');
    result.notes_ar = value.notes_ar;
  }
  if (typeof value.isCustom === 'boolean') result.isCustom = value.isCustom;
  if (value.adminStatus) result.adminStatus = value.adminStatus;
  return result;
}

export function mergeCatalog(base: Opportunity[], edits: CatalogEdit[], includeHidden = false): Opportunity[] {
  const items = new Map(base.map(item => [item.id, item]));
  for (const edit of edits) {
    if (edit.visible || includeHidden) items.set(edit.opportunity.id, edit.opportunity);
    else items.delete(edit.opportunity.id);
  }
  return [...items.values()];
}
