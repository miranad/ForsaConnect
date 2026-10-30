import React, { useState } from 'react';
import { ShieldCheck, Check, X, Trash2, Edit3, Database, KeyRound, Lock, AlertCircle, FileCode, CheckCircle2, RefreshCw } from 'lucide-react';
import { SubmissionDraft, Opportunity } from '../types';

interface AdminSimulatorSectionProps {
  drafts: SubmissionDraft[];
  onApprove: (draft: SubmissionDraft) => void;
  onReject: (id: string, reason: string) => void;
  onDelete: (id: string) => void;
  customApprovedCount: number;
}

export const AdminSimulatorSection: React.FC<AdminSimulatorSectionProps> = ({
  drafts,
  onApprove,
  onReject,
  onDelete,
  customApprovedCount,
}) => {
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'pending' | 'architecture' | 'checklist'>('pending');

  const handleRejectClick = (id: string) => {
    const reason = rejectReason[id] || 'المعلومات غير مكتملة أو الرابط الرسمي غير موثق';
    onReject(id, reason);
  };

  return (
    <section id="admin" className="py-16 sm:py-24 bg-[#0A1D30] text-white border-t border-[#23486A] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5]/30 text-sky-300 border border-sky-400/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>لوحة الإشراف والمراجعة · بيئة المعاينة التجريبية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white leading-tight">
            إدارة الفرص ومسار الاعتماد الإداري
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            محاكاة تفاعلية للتحكم في الاقتراحات والموافقة عليها قبل نشرها في دليل الفرص العام، مع استعراض معماري لمتطلبات نشر Firebase Firestore الآمن.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#23486A] pb-3 flex-wrap">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'pending'
                ? 'bg-[#1667A5] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            الطلبات المعلقة ({drafts.length})
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'architecture'
                ? 'bg-[#1667A5] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            المعمارية الأمنية (Firebase Rules)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'checklist'
                ? 'bg-[#1667A5] text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            قائمة التحقق قبل النشر النهائي
          </button>
        </div>

        {/* Tab 1: Pending Submissions Queue */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#15344F] p-4 rounded-2xl border border-[#23486A] text-sm">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>حالة قائمة الانتظار: <b>{drafts.length} مقترح بانتظار الاعتماد</b></span>
              </div>
              <div className="text-xs text-slate-300">
                فرص معتمدة محلياً تم إضافتها للدليل: <b className="text-emerald-400">{customApprovedCount}</b>
              </div>
            </div>

            {drafts.length === 0 ? (
              <div className="bg-[#12283E] rounded-3xl p-12 text-center border border-[#23486A]/60 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold font-heading text-white">لا توجد طلبات معلقة للمراجعة حالياً</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  يمكنك التوجه إلى قسم «شارك فرصة» وإرسال اقتراح جديد، ليظهر فوراً هنا في قائمة انتظار المشرفين لاختبار مسار القبول والنشر.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="bg-[#12283E] rounded-2xl border border-[#23486A] p-6 text-right space-y-4 hover:border-sky-400/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800">
                            {draft.id}
                          </span>
                          <span className="text-xs bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-full font-semibold">
                            {draft.category}
                          </span>
                          <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold">
                            {draft.scope}
                          </span>
                          <span className="text-xs text-slate-400">
                            تاريخ الاقتراح: {draft.createdAt}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold font-heading text-white">
                          {draft.title}
                        </h4>
                        <p className="text-sm text-sky-200 font-semibold mt-1">
                          الجهة: {draft.organizer} · المكان: {draft.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onApprove(draft)}
                          className="inline-flex items-center gap-1.5 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
                        >
                          <Check className="w-4 h-4" />
                          <span>اعتماد ونشر في الدليل</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(draft.id)}
                          className="p-2 rounded-xl text-rose-400 hover:text-white hover:bg-rose-950/60 transition-colors"
                          title="حذف الاقتراح"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-[#0A1D30] rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed border border-[#23486A]">
                      <p className="font-semibold text-slate-300 mb-1">الوصف والشروط:</p>
                      <p>{draft.description}</p>
                      <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
                        <span><b>الأهلية:</b> {draft.eligibility}</span>
                        <span><b>التكاليف:</b> {draft.cost}</span>
                        <span><b>آخر أجل:</b> {draft.deadline}</span>
                        {draft.url && (
                          <a
                            href={draft.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sky-400 hover:underline"
                          >
                            <span>فحص الرابط الأصلي</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Rejection input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="سبب الرفض (اختياري، مثلاً: الرابط غير شغال أو الفرصة منتهية)"
                        value={rejectReason[draft.id] || ''}
                        onChange={(e) => setRejectReason({ ...rejectReason, [draft.id]: e.target.value })}
                        className="flex-1 bg-[#0A1D30] border border-[#23486A] rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleRejectClick(draft.id)}
                        className="inline-flex items-center gap-1 bg-rose-600/80 hover:bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>رفض المقترح</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Firebase Security Architecture */}
        {activeTab === 'architecture' && (
          <div className="bg-[#12283E] rounded-3xl p-6 sm:p-8 border border-[#23486A] space-y-6">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  معمارية الأمان وقواعد Firestore المتوافقة مع متطلبات المنصة
                </h3>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  يمنع نهائياً استخدام كلمات مرور في كود العميل (Client-side password) لإتاحة لوحة الإدارة. 
                  النموذج المعتمد يعتمد التحقق من الرموز المميزة (Custom Claims) ومصادقة Google Sign-In.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-[#0A1D30] rounded-2xl border border-[#23486A] space-y-2">
                <span className="font-bold text-emerald-300 block">1. قراءة الفرص العامة (Public Read):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  الزوار والشباب يمكنهم قراءة السجلات التي تم اعتمادها فقط (status == 'approved'). لا يمكن لأي مستخدم عام استعراض السجلات المعلقة أو المرفوضة.
                </p>
              </div>

              <div className="p-4 bg-[#0A1D30] rounded-2xl border border-[#23486A] space-y-2">
                <span className="font-bold text-sky-300 block">2. إرسال الاقتراحات (Public Submission):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  يمكن للجمهور إنشاء مستندات جديدة في مجموعة submissions بحالة status == 'pending' فقط، وتُرفض أي محاولة لإنشاء سجل مباشر بحالة 'approved'.
                </p>
              </div>

              <div className="p-4 bg-[#0A1D30] rounded-2xl border border-[#23486A] space-y-2">
                <span className="font-bold text-amber-300 block">3. صلاحيات الإدارة (Protected Admin Role):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  تعديل السجلات، النشر، وتغيير الحالات محصور بالمستخدمين الذين يحملون شارة request.auth.token.admin == true الصادرة عن الخادم المصادق.
                </p>
              </div>

              <div className="p-4 bg-[#0A1D30] rounded-2xl border border-[#23486A] space-y-2">
                <span className="font-bold text-indigo-300 block">4. التكلفة التقديرية (Firebase Spark Plan):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  الخطة المجانية تتيح 50,000 قراءة و20,000 كتابة يومياً، وهي كافية تماماً لمنصة ForsaConnect دون أي تكاليف سحابية إضافية (0.00$).
                </p>
              </div>
            </div>

            {/* Firestore Rules Code Preview */}
            <div className="bg-[#051320] p-4 sm:p-5 rounded-2xl border border-[#23486A] text-left font-mono text-xs text-sky-300 overflow-x-auto" dir="ltr">
              <div className="text-slate-500 mb-2">// firestore.rules specification for Phase 2</div>
              <pre>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Opportunities collection (Public read for approved records)
    match /opportunities/{oppId} {
      allow read: if resource.data.status == 'approved' || (request.auth != null && request.auth.token.admin == true);
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Community submissions collection
    match /submissions/{subId} {
      allow create: if request.resource.data.status == 'pending'
                    && request.resource.data.title is string
                    && request.resource.data.title.size() >= 6
                    && request.resource.data.source_url.matches('https://.*');
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}`}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Pre-Deployment Checklist */}
        {activeTab === 'checklist' && (
          <div className="bg-[#12283E] rounded-3xl p-6 sm:p-8 border border-[#23486A] space-y-5">
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>قائمة التحقق المعتمدة قبل الانتقال للمرحلة السحابية</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 bg-[#0A1D30] rounded-xl border border-[#23486A]">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">1. جرد الـ 25 فرصة الأصلية:</strong>
                  <span className="text-slate-300">تم استيرادها بالكامل بنسب النطاقات الصحيحة (17 داخل المغرب، 3 دولية، 5 عن بعد).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0A1D30] rounded-xl border border-[#23486A]">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">2. فحص الروابط والأمان:</strong>
                  <span className="text-slate-300">جميع الروابط موثوقة وتبدأ بـ https:// وتفتح بأمان في نافذة جديدة rel="noopener noreferrer".</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0A1D30] rounded-xl border border-[#23486A]">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">3. الشفافية بشأن تاريخ التحقق:</strong>
                  <span className="text-slate-300">تم تثبيت تنبيه تاريخ المراجعة 29 أكتوبر 2026 دون ادعاء فتح التسجيل حالياً بلا فحص مستقل.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0A1D30] rounded-xl border border-[#23486A]">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">4. حماية بيانات القاصرين والخصوصية:</strong>
                  <span className="text-slate-300">عدم طلب بطاقة وطنية أو بيانات شخصية للشباب؛ التقديم يتم مباشرة في منصات المنظمين.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#0A1D30] rounded-xl border border-[#23486A]">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">5. عدم تفعيل مصادر سحابية مدفوعة:</strong>
                  <span className="text-slate-300">التطبيق يعمل حالياً في وضع المعاينة المتكاملة وبانتظار مصادقة المستخدم للانتقال إلى المرحلة التالية.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
