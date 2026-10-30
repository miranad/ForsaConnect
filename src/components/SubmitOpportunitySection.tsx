import React, { useState } from 'react';
import { PlusCircle, ShieldCheck, CheckCircle2, AlertTriangle, Trash2, ArrowRight, ExternalLink, Info, Lock } from 'lucide-react';
import { ScopeType, SubmissionDraft } from '../types';
import { asOfficialUrl } from '../lib/catalog';

interface SubmitOpportunitySectionProps {
  drafts: SubmissionDraft[];
  onAddDraft: (draft: SubmissionDraft) => void;
  onDeleteDraft: (id: string) => void;
  onSimulateApprove?: (draft: SubmissionDraft) => void;
}

export const SubmitOpportunitySection: React.FC<SubmitOpportunitySectionProps> = ({
  drafts,
  onAddDraft,
  onDeleteDraft,
  onSimulateApprove,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('تطوع');
  const [scope, setScope] = useState<ScopeType>('داخل المغرب');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [cost, setCost] = useState('مجاني بالكامل');
  const [confirmed, setConfirmed] = useState(false);

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (title.trim().length < 6) {
      setMessage({ text: 'يرجى كتابة عنوان واضح من 6 أحرف على الأقل.', type: 'error' });
      return;
    }
    if (organizer.trim().length < 3) {
      setMessage({ text: 'يرجى ذكر اسم الجهة المنظمة للفرصة (3 أحرف على الأقل).', type: 'error' });
      return;
    }
    if (description.trim().length < 15) {
      setMessage({ text: 'يرجى كتابة وصف تفصيلي للفرصة لا يقل عن 15 حرفاً.', type: 'error' });
      return;
    }
    if (url.trim() && !asOfficialUrl(url.trim())) {
      setMessage({ text: 'الرابط الرسمي يجب أن يكون عنوان ويب صالحاً ويبدأ بـ https://', type: 'error' });
      return;
    }
    if (!confirmed) {
      setMessage({ text: 'يرجى تأكيد صحة المعلومات وخلوها من البيانات الشخصية الحساسة.', type: 'error' });
      return;
    }

    const newDraft: SubmissionDraft = {
      id: 'FC-PROP-' + Math.floor(1000 + Math.random() * 9000),
      title: title.trim(),
      category,
      scope,
      organizer: organizer.trim(),
      location: location.trim() || (scope === 'عن بعد' ? 'عن بُعد عبر الإنترنت' : 'المغرب'),
      deadline: deadline.trim() || 'غير محدد',
      url: url.trim(),
      description: description.trim(),
      eligibility: eligibility.trim() || 'مفتوح للشباب',
      cost: cost.trim() || 'مجاني',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    onAddDraft(newDraft);

    setMessage({
      text: 'تم حفظ الاقتراح بنجاح كمسودة محلية برقم (' + newDraft.id + '). يمكنك مراجعته أو اختباره في لوحة الإشراف!',
      type: 'success',
    });

    // Reset Form
    setTitle('');
    setOrganizer('');
    setLocation('');
    setDeadline('');
    setUrl('');
    setDescription('');
    setEligibility('');
    setCost('مجاني بالكامل');
    setConfirmed(false);
  };

  return (
    <section id="submit" className="py-16 sm:py-24 bg-white dark:bg-[#0A1D30] text-right border-t border-slate-200 dark:border-[#23486A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#259A6A]/10 text-[#259A6A] dark:text-emerald-300 border border-[#259A6A]/20 mb-3">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>مشاركة المجتمع والجمعيات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#0F2840] dark:text-white leading-tight">
            اقترح فرصة مفيدة للشباب
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            تعرف جمعية أو معهدًا أو مبادرة تنظم تدريباً، ورشة، أو برنامج تطوع؟ شاركنا معلوماتها للمساهمة في إيصالها إلى الشباب المغاربة في كافة المدن.
          </p>
        </div>

        {/* Notice Banner: Simulation Notice */}
        <div className="mb-10 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-4 shadow-sm">
          <Info className="w-6 h-6 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="text-sm space-y-1">
            <p className="font-bold">
              توضيح مهم حول مرحلة المعاينة التجريبية (Preview Phase):
            </p>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              هذا النموذج يحفظ اقتراحاتك في التخزين المحلي لمتصفحك فقط، ويتيح لك محاكاة مسار المراجعة والاعتماد في تبويب «لوحة الإشراف». 
              في المرحلة القادمة، سيتم ربط قاعدة بيانات <span className="font-bold underline">Firebase Firestore</span> والمصادقة الآمنة لحفظ الاقتراحات ومراجعتها رسميًا من قبل مشرفي المنصة دون نشر أي رابط غير موثق.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Form on Left, Review Flow & Drafts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F5F8FC] dark:bg-[#15344F] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#23486A] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#259A6A]" />
              <span>استمارة اقتراح فرصة</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  عنوان الفرصة <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: ورشة صناعة المحتوى الرقمي والإعلامي"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    الفئة <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  >
                    <option value="تطوع">تطوع</option>
                    <option value="ورشة">ورشة</option>
                    <option value="تكوين">تكوين</option>
                    <option value="أنشطة وفعاليات">أنشطة وفعاليات</option>
                    <option value="منح">منح ودعم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    النطاق الجغرافي <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value as ScopeType)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  >
                    <option value="داخل المغرب">داخل المغرب 🇲🇦</option>
                    <option value="خارج المغرب">خارج المغرب 🌍</option>
                    <option value="عن بعد">عن بعد 💻</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    الجهة المنظمة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="مثال: جمعية الشباب المبدع / معهد جوته"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    المدينة أو المكان
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="مثال: الدار البيضاء، أو عن بعد"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    آخر أجل للتقديم (إن وُجد)
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="مثال: 15 نوفمبر 2026 أو مستمر"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    التكاليف والدعم
                  </label>
                  <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="مثال: مجاني بالكامل / دعم السفر متوفر"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  الرابط الرسمي للإعلان أو التسجيل <span className="text-slate-400 font-normal">(يجب أن يبدأ بـ https://)</span>
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.org/opportunity"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5] font-mono text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  شروط الأهلية والسن
                </label>
                <input
                  type="text"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  placeholder="مثال: من 16 إلى 28 سنة؛ للشباب المقيمين بالمغرب"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  الوصف الكامل للفرصة <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب نبذة واضحة عن البرنامج، الفائدة المرجوة، والمهام المطلوبة من المشارك..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                />
              </div>

              {/* Safety & Anti-Spam Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#259A6A] focus:ring-[#259A6A]"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                    أؤكد أن المعلومات صحيحة ومنقولة عن مصدر رسمي، وأني <b>لم أدرج أي بيانات شخصية أو حساسة تخص قاصرين</b>، وأوافق على إخضاع الاقتراح للمراجعة الإدارية قبل النشر.
                  </span>
                </label>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                    message.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
                  <span>{message.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#259A6A] hover:bg-[#1E7D56] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>حفظ الاقتراح كمسودة محلية</span>
              </button>
            </form>
          </div>

          {/* Review Lifecycle & Local Submissions List (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 5-Step Lifecycle Explanation (From V3 Spec & Screenshots) */}
            <div className="bg-[#0F2840] text-white p-6 sm:p-7 rounded-3xl border border-[#23486A] shadow-md">
              <h3 className="text-lg font-bold font-heading text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>مسار المراجعة والاعتماد (5 خطوات)</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                لضمان مصداقية المنصة وحماية الشباب من الإعلانات الوهمية، تمر جميع الاقتراحات بالمسار الآتي:
              </p>

              <ol className="space-y-3.5 text-xs">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1667A5] text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                  <div>
                    <strong className="text-slate-100 block">استلام الاقتراح:</strong>
                    <span className="text-slate-300">يُحفظ بحالة «قيد المراجعة» في قاعدة البيانات المشتركة.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1667A5] text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                  <div>
                    <strong className="text-slate-100 block">فحص آلي وفلترة:</strong>
                    <span className="text-slate-300">التحقق من اكتمال الحقول، بروتوكول https، ومنع تكرار الروابط.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1667A5] text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                  <div>
                    <strong className="text-slate-100 block">مراجعة بشرية من المشرف:</strong>
                    <span className="text-slate-300">فحص رسمي للجهة، موعد النشاط، شروط الأهلية، ومصدر الإعلان.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#259A6A] text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                  <div>
                    <strong className="text-emerald-300 block">اعتماد ونشر أو رفض معلل:</strong>
                    <span className="text-slate-300">يظهر السجل للجمهور فقط بعد ختم الاعتماد الإداري.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#1667A5] text-white font-bold flex items-center justify-center shrink-0 text-xs">5</span>
                  <div>
                    <strong className="text-slate-100 block">أرشفة تلقائية:</strong>
                    <span className="text-slate-300">تُنقل الفرصة إلى الأرشيف بمجرد انقضاء موعد التقديم.</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Local Drafts Card */}
            <div className="bg-[#F5F8FC] dark:bg-[#15344F] p-6 rounded-3xl border border-slate-200 dark:border-[#23486A]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold font-heading text-sm sm:text-base text-[#0F2840] dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#1667A5]" />
                  <span>مسوداتك في هذا المتصفح ({drafts.length})</span>
                </h4>
                {drafts.length > 0 && (
                  <span className="text-xs bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    مسودات محلية
                  </span>
                )}
              </div>

              {drafts.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <p>لا توجد مسودات محفوظة في هذا المتصفح حاليًا.</p>
                  <p className="mt-1">املأ النموذج على اليمين لتجربة إرسال فرصة جديدة.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {drafts.map((d) => (
                    <div
                      key={d.id}
                      className="p-3.5 bg-white dark:bg-[#0F2840] rounded-xl border border-slate-200/80 dark:border-[#23486A] text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-slate-800 dark:text-white font-bold truncate">
                          {d.title}
                        </strong>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {d.id}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                        <span>{d.organizer} · {d.category}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold">
                          قيد المراجعة
                        </span>
                      </div>
                      <div className="pt-1 flex items-center justify-between">
                        {onSimulateApprove && (
                          <button
                            type="button"
                            onClick={() => onSimulateApprove(d)}
                            className="text-[11px] font-bold text-[#259A6A] hover:underline"
                          >
                            اختبار الاعتماد الفوري في الدليل ←
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onDeleteDraft(d.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                          title="حذف المسودة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
