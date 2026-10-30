import React from 'react';
import { Home, Users } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { AboutSection } from '../components/AboutSection';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="py-8 sm:py-12 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center gap-1 hover:text-[#1667A5] dark:hover:text-sky-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </button>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">من نحن والاستبيان الكشفي</span>
        </nav>

        <AboutSection />
      </div>
    </div>
  );
};
