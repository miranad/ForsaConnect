import React from 'react';
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
            مبادرة شبابية غير ربحية انطلقت من ورشة كشفية لفريق «كشافة الأذكياء» (Smart Scouts)، بهدف سد فجوة المعلومة وتسهيل وصول الشباب المغربي إلى فرص التطوع والتكوين والمنح الحقيقية.
          </p>
        </div>

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

        {/* What is completed vs Simulated */}
        <div className="bg-white dark:bg-[#15344F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#23486A] shadow-sm">
          <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white mb-6">
            مصفوفة الشفافية: ما تم إنجازه مقابل ما يلزم للمرحلة السحابية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* Completed */}
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>الميزات المكتملة في المعاينة التفاعلية (جاهزة الآن):</span>
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li>استيراد الـ 25 فرصة الحقيقية كاملة بنطاقاتها (17 المغرب، 3 دولية، 5 عن بعد).</li>
                <li>تصفية حية حسب النطاق، الفئة، والمدينة، مع محرك بحث فوري بالأحرف العربية.</li>
                <li>نافذة تفاصيل متكاملة مع إيضاح الشروط، التكاليف، طريقة التسجيل، والروابط الرسمية.</li>
                <li>نموذج اقتراح فرصة مع فحص العناوين، بروتوكول https://، وموافقة حماية القاصرين.</li>
                <li>لوحة إشراف تجريبية تتيح فحص واعتماد المسودات وإظهارها فوراً في الدليل.</li>
              </ul>
            </div>

            {/* Pending Cloud Deployment */}
            <div className="space-y-3">
              <h4 className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>المرحلة السحابية (تتطلب مصادقتك لتفعيل Firebase):</span>
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li>ربط قاعدة بيانات Google Firebase Firestore لتخزين ومزامنة البيانات عبر مختلف الأجهزة.</li>
                <li>مصادقة المشرفين عبر Google Sign-In مع حماية الخادم (Custom Claims).</li>
                <li>نشر قواعد أمان Firestore Rules تمنع غير المشرفين من نشر أي فرصة قبل المراجعة.</li>
                <li>نظام التنبيهات وإشعار أصحاب المقترحات عند قبول أو رفض الفرصة.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
