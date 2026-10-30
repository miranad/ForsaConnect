import React, { useState, useMemo, useEffect } from 'react';
import { Compass, Search, RotateCcw, ShieldCheck, Home, ChevronLeft, MapPin } from 'lucide-react';
import { Opportunity } from '../types';
import { SCOPES, SCOPE_ICONS, filterOpportunities, extractMoroccoCities } from '../lib/catalog';
import { OpportunityCard } from '../components/OpportunityCard';
import { useRouter } from '../context/RouterContext';

interface OpportunitiesPageProps {
  opportunities: Opportunity[];
  initialScope?: string;
  initialCategory?: string;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  opportunities,
  initialScope = 'الكل',
  initialCategory = 'الكل',
}) => {
  const { navigate, route } = useRouter();

  const [scopeFilter, setScopeFilter] = useState<string>(route.scopeFilter || initialScope);
  const [categoryFilter, setCategoryFilter] = useState<string>(route.categoryFilter || initialCategory);
  const [cityFilter, setCityFilter] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (route.scopeFilter) setScopeFilter(route.scopeFilter);
    if (route.categoryFilter) setCategoryFilter(route.categoryFilter);
  }, [route.scopeFilter, route.categoryFilter]);

  // Categories extracted dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach((item) => set.add(item.category));
    return ['الكل', ...Array.from(set)];
  }, [opportunities]);

  // Morocco cities
  const moroccoCities = useMemo(() => {
    return extractMoroccoCities(opportunities);
  }, [opportunities]);

  // Filtered
  const filtered = useMemo(() => {
    return filterOpportunities(opportunities, {
      scope: scopeFilter,
      category: categoryFilter,
      city: cityFilter,
      query: searchQuery,
    });
  }, [opportunities, scopeFilter, categoryFilter, cityFilter, searchQuery]);

  const resetFilters = () => {
    setScopeFilter('الكل');
    setCategoryFilter('الكل');
    setCityFilter('الكل');
    setSearchQuery('');
  };

  return (
    <div className="py-10 sm:py-16 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center gap-1 hover:text-[#1667A5] dark:hover:text-sky-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </button>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">دليل الفرص</span>
        </nav>

        {/* Page Title & Intro */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1667A5]/10 text-[#1667A5] dark:text-sky-300 border border-[#1667A5]/20 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>الدليل الشامل</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-[#0F2840] dark:text-white leading-tight">
            فرص موثقة المصدر: داخل المغرب، خارجه، وعن بعد
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            استكشف فرص التطوع والورشات والمنح والتكوين والأنشطة من مصادرها الرسمية. اختر فرصة للاطلاع على تفاصيلها وشروطها.
          </p>
        </div>

        {/* Sourced/Verified Banner (Exact V3 text) */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">
              وجود رابط رسمي لا يعني أن باب التسجيل ما زال مفتوحاً أو أن المقاعد متاحة؛ يُرجى التأكد من الجهة المنظمة قبل التقديم.
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
              تختلف شروط الأهلية والدعم والتسجيل حسب البرنامج؛ اطلع على التفاصيل قبل التقديم.
            </p>
          </div>
        </div>

        {/* Filter Controls Panel */}
        <div className="bg-white dark:bg-[#15344F] p-6 rounded-3xl border border-slate-200/90 dark:border-[#23486A] shadow-sm space-y-6">
          {/* Row 1: Scope Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2.5">
              النطاق الجغرافي:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {SCOPES.map((scope) => {
                const isActive = scopeFilter === scope;
                return (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setScopeFilter(scope)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#1667A5] text-white shadow-md ring-2 ring-sky-400/50'
                        : 'bg-[#F5F8FC] dark:bg-[#0F2840] text-slate-700 dark:text-slate-300 hover:text-[#1667A5] dark:hover:text-white border border-slate-200/60 dark:border-[#23486A]'
                    }`}
                  >
                    <span className="ml-1">{SCOPE_ICONS[scope]}</span>
                    <span>{scope}</span>
                    <span className="mr-1.5 text-[11px] opacity-75">
                      ({scope === 'الكل' ? opportunities.length : opportunities.filter((x) => x.scope === scope).length})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Category Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2.5">
              فئة النشاط:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#259A6A] text-white shadow-md ring-2 ring-emerald-400/50'
                        : 'bg-[#F5F8FC] dark:bg-[#0F2840] text-slate-700 dark:text-slate-300 hover:text-[#259A6A] dark:hover:text-white border border-slate-200/60 dark:border-[#23486A]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="mr-1.5 text-[11px] opacity-75">
                      ({cat === 'الكل' ? opportunities.length : opportunities.filter((x) => x.category === cat).length})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: City Dropdown & Live Search */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-slate-100 dark:border-[#23486A]">
            {/* Search Input (8 Cols) */}
            <div className="md:col-span-8 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالكلمات: عنوان، مدينة، منظمة، مهارات، تطوع..."
                className="w-full bg-[#F5F8FC] dark:bg-[#0F2840] text-slate-900 dark:text-white placeholder-slate-400 px-4 py-3 pr-11 rounded-xl border border-slate-300 dark:border-[#23486A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* City Dropdown (4 Cols) */}
            <div className="md:col-span-4">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full bg-[#F5F8FC] dark:bg-[#0F2840] text-slate-900 dark:text-white px-4 py-3 rounded-xl border border-slate-300 dark:border-[#23486A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1667A5]"
              >
                <option value="الكل">كل المدن والمواقع</option>
                {moroccoCities.map((city) => (
                  <option key={city} value={city}>
                    {city} (المغرب)
                  </option>
                ))}
                <option value="خارج المغرب">فرص دولية (خارج المغرب)</option>
                <option value="عن بعد">عن بُعد عبر الإنترنت</option>
              </select>
            </div>
          </div>

          {/* Result Count and Active Filters */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-300 pt-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F2840] dark:text-white text-sm">
                {filtered.length}
              </span>
              <span>فرصة مطابقة للبحث من أصل {opportunities.length}</span>
            </div>

            {(scopeFilter !== 'الكل' || categoryFilter !== 'الكل' || cityFilter !== 'الكل' || searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#259A6A] hover:underline font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط المرشحات</span>
              </button>
            )}
          </div>
        </div>

        {/* Opportunities Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onOpenDetails={(item) => navigate('opportunity-detail', item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#15344F] rounded-3xl p-12 text-center border border-slate-200 dark:border-[#23486A] space-y-4 shadow-sm">
            <Search className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-[#0F2840] dark:text-white">لم نعثر على فرص مطابقة لهذا البحث</h3>
            <p className="text-sm text-slate-500 dark:text-slate-300 max-w-md mx-auto">
              جرّب تغيير كلمات البحث، أو اختر «الكل» في النطاق والفئات لعرض جميع الفرص المتاحة.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-[#1667A5] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#135384] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>عرض جميع الفرص</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
