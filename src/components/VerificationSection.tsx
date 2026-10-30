import React from 'react';
import { ShieldCheck, Calendar, Clock, CheckCircle2, AlertTriangle, HelpCircle, Link as LinkIcon, Lock } from 'lucide-react';

export const VerificationSection: React.FC = () => {
  const statuses = [
    {
      title: 'تم التأكد من فتح التسجيل حديثاً',
      desc: 'تم فحص الرابط الرسمي والتأكد من وجود استمارة تسجيل أو إعلان صريح ببدء استقبال الطلبات.',
      color: 'bg-emerald-500',
      badge: 'مؤكد حديثاً',
    },
    {
      title: 'موعد معلن؛ توفر المقاعد غير مؤكد',
      desc: 'تاريخ النشاط أو الورشة معلن رسمياً، لكن الأماكن قد تكون محدودة أو تتطلب حجزاً مباشراً بالبريد أو الهاتف.',
      color: 'bg-amber-500',
      badge: 'مقاعد غير مؤكدة',
    },
    {
      title: 'برنامج مستمر',
      desc: 'برامج وأنشطة تستقبل المشاركين طوال السنة أو بنظام الدورات المتتالية دون موعد إغلاق واحد.',
      color: 'bg-blue-500',
      badge: 'برنامج مستمر',
    },
    {
      title: 'استمارة منشورة',
      desc: 'الاستمارة موجودة على الصفحة الرسمية لكن لم يُحدد بعد الموعد النهائي لإغلاقها أو بدء الدورة التالية.',
      color: 'bg-sky-500',
      badge: 'استمارة منشورة',
    },
    {
      title: 'التسجيل مغلق / بحاجة إلى تحقق',
      desc: 'انتهت فترة التسجيل لهذه الدورة، أو يحتاج الإعلان إلى مراجعة جديدة للتأكد من مواعيد الدورة القادمة.',
      color: 'bg-rose-500',
      badge: 'تحقق إضافي مطلوب',
    },
  ];

  return (
    <section id="verification" className="py-16 sm:py-24 bg-white dark:bg-[#0A1D30] text-right border-t border-slate-200 dark:border-[#23486A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 border border-[#1667A5]/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>معايير النزاهة والتحقق</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#0F2840] dark:text-white leading-tight">
            كيف نتحقق من مصادر الفرص؟
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            تأسست ForsaConnect على مبدأ الأمانة والشفافية التامة مع الشباب. لا نقوم بنشر أي فرصة مجهولة المصدر، ولا نروج لمنشورات إعادة النشر على الشبكات الاجتماعية كأنها فرص أصلية.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#F5F8FC] dark:bg-[#15344F] p-6 rounded-2xl border border-slate-200 dark:border-[#23486A]">
            <div className="w-10 h-10 rounded-xl bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-[#0F2840] dark:text-white mb-2">
              التأكد من توفر التسجيل
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              وجود إعلان رسمي لا يضمن بقاء التسجيل مفتوحاً أو توفر المقاعد. تأكد من التفاصيل مباشرة لدى الجهة المنظمة قبل التقديم.
            </p>
          </div>

          <div className="bg-[#F5F8FC] dark:bg-[#15344F] p-6 rounded-2xl border border-slate-200 dark:border-[#23486A]">
            <div className="w-10 h-10 rounded-xl bg-[#259A6A]/10 text-[#259A6A] dark:text-emerald-300 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-[#0F2840] dark:text-white mb-2">
              موعد النشاط مقابل أجل التقديم
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              نفرق بوضوح بين <b>موعد إقامة النشاط</b> (تاريخ الفعالية أو الورشة) و<b>آخر موعد للتقديم</b> (تاريخ إغلاق الاستمارة)، لتفادي فوات الفرصة على المشاركين.
            </p>
          </div>

          <div className="bg-[#F5F8FC] dark:bg-[#15344F] p-6 rounded-2xl border border-slate-200 dark:border-[#23486A]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <LinkIcon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-[#0F2840] dark:text-white mb-2">
              الروابط الرسمية المباشرة فقط
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              نوفر في كل بطاقة زر <b>«المصدر الأصلي»</b> ليوجهك مباشرة إلى موقع المنظمة أو المؤسسة الرسمية، دون وسيط أو صفحات وسائط غير مؤكدة.
            </p>
          </div>
        </div>

        {/* Statuses Explanation Table */}
        <div className="bg-[#F5F8FC] dark:bg-[#15344F] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#23486A]">
          <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white mb-6">
            دلالات الحالات الخمس المعتمدة في البطاقات:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statuses.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0F2840] p-4 rounded-xl border border-slate-200/80 dark:border-[#23486A] space-y-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <strong className="text-slate-900 dark:text-white font-bold">{item.title}</strong>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
