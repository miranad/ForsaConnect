import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, MapPin, Building2, Clock, CheckCircle2, AlertTriangle, ShieldCheck, DollarSign, UserCheck, FileText, Share2, Check } from 'lucide-react';
import { Opportunity } from '../types';
import { getStatusStyle, SCOPE_ICONS, asOfficialUrl } from '../lib/catalog';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({ opportunity, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (opportunity) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opportunity, onClose]);

  if (!opportunity) return null;

  const statusStyle = getStatusStyle(opportunity.verification_status);
  const officialUrl = asOfficialUrl(opportunity.source_url);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + '#' + opportunity.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white dark:bg-[#12283E] text-slate-900 dark:text-slate-100 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-[#23486A] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with tags and close button */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#12283E]/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-[#23486A] flex items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 border border-[#1667A5]/20">
              <span>{SCOPE_ICONS[opportunity.scope]}</span>
              <span>{opportunity.scope}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#259A6A]/10 text-[#259A6A] dark:text-emerald-300 border border-[#259A6A]/20">
              {opportunity.category}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">
              {opportunity.id}
            </span>
            {opportunity.isCustom && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                اقتراح محلي معتمد
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title and Organization */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-black font-heading text-[#0F2840] dark:text-white leading-tight">
              {opportunity.title_ar}
            </h2>
            <div className="flex items-center gap-2 mt-3 text-base font-semibold text-[#1667A5] dark:text-sky-300">
              <Building2 className="w-5 h-5 shrink-0" />
              <span>{opportunity.organization}</span>
            </div>
          </div>

          {/* Verification Status Warning Box */}
          <div className={`p-4 rounded-2xl border ${statusStyle.bg} ${statusStyle.border} flex items-start gap-3`}>
            <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${statusStyle.text}`} />
            <div className="text-sm">
              <div className="font-bold flex items-center gap-2">
                <span className={statusStyle.text}>حالة التوثيق: {statusStyle.label}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                وجود المصدر لا يعني بالضرورة استمرار فتح باب التقديم اليوم؛ يرجى مراجعة الموقع الرسمي للجهة للتأكد من المقاعد.
              </p>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <MapPin className="w-4 h-4 text-[#1667A5]" />
                <span className="font-bold">المكان / المدينة:</span>
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 pr-6">
                {opportunity.location || 'غير محدد'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Calendar className="w-4 h-4 text-[#259A6A]" />
                <span className="font-bold">موعد النشاط:</span>
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 pr-6">
                {opportunity.event_date || 'غير محدد'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-bold">آخر أجل للتقديم / الحجز:</span>
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 pr-6">
                {opportunity.application_deadline || 'مستمر أو غير معلن'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">التكاليف والدعم:</span>
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 pr-6">
                {opportunity.cost_ar || 'غير محدد'}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-base font-bold font-heading text-[#0F2840] dark:text-white flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#1667A5]" />
              <span>تفاصيل الفرصة</span>
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed bg-[#F5F8FC] dark:bg-white/5 p-4 rounded-2xl border border-slate-200/60 dark:border-white/5">
              {opportunity.description_ar}
            </p>
          </div>

          {/* Eligibility Section */}
          <div>
            <h3 className="text-base font-bold font-heading text-[#0F2840] dark:text-white flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4 text-[#259A6A]" />
              <span>شروط الأهلية والسن</span>
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed p-3.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
              {opportunity.eligibility_ar || 'مفتوحة للجميع دون شروط خاصة معلنة.'}
            </p>
          </div>

          {/* Application Method */}
          <div>
            <h3 className="text-base font-bold font-heading text-[#0F2840] dark:text-white flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>طريقة التقديم والتسجيل</span>
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed p-3.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
              {opportunity.application_method_ar || 'التسجيل متاح عبر الرابط الرسمي أدناه.'}
            </p>
          </div>

          {/* Official Notes if available */}
          {opportunity.notes_ar && (
            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
              <span className="font-bold">معلومات إضافية / تواصل رسمي: </span>
              <span>{opportunity.notes_ar}</span>
            </div>
          )}

          {/* Safety & Integrity Warning */}
          <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-white/5 p-3.5 rounded-xl flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
            <span>
              <b>تنبيه أمان وشفافية:</b> منصة ForsaConnect لا تتقاضى أي رسوم ولا تجمع بياناتك الشخصية للتقديم. التسجيل يتم دائمًا مباشرة عبر موقع الجهة المنظمة الأصلية.
            </span>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="sticky bottom-0 bg-white/95 dark:bg-[#12283E]/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 dark:border-[#23486A] flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة الفرصة'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              إغلاق
            </button>
            {officialUrl ? (
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-950/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>زيارة الموقع الرسمي والتسجيل</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-white/10 px-3 py-2 rounded-xl">
                الرابط الرسمي غير متوفر
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
