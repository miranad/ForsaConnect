import React, { useMemo, useState } from 'react';
import type { Opportunity } from '../types';
import { contentFields, mergeCatalog, type CatalogEdit } from '../lib/catalogManagement';
import { saveCatalogEdit } from '../lib/submissions';
import { deadlinePassed } from '../lib/deadlines';

const inputClass = 'w-full min-w-0 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#15344F]';
const buttonClass = 'px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 disabled:opacity-50';

export function CatalogManager({ catalog, edits }: { catalog: Opportunity[]; edits: CatalogEdit[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [visible, setVisible] = useState(true);
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const items = useMemo(() => mergeCatalog(catalog, edits, true), [catalog, edits]);
  const visibility = new Map(edits.map(edit => [edit.opportunity.id, edit.visible]));
  const results = items.filter(item => `${item.title_ar} ${item.organization} ${item.id}`.toLowerCase().includes(query.trim().toLowerCase()));
  function select(item: Opportunity) { setSelected({ ...item }); setVisible(visibility.get(item.id) !== false); setChecked(false); setMessage(''); }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || busy || !checked) return;
    setBusy(true); setMessage('');
    try {
      await saveCatalogEdit({ ...selected, verified_on: new Date().toISOString().slice(0, 10) }, visible);
      setSelected(null); setChecked(false); setMessage('تم حفظ الإعلان وحالة ظهوره في الدليل.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'تعذر حفظ الإعلان. حاول مجدداً.'); }
    finally { setBusy(false); }
  }
  return <section className="space-y-5 border-t border-slate-300 dark:border-slate-600 pt-8">
    <h2 className="text-2xl font-bold">إدارة محتوى دليل الفرص</h2>
    <p>عدّل الفرص الأصلية والجديدة أو أخفها من الدليل مع الاحتفاظ بسجلاتها. التعديل على إعلان منشور يظهر بعد الحفظ. الفرص ذات الأجل المنتهي تبقى مخفية حتى تصحيح الأجل.</p>
    {message && <p role="status" className="p-3 rounded-xl bg-amber-50 text-amber-900">{message}</p>}
    {selected ? <form onSubmit={save} className="min-w-0 space-y-4 p-4 sm:p-6 rounded-2xl border border-slate-300 dark:border-slate-600">
      <p className="text-xs break-all" dir="ltr">{selected.id}</p>
      {contentFields.map(([key, label, min, max]) => <label key={key} className="block space-y-1"><span>{label}</span>
        {key === 'description_ar' || key === 'eligibility_ar' ? <textarea className={inputClass} rows={4} minLength={min} maxLength={max} required value={selected[key]} onChange={e => { setSelected({ ...selected, [key]: e.target.value }); setChecked(false); }} /> :
          <input className={inputClass} type={key === 'source_url' ? 'url' : 'text'} minLength={min} maxLength={max} required value={selected[key]} onChange={e => { setSelected({ ...selected, [key]: e.target.value }); setChecked(false); }} />}
      </label>)}
      <label className="block space-y-1"><span>النطاق</span><select className={inputClass} value={selected.scope} onChange={e => { setSelected({ ...selected, scope: e.target.value as Opportunity['scope'] }); setChecked(false); }}>{['داخل المغرب', 'خارج المغرب', 'عن بعد'].map(scope => <option key={scope}>{scope}</option>)}</select></label>
      <label className="block space-y-1"><span>ملاحظات عامة للإعلان</span><textarea className={inputClass} maxLength={2000} rows={3} value={selected.notes_ar ?? ''} onChange={e => { setSelected({ ...selected, notes_ar: e.target.value }); setChecked(false); }} /></label>
      <label className="flex items-start gap-2"><input type="checkbox" checked={visible} onChange={e => { setVisible(e.target.checked); setChecked(false); }} /><span>إظهار الإعلان في الدليل</span></label>
      <label className="flex items-start gap-2"><input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} /><span>راجعت التعديلات والمصدر الرسمي وأوافق على تحديث الإعلان وحالة ظهوره.</span></label>
      <div className="flex flex-wrap gap-3"><button type="submit" className={buttonClass + ' bg-[#1667A5] text-white'} disabled={busy || !checked}>{busy ? 'جارٍ الحفظ…' : 'حفظ الإعلان وحالة الظهور'}</button><button type="button" className={buttonClass} disabled={busy} onClick={() => setSelected(null)}>إلغاء التعديل</button></div>
    </form> : <>
      <label className="block space-y-1"><span>بحث في إدارة المحتوى</span><input className={inputClass} value={query} onChange={e => setQuery(e.target.value)} /></label>
      <p className="text-sm">{results.length} إعلان مطابق. تعرض القائمة أول 100 نتيجة؛ استخدم البحث للوصول إلى إعلان محدد.</p>
      {results.slice(0, 100).map(item => <article key={item.id} className="flex flex-wrap gap-3 items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-600">
        <div className="min-w-0 flex-1"><h3 className="font-bold break-words">{item.title_ar}</h3><p className="text-sm break-words">{item.organization} · {visibility.get(item.id) === false ? 'مخفي بقرار المشرف' : deadlinePassed(item.application_deadline) ? 'مخفي لانتهاء الأجل' : 'ظاهر في الدليل'}</p><p className="text-xs break-all">{item.id}</p></div>
        <button type="button" className={buttonClass} onClick={() => select(item)}>تعديل وإدارة الظهور</button>
      </article>)}
    </>}
  </section>;
}
