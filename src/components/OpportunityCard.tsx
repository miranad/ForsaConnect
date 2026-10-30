import React from 'react';
import { ExternalLink, Calendar, MapPin, Building2, Clock, ShieldCheck, ChevronLeft } from 'lucide-react';
import { Opportunity } from '../types';
import { getStatusStyle, SCOPE_ICONS, asOfficialUrl } from '../lib/catalog';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onOpenDetails: (opp: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onOpenDetails }) => {
  const statusStyle = getStatusStyle(opportunity.verification_status);
  const officialUrl = asOfficialUrl(opportunity.source_url);

  return (
    <div className="group bg-white dark:bg-[#15344F] rounded-2xl border border-slate-200/90 dark:border-[#23486A] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-right hover:border-[#1667A5]/50">
      <div>
        {/* Top bar with Scope, Category, and ID */}
        <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 border border-[#1667A5]/20">
              <span>{SCOPE_ICONS[opportunity.scope]}</span>
              <span>{opportunity.scope}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#259A6A]/10 text-[#259A6A] dark:text-emerald-300 border border-[#259A6A]/20">
              {opportunity.category}
            </span>
            {opportunity.isCustom && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                اقتراح محلي
              </span>
            )}
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {opportunity.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#0F2840] dark:text-white line-clamp-2 leading-snug group-hover:text-[#1667A5] dark:group-hover:text-sky-400 transition-colors">
          {opportunity.title_ar}
        </h3>

        {/* Organizer */}
        <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm font-semibold text-[#1667A5] dark:text-sky-300">
          <Building2 className="w-4 h-4 shrink-0 text-[#1667A5] dark:text-sky-400" />
          <span className="truncate">{opportunity.organization}</span>
        </div>

        {/* Verification Status Banner */}
        <div className={`mt-3 px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{statusStyle.label}</span>
        </div>

        {/* Meta Info: Location, Event Date, Deadline */}
        <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="text-slate-400">المكان:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{opportunity.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-[#259A6A]" />
            <span className="text-slate-400">موعد النشاط:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{opportunity.event_date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span className="text-slate-400">أجل التقديم:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">
              {opportunity.application_deadline || 'مستمر / غير محدد'}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {opportunity.description_ar}
        </p>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-[#23486A] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenDetails(opportunity)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1667A5] dark:text-sky-300 hover:text-[#0F2840] dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <span>التفاصيل والشروط</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {officialUrl ? (
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="فتح الرابط الرسمي في نافذة جديدة"
          >
            <span>المصدر الأصلي</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[11px] text-slate-400 px-2 py-1">
            الرابط غير متوفر
          </span>
        )}
      </div>
    </div>
  );
};
