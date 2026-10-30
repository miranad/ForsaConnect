import React from 'react';
import { Compass, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1A2A] text-slate-300 border-t border-[#1C3A54] pt-14 pb-10 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Mission (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 text-right focus:outline-none"
            >
              <div className="w-10 h-10 bg-white/10 rounded-xl p-1 flex items-center justify-center border border-white/15">
                <img
                  src="/ForsaConnect_Logo.png"
                  alt="ForsaConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-black font-heading text-white">
                Forsa<span className="text-[#259A6A]">Connect</span>
              </span>
            </button>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              «طريقك نحو الفرص» · منصة شبابية غير ربحية تجمع فرص التطوع، التكوين، المنح، والأنشطة في المغرب وخارجه من مصادرها الرسمية الموثوقة.
            </p>
            <p className="text-xs text-slate-500">
              انطلقت كمبادرة كشفية من فريق «كشافة الأذكياء» (Smart Scouts) لدعم وتمكين الشباب المغربي.
            </p>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold font-heading text-white">صفحات المنصة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('opportunities')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  دليل الـ 25 فرصة الموثقة
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('submit')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  اقترح فرصة جديدة
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('admin')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  لوحة الإشراف والمراجعة (تجريبية)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('verification')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  عن التحقق والشفافية
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  من نحن ونتائج الاستبيان
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  تواصل وشراكات
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimers & Ethics (4 Cols) */}
          <div className="md:col-span-4 space-y-3 text-xs text-slate-400">
            <h4 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>إخلاء المسؤولية والأمان</span>
            </h4>
            <p className="leading-relaxed">
              منصة ForsaConnect لا تمثل المنظمات الناشرة ولا تضمن قبول طلبك. جميع الروابط تقود إلى المواقع الرسمية للجهات المعلنة.
            </p>
            <p className="leading-relaxed text-slate-500">
              تاريخ مراجعة بيانات البحث: <b>29 أكتوبر 2026</b>. يرجى التحقق المستقل من توفر المقاعد ومواعيد التسجيل الحالية قبل إرسال طلبك.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C3A54] flex items-center justify-between gap-4 flex-wrap text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ForsaConnect. مبادرة شبابية مجانية ومفتوحة.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors p-1"
            aria-label="الرجوع إلى أعلى الصفحة"
          >
            <span>إلى الأعلى</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
