import React, { useEffect, useState } from 'react';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
import { Home, ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { auth, firebaseConfigured } from '../lib/firebase';
import { useAdmin } from '../hooks/useAdmin';
import { watchSubmissions, reviewSubmission } from '../lib/submissions';
import type { Submission, ReviewStatus } from '../lib/moderation';
import { asOfficialUrl } from '../lib/catalog';
import { hasAdminAccess } from '../lib/adminAccess';

const labels: Record<ReviewStatus, string> = { pending: 'قيد المراجعة', approved: 'معتمد ولم يُنشر', rejected: 'مرفوض', published: 'منشور' };
const fieldClass = 'w-full min-w-0 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#15344F]';
const buttonClass = 'px-4 py-3 rounded-xl bg-[#1667A5] text-white font-bold disabled:opacity-50';

function ReviewCard({ draft, busy, action }: { draft: Submission; busy: boolean; action: (id: string, target: ReviewStatus, notes: string) => Promise<void> }) {
  const [notes, setNotes] = useState(draft.adminNotes ?? '');
  const [checked, setChecked] = useState(false);
  const source = asOfficialUrl(draft.url);
  return <article className="min-w-0 p-5 sm:p-7 bg-white dark:bg-[#15344F] border border-slate-200 dark:border-[#23486A] rounded-3xl space-y-4">
    <div className="flex flex-wrap justify-between gap-3"><h2 className="font-heading font-bold text-xl break-words">{draft.title}</h2><span className="text-sm">{labels[draft.status]}</span></div>
    <p className="text-sm">{draft.organizer} · {draft.scope} · {draft.location} · {draft.category}</p>
    <p className="whitespace-pre-wrap break-words">{draft.description}</p>
    <p className="text-sm break-words">الأهلية: {draft.eligibility}</p>
    <p className="text-sm break-words">أجل التقديم: {draft.deadline} · التكلفة: {draft.cost}</p>
    {source && <a href={source} target="_blank" rel="noopener noreferrer" className="text-[#1667A5] dark:text-sky-300 underline break-all">مراجعة المصدر الرسمي: {source}</a>}
    <p className="text-xs break-all text-slate-500">{draft.id}</p>
    {draft.status !== 'published' && draft.status !== 'rejected' ? <>
      <label className="block space-y-2"><span>ملاحظات المراجعة (داخلية)</span><textarea className={fieldClass} value={notes} maxLength={2000} onChange={e => setNotes(e.target.value)} rows={3} /></label>
      <label className="flex items-start gap-2"><input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} /><span className="text-sm">راجعت المصدر والمعلومات والأهلية وآجال التقديم.</span></label>
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={busy || !checked || !notes.trim()} className={buttonClass} onClick={() => void action(draft.id, draft.status === 'pending' ? 'approved' : 'published', notes)}>{draft.status === 'pending' ? 'اعتماد للمراجعة النهائية' : 'نشر في دليل الفرص'}</button>
        <button type="button" disabled={busy || !notes.trim()} className={buttonClass + ' bg-rose-700'} onClick={() => void action(draft.id, 'rejected', notes)}>رفض مع ذكر السبب</button>
      </div>
    </> : <p className="text-sm whitespace-pre-wrap break-words">ملاحظات المراجعة: {draft.adminNotes}</p>}
  </article>;
}
export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();
  const { isAdmin, loading, logout } = useAdmin();
  const [drafts, setDrafts] = useState<Submission[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [filter, setFilter] = useState<ReviewStatus>('pending');
  useEffect(() => {
    let active = true;
    if (auth) void setPersistence(auth, browserSessionPersistence).then(() => {
      if (active) setAuthReady(true);
    }).catch(() => {
      if (active) setMessage('تعذر تهيئة جلسة الدخول. اسمح بتخزين بيانات الموقع ثم أعد تحميل الصفحة.');
    });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    setDrafts([]);
    if (!isAdmin) return;
    return watchSubmissions(filter, setDrafts, () => { setDrafts([]); setMessage('تعذر تحميل قائمة المراجعة. تحقق من الصلاحيات والاتصال.'); });
  }, [isAdmin, filter]);
  async function requireAdmin(user: User) {
    if (!await hasAdminAccess(user)) {
      if (auth) await signOut(auth);
      setMessage('تم التحقق من حسابك، لكنه غير مخول للإشراف. تواصل مع مسؤول المنصة لتفعيل الصلاحية.');
    }
  }
  async function googleLogin() {
    if (!auth || busy || !authReady) return;
    setBusy(true); setMessage('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      // Start the popup directly from the click; persistence is prepared above.
      const result = await signInWithPopup(auth, provider);
      await requireAdmin(result.user);
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === 'auth/popup-blocked') setMessage('اسمح بفتح نافذة تسجيل الدخول ثم اضغط على زر Google مجدداً.');
      else if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') setMessage('تعذر الدخول باستخدام Google. تحقق من الاتصال وإعداد الخدمة أو استخدم البريد وكلمة المرور.');
    } finally { setBusy(false); }
  }
  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!auth || busy || !authReady) return;
    setBusy(true); setMessage('');
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      await requireAdmin(result.user);
    } catch { setMessage('تعذر تسجيل الدخول. تحقق من البيانات والاتصال وصلاحية الحساب.'); }
    finally { setPassword(''); setBusy(false); }
  }
  async function action(id: string, target: ReviewStatus, notes: string) {
    if (busy) return;
    setBusy(true); setMessage('');
    try { await reviewSubmission(id, target, notes); setMessage('تم حفظ القرار بنجاح.'); }
    catch { setMessage('تعذر حفظ القرار. قد تكون الحالة أو الصلاحيات تغيرت. حدّث القائمة وحاول مجدداً.'); }
    finally { setBusy(false); }
  }
  return <div dir="rtl" className="py-8 sm:py-12 text-right"><div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
    <button type="button" onClick={() => navigate('home')} className="flex gap-2 items-center"><Home size={16} />الرئيسية</button>
    <h1 className="text-3xl font-heading font-bold flex gap-3 items-center"><ShieldCheck />لوحة الإشراف والمراجعة</h1>
    {message && <p role="status" className="p-4 rounded-xl border border-amber-300 bg-amber-50 text-amber-900">{message}</p>}
    {!firebaseConfigured ? <p className={fieldClass}>دخول المشرف غير متاح إلى حين تفعيل الخدمة.</p> : loading ? <p role="status">جارٍ التحقق من الجلسة…</p> : !isAdmin ?
      <form onSubmit={login} className="max-w-md space-y-5 p-6 bg-white dark:bg-[#0F2840] rounded-3xl border border-slate-200 dark:border-[#23486A]">
        <p>تسجيل دخول المشرفين المعتمدين فقط.</p>
        <button className={buttonClass + ' w-full'} type="button" disabled={busy || !authReady} onClick={() => void googleLogin()}>الدخول باستخدام Google</button>
        <p className="text-sm text-slate-600 dark:text-slate-300">استخدم حساب Google المعتمد لدى المنصة، أو سجّل الدخول بالبريد وكلمة المرور أدناه. تسجيل الدخول وحده لا يمنح صلاحية الإشراف.</p>
        <label className="block space-y-2"><span>البريد الإلكتروني</span><input dir="ltr" className={fieldClass} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="block space-y-2"><span>كلمة المرور</span><input dir="ltr" className={fieldClass} type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
        <button className={buttonClass} type="submit" disabled={busy || !authReady}>{busy ? 'جارٍ التحقق…' : 'تسجيل الدخول'}</button>
      </form> : <>
        <div className="flex flex-wrap gap-3 items-center justify-between"><p>الاعتماد يسبق النشر. ملاحظات المراجعة لا تظهر للزوار.</p><button type="button" className={buttonClass} onClick={() => { void logout().catch(() => setMessage('تعذر تسجيل الخروج. حاول مجدداً.')); }}>تسجيل الخروج</button></div>
        <label className="block max-w-sm space-y-2"><span>حالة الاقتراحات</span><select className={fieldClass} value={filter} onChange={e => setFilter(e.target.value as ReviewStatus)}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <p className="text-sm">تعرض القائمة حتى 200 اقتراح. اختر الحالة لمتابعة المراجعة.</p>
        {drafts.filter(d => d.status === filter).map(d => <ReviewCard key={d.id + d.status} draft={d} busy={busy} action={action} />)}
        {!drafts.some(d => d.status === filter) && <p role="status">لا توجد اقتراحات في هذه الحالة.</p>}
      </>}
  </div></div>;
};
