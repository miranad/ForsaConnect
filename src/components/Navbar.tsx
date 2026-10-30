import React, { useState } from 'react';
import { Menu, X, Compass, PlusCircle, ShieldCheck, HelpCircle, Users, Mail, Home } from 'lucide-react';
import { PageType, useRouter } from '../context/RouterContext';

interface NavbarProps {
  draftCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ draftCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { route, navigate } = useRouter();

  const navItems = [
    { id: 'home' as PageType, label: 'الرئيسية', icon: Home },
    { id: 'opportunities' as PageType, label: 'دليل الفرص', icon: Compass },
    { id: 'submit' as PageType, label: 'شارك فرصة', icon: PlusCircle, badge: draftCount > 0 ? draftCount : undefined },
    { id: 'admin' as PageType, label: 'لوحة الإشراف', icon: ShieldCheck },
    { id: 'verification' as PageType, label: 'عن التحقق', icon: HelpCircle },
    { id: 'about' as PageType, label: 'من نحن', icon: Users },
    { id: 'contact' as PageType, label: 'تواصل وشراكات', icon: Mail },
  ];

  const handleNavClick = (page: PageType) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F2840]/95 backdrop-blur-md border-b border-[#23486A] text-white">
      {/* Top Banner: Verification Notice */}
      <div className="bg-[#1667A5] text-xs text-white/95 py-1.5 px-4 text-center font-medium border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span>فرص تطوع وتكوين وأنشطة للشباب من مصادرها الرسمية.</span>
          <span className="hidden sm:inline text-white/60">|</span>
          <span className="hidden sm:inline text-white/90">يُرجى مراجعة الموقع الرسمي قبل إرسال طلبك.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
          >
            <div className="relative w-12 h-12 bg-white/10 rounded-xl p-1 flex items-center justify-center border border-white/15 shadow-sm group-hover:border-emerald-400/60 transition-colors">
              <img
                src="/ForsaConnect_Logo.png"
                alt="شعار ForsaConnect"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-heading tracking-wide text-white">
                  Forsa<span className="text-[#259A6A]">Connect</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 font-normal">«طريقك نحو الفرص» · منصة شبابية غير ربحية</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = route.page === item.id || (item.id === 'opportunities' && route.page === 'opportunity-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1667A5] text-white shadow-sm ring-1 ring-white/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="inline-flex items-center justify-center bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('submit')}
              className="inline-flex items-center gap-2 bg-[#259A6A] hover:bg-[#1E7D56] text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>اقترح فرصة</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1D30] border-b border-[#23486A] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = route.page === item.id || (item.id === 'opportunities' && route.page === 'opportunity-detail');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#1667A5] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-amber-400 text-slate-900 text-xs font-bold rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => handleNavClick('submit')}
              className="w-full flex items-center justify-center gap-2 bg-[#259A6A] text-white py-3 rounded-xl font-bold text-base shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>اقترح فرصة للشباب</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
