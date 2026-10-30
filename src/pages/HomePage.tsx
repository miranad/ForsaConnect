import React from 'react';
import { Sparkles, Compass, PlusCircle, ArrowLeft, ShieldCheck, CheckCircle2, Users, Calendar, MapPin } from 'lucide-react';
import { Opportunity } from '../types';
import { useRouter } from '../context/RouterContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { OrganizationIdentity, SCOUT_ORGANIZATION } from '../components/OrganizationIdentity';

interface HomePageProps {
  opportunities: Opportunity[];
  moroccoCount: number;
  abroadCount: number;
  remoteCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  opportunities,
  moroccoCount,
  abroadCount,
  remoteCount,
}) => {
  const { navigate } = useRouter();

  // Preview 6 featured opportunities on the home page
  const featuredOpportunities = opportunities.slice(0, 6);
  const organizationActivities = opportunities.filter(op => op.organization.includes(SCOUT_ORGANIZATION) || op.organization.toLowerCase().includes('voluntary scout organization'));

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF2FA] via-[#F5F8FC] to-[#F5F8FC] dark:from-[#081726] dark:via-[#0A1D30] dark:to-[#0A1D30] py-14 sm:py-20 border-b border-slate-200/60 dark:border-[#23486A]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Content (7 Cols) */}
            <div className="lg:col-span-7 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#259A6A]/10 text-[#259A6A] dark:text-emerald-300 border border-[#259A6A]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>منصة مجانية غير ربحية للشباب في المغرب</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-[#0F2840] dark:text-white leading-[1.2]">
                طريقك نحو <span className="text-[#259A6A]">الفرص</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                منصة تجمع فرص التطوع، التكوين، المنح، والورشات والأنشطة الشبابية في مكان واحد، حتى لا تضيع عليك أي فرصة لأن المعلومة لم تصل في وقتها.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap pt-2">
                <button
                  type="button"
                  onClick={() => navigate('opportunities')}
                  className="inline-flex items-center gap-2 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Compass className="w-5 h-5" />
                  <span>تصفح دليل الفرص</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('submit')}
                  className="inline-flex items-center gap-2 bg-white dark:bg-[#15344F] text-[#1667A5] dark:text-sky-300 hover:bg-slate-50 dark:hover:bg-[#1A3D5C] px-6 py-3.5 rounded-xl font-bold text-base border border-[#1667A5]/30 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>اقترح فرصة جديدة</span>
                </button>
              </div>

              {/* Important Verification Reminder */}
              <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#1667A5]" />
                <span>
                  تعرّف على تفاصيل الفرص وشروطها عبر مصادرها الرسمية. يُرجى التأكد من استمرار فتح باب التسجيل لدى الجهة المنظمة.
                </span>
              </div>
            </div>

            {/* Logo / Brand Art Card (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white dark:bg-[#15344F] p-8 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-[#23486A] shadow-xl text-center space-y-4">
                <div className="relative mx-auto w-44 sm:w-52 h-44 sm:h-52 flex items-center justify-center p-3">
                  <img
                    src="/ForsaConnect_Logo.png"
                    alt="شعار ForsaConnect: باب مفتوح يتحول إلى طريق وسهم نحو الفرص"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black font-heading text-[#0F2840] dark:text-white">
                    Forsa<span className="text-[#259A6A]">Connect</span>
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
                    «طريقك نحو الفرص»
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    مبادرة فريق «كشافة الأذكياء»
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-200 dark:border-[#23486A]"><OrganizationIdentity /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="organization-activities-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-6">
        <div className="flex items-start justify-between gap-5 flex-wrap">
          <div><h2 id="organization-activities-title" className="text-2xl sm:text-3xl font-black font-heading text-[#0F2840] dark:text-white">أنشطة منظمة الكشاف التطوعي</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">تعرّف على أنشطة المنظمة وورشاتها ومبادراتها التطوعية. تُضاف الأنشطة الجديدة بعد مراجعتها واعتماد نشرها.</p></div>
          <button type="button" onClick={() => navigate('submit')} className="px-5 py-3 bg-[#1667A5] text-white rounded-xl text-sm font-bold">اقترح نشاطاً للمنظمة</button>
        </div>
        {organizationActivities.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{organizationActivities.slice(0, 6).map(op => <OpportunityCard key={op.id} opportunity={op} onOpenDetails={item => navigate('opportunity-detail', item.id)} />)}</div> : <p className="p-6 sm:p-8 bg-white dark:bg-[#15344F] rounded-3xl border border-slate-200 dark:border-[#23486A] text-sm text-slate-600 dark:text-slate-300">ستظهر هنا أنشطة المنظمة عند اعتماد أول إعلان. يمكنك حالياً تصفح الفرص الأخرى في الدليل.</p>}
      </section>

      {/* Scope Cards Strip (Directly Navigable) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => navigate('opportunities')}
            className="p-5 bg-white dark:bg-[#15344F] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-center hover:border-[#1667A5] hover:shadow-md transition-all group"
          >
            <strong className="block text-3xl font-black font-heading text-[#0F2840] dark:text-white group-hover:text-[#1667A5] dark:group-hover:text-sky-300">
              {opportunities.length}
            </strong>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold block mt-1">
              جميع الفرص الموثقة ✨
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate('opportunities', undefined, { scopeFilter: 'داخل المغرب' })}
            className="p-5 bg-white dark:bg-[#15344F] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-center hover:border-[#1667A5] hover:shadow-md transition-all group"
          >
            <strong className="block text-3xl font-black font-heading text-[#1667A5] dark:text-sky-300">
              {moroccoCount}
            </strong>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold block mt-1">
              داخل المغرب 🇲🇦
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate('opportunities', undefined, { scopeFilter: 'خارج المغرب' })}
            className="p-5 bg-white dark:bg-[#15344F] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-center hover:border-[#259A6A] hover:shadow-md transition-all group"
          >
            <strong className="block text-3xl font-black font-heading text-[#259A6A] dark:text-emerald-300">
              {abroadCount}
            </strong>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold block mt-1">
              خارج المغرب 🌍
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate('opportunities', undefined, { scopeFilter: 'عن بعد' })}
            className="p-5 bg-white dark:bg-[#15344F] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-center hover:border-indigo-500 hover:shadow-md transition-all group"
          >
            <strong className="block text-3xl font-black font-heading text-indigo-600 dark:text-indigo-400">
              {remoteCount}
            </strong>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold block mt-1">
              عن بعد عبر الإنترنت 💻
            </span>
          </button>
        </div>
      </section>

      {/* Featured Opportunities Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 border border-[#1667A5]/20 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>معاينة من الدليل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#0F2840] dark:text-white">
              أحدث الفرص الشبابية الموثقة
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              فرص مختارة من الدليل. استكشف بقية الفرص باستخدام البحث والفلاتر.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('opportunities')}
            className="inline-flex items-center gap-2 bg-[#1667A5] hover:bg-[#125386] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02]"
          >
            <span>فتح دليل الفرص</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onOpenDetails={(item) => navigate('opportunity-detail', item.id)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-10">
          <button
            type="button"
            onClick={() => navigate('opportunities')}
            className="inline-flex items-center gap-2.5 bg-[#0F2840] dark:bg-[#15344F] text-white hover:bg-[#1667A5] px-8 py-4 rounded-2xl font-bold text-base shadow-md transition-all hover:scale-[1.02]"
          >
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>عرض جميع الفرص في صفحة مخصصة مع الفلاتر الكاملة ({opportunities.length} فرصة)</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="bg-white dark:bg-[#12283E] py-16 border-y border-slate-200 dark:border-[#23486A] text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#0F2840] dark:text-white">
              كيف تعمل ForsaConnect؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              ثلاث خطوات سهلة لربط الشباب المغربي بالفرص الرسمية دون وسطاء
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#F5F8FC] dark:bg-[#0A1D30] rounded-2xl border border-slate-200/80 dark:border-[#23486A] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1667A5] text-white font-black font-heading flex items-center justify-center text-xl shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold font-heading text-[#0F2840] dark:text-white">
                استكشف الفرص
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                ابحث حسب اهتمامك: تطوع خيري، ورشات إبداعية، تكوين تقني، أو فعاليات شبابية داخل المغرب وخارجه وعن بُعد.
              </p>
            </div>

            <div className="p-6 bg-[#F5F8FC] dark:bg-[#0A1D30] rounded-2xl border border-slate-200/80 dark:border-[#23486A] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#259A6A] text-white font-black font-heading flex items-center justify-center text-xl shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold font-heading text-[#0F2840] dark:text-white">
                اطّلع على الشروط
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                اقرأ تفاصيل الأهلية، الفئات العمرية، مواعيد التقديم، والتكاليف في صفحة تفصيلية واضحة وموثقة المصدر.
              </p>
            </div>

            <div className="p-6 bg-[#F5F8FC] dark:bg-[#0A1D30] rounded-2xl border border-slate-200/80 dark:border-[#23486A] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0F2840] dark:bg-[#1667A5] text-white font-black font-heading flex items-center justify-center text-xl shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold font-heading text-[#0F2840] dark:text-white">
                انطلق وقدم طلبك
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                انتقل مباشرة إلى الرابط الرسمي للمنظمة المعلنة للتسجيل بأمان وسهولة، دون دفع أي رسوم للمنصة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scout Survey Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="bg-[#0F2840] text-white rounded-3xl p-8 sm:p-12 border border-[#23486A] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Users className="w-3.5 h-3.5" />
                <span>مبادرة مجتمعية انطلقت من الميدان</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                «6 من 7 مشاركين فاتتهم فرصة لعدم وصول المعلومة»
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                انطلقت ForsaConnect من ورشة عمل لفريق «كشافة الأذكياء» لمعالجة مشكلة حقيقية يعيشها الشباب المغربي: الفرص موجودة، لكن الوصول إليها مشتت.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="inline-flex items-center gap-2 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all"
                >
                  <span>اقرأ قصة المنصة ونتائج الاستبيان</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#15344F] p-4 rounded-2xl border border-[#23486A]">
                <strong className="text-2xl sm:text-3xl font-black font-heading text-sky-400 block">85%</strong>
                <span className="text-[11px] text-slate-300">فاتتهم فرص سابقاً</span>
              </div>
              <div className="bg-[#15344F] p-4 rounded-2xl border border-[#23486A]">
                <strong className="text-2xl sm:text-3xl font-black font-heading text-emerald-400 block">71%</strong>
                <span className="text-[11px] text-slate-300">يطلبون منصة موحدة</span>
              </div>
              <div className="bg-[#15344F] p-4 rounded-2xl border border-[#23486A]">
                <strong className="text-2xl sm:text-3xl font-black font-heading text-amber-400 block">100%</strong>
                <span className="text-[11px] text-slate-300">مهتمون بالورشات</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="bg-gradient-to-r from-[#1667A5] to-[#12486E] text-white p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-black font-heading">
              هل تمثل جمعية أو لديك فرصة تريد إيصالها للشباب؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              ساعدنا في إثراء الدليل من خلال اقتراح فرص تطوع وورشات تدريبية مفيدة للشباب في جميع مناطق المغرب.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('submit')}
            className="shrink-0 bg-white text-[#1667A5] hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.02]"
          >
            اقترح فرصة الآن ←
          </button>
        </div>
      </section>
    </div>
  );
};
