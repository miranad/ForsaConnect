import React from 'react';

export const SCOUT_ORGANIZATION = 'منظمة الكشاف التطوعي';
export const SCOUT_LOGO = '/voluntary-scout-organization-logo.jpg';

export function OrganizationIdentity({ dark = false }: { dark?: boolean }) {
  return <div className={`flex items-center gap-3 text-right min-w-0 ${dark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
    <img src={SCOUT_LOGO} alt="شعار منظمة الكشاف التطوعي — Voluntary Scout Organization" width={64} height={64} className="w-16 h-16 shrink-0 rounded-full object-contain bg-white border border-slate-200" loading="lazy" />
    <div className="min-w-0"><p className="text-xs">مشروع تابع لـ</p><p className={`text-sm sm:text-base font-heading font-bold ${dark ? 'text-white' : 'text-[#0F2840] dark:text-white'}`}>{SCOUT_ORGANIZATION}</p><p className="text-xs mt-1" lang="en">Voluntary Scout Organization</p></div>
  </div>;
}
