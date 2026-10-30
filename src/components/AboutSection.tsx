import React from 'react';
import { OrganizationIdentity } from './OrganizationIdentity';
import { Users, Target, HeartHandshake, Award, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F5F8FC] dark:bg-[#0F2840] text-right border-t border-slate-200 dark:border-[#23486A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#259A6A]/10 text-[#259A6A] dark:text-emerald-300 border border-[#259A6A]/20 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>رسالتنا وقصتنا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#0F2840] dark:text-white leading-tight">
            لماذا ForsaConnect؟
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            مشروع شبابي غير ربحي تابع لمنظمة الكشاف التطوعي، انطلق من ورشة كشفية لفريق «كشافة الأذكياء» (Smart Scouts)، بهدف سد فجوة المعلومة وتسهيل وصول الشباب المغربي إلى فرص التطوع والتكوين والمنح الحقيقية.
          </p>
        </div>

        <div className="mb-10 p-6 rounded-3xl bg-white dark:bg-[#15344F] border border-slate-200 dark:border-[#23486A]"><OrganizationIdentity /><p className="mt-4 text-sm text-slate-600 dark:text-slate-300">تضم المنصة أيضاً أنشطة المنظمة وورشاتها ومبادراتها، وتُضاف إعلاناتها الجديدة عبر مسار الاقتراح والمراجعة والاعتماد.</p></div>

        {/* Scout Survey Findings (Exact 7-participant sample from Spec) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white">
              نتائج استبياننا الأولي الصغير
            </h3>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
              عينة أولية: 7 مشاركين فقط (لا تعمم)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#15344F] p-6 rounded-2xl border border-slate-200/90 dark:border-[#23486A] shadow-sm text-center space-y-3">
              <div className="text-4xl sm:text-5xl font-black font-heading text-[#1667A5] dark:text-sky-300">
                6 من 7
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-[#1667A5] h-full rounded-full" style={{ width: '85.7%' }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                (85.7%) سبق أن فاتتهم فرصة تطوع أو تدريب مفيدة بسبب عدم معرفتهم بها في الوقت المناسب.
              </p>
            </div>

            <div className="bg-white dark:bg-[#15344F] p-6 rounded-2xl border border-slate-200/90 dark:border-[#23486A] shadow-sm text-center space-y-3">
              <div className="text-4xl sm:text-5xl font-black font-heading text-[#259A6A] dark:text-emerald-300">
                5 من 7
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-[#259A6A] h-full rounded-full" style={{ width: '71.4%' }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                (71.4%) أكدوا استعدادهم لاستعمال منصة رقمية مجانية تجمع الفرص وتصنفها بانتظام.
              </p>
            </div>

            <div className="bg-white dark:bg-[#15344F] p-6 rounded-2xl border border-slate-200/90 dark:border-[#23486A] shadow-sm text-center space-y-3">
              <div className="text-4xl sm:text-5xl font-black font-heading text-amber-500 dark:text-amber-300">
                7 من 7
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                (100%) عبروا عن اهتمام بمبدأ ورشات تدريبية اختيارية بمساهمة رمزية لتطوير المهارات.
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
            * تنبيه علمي وأخلاقي: هذه النسب مستخلصة من عينة أولية لكشافين ويافعين (7 مشاركين) وليست دراسة إحصائية ممثلة لعموم الشباب المغربي.
          </p>
        </div>

        <div className="bg-white dark:bg-[#15344F] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#23486A] shadow-sm">
          <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white mb-6">المصداقية وسلامة المشاركة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
            <div><h4 className="font-bold text-[#259A6A] mb-3">من المصادر الرسمية</h4><p>تجمع المنصة فرص التطوع والورشات والمنح والزمالات والتدريب والدورات والأنشطة الشبابية، مع روابط مباشرة للجهات المنظمة للاطلاع على التفاصيل والتقديم.</p></div>
            <div><h4 className="font-bold text-[#1667A5] dark:text-sky-300 mb-3">مراجعة قبل النشر</h4><p>تخضع المقترحات للمراجعة قبل ظهورها في الدليل. لا تشارك بيانات شخصية حساسة، وتأكد من شروط الأهلية وآجال التسجيل لدى الجهة المنظمة.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};
