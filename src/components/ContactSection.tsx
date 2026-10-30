import React, { useState } from 'react';
import { Mail, Building2, Send, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-[#0A1D30] text-right border-t border-slate-200 dark:border-[#23486A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 border border-[#1667A5]/20 mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>الشركاء وبناء الجسور</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#0F2840] dark:text-white leading-tight">
                تواصل وشراكات
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                إذا كنت تمثل جمعية شبابية، معهدًا ثقافيًا، أو مبادرة تطوعية في المغرب ترغب في إيصال أنشطتها إلى الشباب المهتمين، يسعدنا التعاون معكم.
              </p>
            </div>

            {/* Anti-Hallucination Integrity Notice */}
            <div className="p-5 rounded-2xl bg-[#F5F8FC] dark:bg-[#15344F] border border-slate-200 dark:border-[#23486A] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#1667A5] dark:text-sky-300 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>إشعار الشفافية بشأن الشركاء والتواصل:</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                لم نعتمد بعد شركاء رسميين متعاقدين، ولذلك <b>لم نضع شعارات أو عناوين وهمية</b> في هذا الموقع. المنصة مبادرة مجتمعية غير ربحية مفتوحة لكل الجمعيات المعترف بها.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                الخدمة مجانية 100% للشباب وللجمعيات غير الربحية الراغبة في نشر برامجها.
              </span>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#F5F8FC] dark:bg-[#15344F] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-[#23486A] shadow-sm">
            <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#1667A5]" />
              <span>رسالة أو طلب شراكة</span>
            </h3>

            {submitted ? (
              <div className="p-8 text-center bg-white dark:bg-[#0F2840] rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">شكراً لتواصلك معنا!</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  تم استلام رسالتك التجريبية بنجاح. سيتم تفعيل صندوق البريد الرسمي والمزامنة التلقائية فور ربط خادم المنصة.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#1667A5] hover:underline"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                      الاسم الكامل <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: يوسف الإدريسي"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                      البريد الإلكتروني <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@domain.ma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5] text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    اسم الجمعية أو المنظمة (إن وُجدت)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="مثال: جمعية الأمل للتربية والتخييم"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    الرسالة أو تفاصيل الشراكة <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب استفسارك أو رغبتك في التعاون مع المنصة..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0F2840] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1667A5] hover:bg-[#125386] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
