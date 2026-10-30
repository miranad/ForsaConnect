import React, { useState } from 'react';
import { Home, Compass, ArrowRight, ExternalLink, Calendar, MapPin, Building2, Clock, ShieldCheck, DollarSign, UserCheck, FileText, Share2, Check, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Opportunity } from '../types';
import { useRouter } from '../context/RouterContext';
import { getStatusStyle, SCOPE_ICONS, asOfficialUrl } from '../lib/catalog';
import { OpportunityCard } from '../components/OpportunityCard';

interface OpportunityDetailPageProps {
  opportunities: Opportunity[];
  id?: string;
}

export const OpportunityDetailPage: React.FC<OpportunityDetailPageProps> = ({ opportunities, id }) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);

  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4 text-right space-y-4">
        <h2 className="text-2xl font-black font-heading text-[#0F2840] dark:text-white">
          عذراً، لم نعثر على هذه الفرصة!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          قد يكون معرّف الفرصة غير صحيح أو تم تحديثه في الدليل.
        </p>
        <button
          type="button"
          onClick={() => navigate('opportunities')}
          className="inline-flex items-center gap-2 bg-[#1667A5] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md"
        >
          <span>العودة إلى دليل الفرص</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const statusStyle = getStatusStyle(opportunity.verification_status);
  const officialUrl = asOfficialUrl(opportunity.source_url);

  // Related opportunities (matching category or scope)
  const relatedOpportunities = opportunities
    .filter((o) => o.id !== opportunity.id && (o.category === opportunity.category || o.scope === opportunity.scope))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-14 text-right">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-200/80 dark:border-[#23486A] pb-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="hover:text-[#1667A5] dark:hover:text-sky-300 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => navigate('opportunities')}
              className="hover:text-[#1667A5] dark:hover:text-sky-300 transition-colors"
            >
              دليل الفرص
            </button>
            <span>/</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
              {opportunity.title_ar}
            </span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('opportunities')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1667A5] dark:text-sky-300 hover:underline"
          >
            <span>العودة إلى دليل الفرص</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Opportunity Card Container */}
        <article className="bg-white dark:bg-[#15344F] rounded-3xl border border-slate-200/90 dark:border-[#23486A] shadow-md overflow-hidden">
          {/* Header Bar */}
          <div className="bg-[#0F2840] text-white p-6 sm:p-10 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5] text-white border border-sky-400/30">
                  <span>{SCOPE_ICONS[opportunity.scope]}</span>
                  <span>{opportunity.scope}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#259A6A] text-white border border-emerald-400/30">
                  {opportunity.category}
                </span>
                {opportunity.isCustom && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900">
                    اقتراح محلي معتمد
                  </span>
                )}
              </div>
              <span className="font-mono text-xs font-bold text-slate-400 bg-white/10 px-3 py-1 rounded-full">
                {opportunity.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading leading-tight text-white">
              {opportunity.title_ar}
            </h1>

            <div className="flex items-center gap-2 text-sm sm:text-base text-sky-200 font-semibold">
              <Building2 className="w-5 h-5 shrink-0 text-[#259A6A]" />
              <span>الجهة المنظمة: {opportunity.organization}</span>
            </div>
          </div>

          {/* Verification Box */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className={`p-4 rounded-2xl border ${statusStyle.bg} ${statusStyle.border} flex items-start gap-3`}>
              <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${statusStyle.text}`} />
              <div className="text-sm">
                <div className="font-bold flex items-center gap-2">
                  <span className={statusStyle.text}>حالة التوثيق: {statusStyle.label}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {opportunity.isCustom ? (
                    <>تاريخ إدخال الاقتراح التجريبي: <span className="font-bold text-slate-800 dark:text-slate-200">{opportunity.verified_on}</span>. لم يتم التحقق بشكل مستقل من هذا الاقتراح أو من فتح التسجيل.</>
                  ) : (
                    <>تاريخ مراجعة المصدر: <span className="font-bold text-slate-800 dark:text-slate-200">{opportunity.verified_on}</span>. وجود رابط رسمي لا يعني استمرار فتح التسجيل؛ يُرجى التأكد من الجهة المنظمة.</>
                  )}
                </p>
              </div>
            </div>

            {/* 4 Essential Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A]">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                  <MapPin className="w-4 h-4 text-[#1667A5]" />
                  <span className="font-bold">المكان:</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white pr-5">
                  {opportunity.location || 'غير محدد'}
                </p>
              </div>

              <div className="p-4 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A]">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                  <Calendar className="w-4 h-4 text-[#259A6A]" />
                  <span className="font-bold">موعد النشاط:</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white pr-5">
                  {opportunity.event_date || 'غير محدد'}
                </p>
              </div>

              <div className="p-4 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A]">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="font-bold">آخر أجل للتقديم:</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white pr-5">
                  {opportunity.application_deadline || 'مستمر / غير محدد'}
                </p>
              </div>

              <div className="p-4 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A]">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">التكاليف والدعم:</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white pr-5">
                  {opportunity.cost_ar || 'غير محدد'}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1667A5]" />
                <span>الوصف الكامل للفرصة والمهام</span>
              </h2>
              <div className="p-6 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                {opportunity.description_ar}
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#259A6A]" />
                <span>شروط الأهلية والسن المطلوب</span>
              </h2>
              <div className="p-5 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                {opportunity.eligibility_ar || 'مفتوحة للجميع دون شروط سن معلنة.'}
              </div>
            </div>

            {/* Application Method Section */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-600" />
                <span>طريقة التقديم والتسجيل</span>
              </h2>
              <div className="p-5 bg-[#F5F8FC] dark:bg-[#0F2840] rounded-2xl border border-slate-200/80 dark:border-[#23486A] text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                {opportunity.application_method_ar || 'يتم التسجيل مباشرة عبر الرابط الرسمي أدناه.'}
              </div>
            </div>

            {/* Official Notes if available */}
            {opportunity.notes_ar && (
              <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                <span className="font-bold">معلومات إضافية / وسائل اتصال رسمية: </span>
                <span>{opportunity.notes_ar}</span>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-[#23486A] flex items-center justify-between gap-4 flex-wrap">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'تم نسخ رابط هذه الصفحة!' : 'مشاركة صفحة الفرصة'}</span>
              </button>

              {officialUrl ? (
                <a
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>الانتقال إلى الموقع الرسمي والتسجيل</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-white/10 px-4 py-2.5 rounded-xl">
                  الرابط الرسمي غير متوفر
                </span>
              )}
            </div>
          </div>
        </article>

        {/* Related Opportunities Section */}
        {relatedOpportunities.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white">
                فرص أخرى قد تهمك
              </h3>
              <button
                type="button"
                onClick={() => navigate('opportunities')}
                className="text-xs font-bold text-[#1667A5] dark:text-sky-300 hover:underline"
              >
                استعراض كامل الدليل ←
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedOpportunities.map((related) => (
                <OpportunityCard
                  key={related.id}
                  opportunity={related}
                  onOpenDetails={(item) => navigate('opportunity-detail', item.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
