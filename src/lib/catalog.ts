import { Opportunity, ScopeType } from '../types';

export const SCOPES: ('الكل' | ScopeType)[] = ['الكل', 'داخل المغرب', 'خارج المغرب', 'عن بعد'];

export const SCOPE_ICONS: Record<string, string> = {
  'الكل': '✨',
  'داخل المغرب': '🇲🇦',
  'خارج المغرب': '🌍',
  'عن بعد': '💻',
};

export const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  'تم التأكد من فتح التسجيل حديثاً': {
    label: 'مؤكد فتح التسجيل',
    bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  'موعد معلن؛ توفر المقاعد غير مؤكد': {
    label: 'موعد معلن (المقاعد غير مؤكدة)',
    bg: 'bg-amber-50 dark:bg-amber-950/60',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
  },
  'برنامج مستمر': {
    label: 'برنامج مستمر',
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  'استمارة منشورة': {
    label: 'استمارة منشورة (تحقق مطلوب)',
    bg: 'bg-sky-50 dark:bg-sky-950/60',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
  },
  'التسجيل مغلق/منتهي': {
    label: 'التسجيل مغلق حالياً',
    bg: 'bg-rose-50 dark:bg-rose-950/60',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
  },
  'بحاجة إلى تحقق': {
    label: 'بحاجة إلى تحقق مستقل',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-700',
  },
};

export function getStatusStyle(status: string) {
  return STATUS_CONFIG[status] || {
    label: status || 'بحاجة إلى تحقق',
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-700',
  };
}

export function asOfficialUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    return u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}

export function extractMoroccoCities(items: Opportunity[]): string[] {
  const citiesSet = new Set<string>();
  items
    .filter(item => item.scope === 'داخل المغرب')
    .forEach(item => {
      // Locations may look like "الدار البيضاء", "غابة بوسكورة، الدار البيضاء", "الرباط", etc.
      const loc = item.location;
      if (loc.includes('الدار البيضاء')) citiesSet.add('الدار البيضاء');
      else if (loc.includes('الرباط')) citiesSet.add('الرباط');
      else if (loc.includes('طنجة')) citiesSet.add('طنجة');
      else if (loc.includes('مراكش')) citiesSet.add('مراكش');
      else if (loc.includes('فاس')) citiesSet.add('فاس');
      else if (loc.includes('بن جرير')) citiesSet.add('بن جرير');
      else if (loc.includes('بني ملال')) citiesSet.add('بني ملال');
      else if (loc.includes('وجدة')) citiesSet.add('وجدة');
      else if (loc.includes('أكادير')) citiesSet.add('أكادير');
      else {
        const parts = loc.split('،').map(p => p.trim());
        const last = parts[parts.length - 1];
        if (last && last.length < 25) citiesSet.add(last);
      }
    });
  return Array.from(citiesSet);
}

export function filterOpportunities(
  items: Opportunity[],
  {
    scope = 'الكل',
    category = 'الكل',
    city = 'الكل',
    query = '',
  }: {
    scope?: string;
    category?: string;
    city?: string;
    query?: string;
  }
): Opportunity[] {
  const q = query.trim().toLocaleLowerCase('ar');
  return items.filter(item => {
    // Scope filter
    if (scope !== 'الكل' && item.scope !== scope) return false;

    // Category filter
    if (category !== 'الكل' && item.category !== category) return false;

    // City filter
    if (city !== 'الكل') {
      if (city === 'خارج المغرب' || city === 'عن بعد') {
        if (item.scope !== city) return false;
      } else {
        // A Moroccan city must never match international or remote opportunities.
        if (item.scope !== 'داخل المغرب' || !item.location.includes(city)) return false;
      }
    }

    // Query filter
    if (q) {
      const matchable = [
        item.title_ar,
        item.organization,
        item.location,
        item.description_ar,
        item.eligibility_ar,
        item.category,
        item.scope,
      ]
        .join(' ')
        .toLocaleLowerCase('ar');
      if (!matchable.includes(q)) return false;
    }

    return true;
  });
}
