import React, { useState } from 'react';
import { PlusCircle, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ScopeType, SubmissionDraft } from '../types';
import { asOfficialUrl } from '../lib/catalog';
import { submitOpportunity } from '../lib/submissions';
import { firebaseConfigured } from '../lib/firebase';
import { SCOUT_ORGANIZATION } from './OrganizationIdentity';

export const SubmitOpportunitySection: React.FC = () => {
  const [sending, setSending] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    if (sending) return;
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
    if (!asOfficialUrl(url.trim())) {
      setMessage({ text: 'الرابط الرسمي يجب أن يكون عنوان ويب صالحاً ويبدأ بـ https://', type: 'error' });
      return;
    }
    if (!confirmed) {
      setMessage({ text: 'يرجى تأكيد صحة المعلومات وخلوها من البيانات الشخصية الحساسة.', type: 'error' });
      return;
    }

    const newDraft: SubmissionDraft = {
      id: 'FC-PROP-' + crypto.randomUUID(),
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

    setSending(true);
    try {
      const id = await submitOpportunity(newDraft);
      setMessage({ text: 'تم استلام الاقتراح للمراجعة. رقم التتبع: ' + id, type: 'success' });
    } catch {
      setMessage({ text: 'تعذر إرسال الاقتراح. تحقق من الاتصال وإعداد الخدمة؛ قد يكون الرابط مقترحاً سابقاً. احتفظ بالمعلومات وحاول لاحقاً.', type: 'error' });
      return;
    } finally {
      setSending(false);
    }

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

        <div role="status" className="mb-10 p-5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-sm">
          {firebaseConfigured ? 'تُرسل الاقتراحات إلى فريق المراجعة ولا تُنشر تلقائياً. لا تُدرج بيانات شخصية أو حساسة.' : 'استقبال الاقتراحات غير متاح حالياً. يمكنك تصفح الدليل إلى حين تفعيل الخدمة.'}
        </div>

        {/* 2-Column Grid: Form on Left, Review Flow & Drafts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F5F8FC] dark:bg-[#15344F] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#23486A] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white mb-6 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#259A6A]" />
              <span>استمارة اقتراح فرصة</span>
            </h3>

            <button type="button" onClick={() => setOrganizer(SCOUT_ORGANIZATION)} className="mb-5 text-sm text-[#1667A5] dark:text-sky-300 font-bold underline">هذا نشاط لمنظمة الكشاف التطوعي — تعبئة اسم الجهة</button>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  عنوان الفرصة <span className="text-rose-500">*</span>
                </label>
                <input aria-label="عنوان الفرصة"
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
                  <select aria-label="الفئة"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  >
                    <option value="تطوع">تطوع</option>
                    <option value="ورشة">ورشة</option>
                    <option value="تكوين">تكوين</option>
                    <option value="أنشطة وفعاليات">أنشطة وفعاليات</option>
                    <option value="منح">منح ودعم</option>
                    <option value="زمالة">زمالة</option>
                    <option value="تدريب مهني">تدريب مهني</option>
                    <option value="دورة تعليمية">دورة تعليمية</option>
                    <option value="نشاط تنظيمي">نشاط تنظيمي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    النطاق الجغرافي <span className="text-rose-500">*</span>
                  </label>
                  <select aria-label="النطاق"
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
                  <input aria-label="الجهة المنظمة"
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
                  <input aria-label="المكان"
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
                  <input aria-label="آخر أجل للتقديم"
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
                  <input aria-label="التكلفة"
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
                  الرابط الرسمي للإعلان أو التسجيل <span className="text-rose-500">*</span> <span className="text-slate-400 font-normal">(يجب أن يبدأ بـ https://)</span>
                </label>
                <input aria-label="الرابط الرسمي"
                  type="url"
                  required
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
                <input aria-label="شروط الأهلية"
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
                <textarea aria-label="وصف الفرصة"
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
                  <input aria-label="تأكيد صحة المعلومات"
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
                disabled={sending || !firebaseConfigured}
                className="w-full bg-[#259A6A] hover:bg-[#1E7D56] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{sending ? 'جارٍ الإرسال…' : 'إرسال الاقتراح للمراجعة'}</span>
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
                    <span className="text-slate-300">التحقق من اكتمال الحقول وبروتوكول https، ومنع إعادة إرسال الرابط نفسه.</span>
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
                    <strong className="text-slate-100 block">متابعة الصلاحية:</strong>
                    <span className="text-slate-300">يراجع الفريق آجال التقديم؛ تأكد من صلاحية الإعلان لدى الجهة المنظمة.</span>
                  </div>
                </li>
              </ol>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};
