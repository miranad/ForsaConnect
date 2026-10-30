import React, { useState, useMemo, useEffect } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { OpportunityDetailPage } from './pages/OpportunityDetailPage';
import { SubmitPage } from './pages/SubmitPage';
import { AdminPage } from './pages/AdminPage';
import { VerificationPage } from './pages/VerificationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import rawOpportunities from './data/opportunities.json';
import { Opportunity } from './types';
import { watchPublished } from './lib/submissions';

const INITIAL_OPPORTUNITIES: Opportunity[] = rawOpportunities as Opportunity[];

function MainAppContent() {
  const { route, navigate } = useRouter();

  const [customOpportunities, setCustomOpportunities] = useState<Opportunity[]>([]);
  const [catalogError, setCatalogError] = useState(false);
  useEffect(() => watchPublished(ops => { setCustomOpportunities(ops); setCatalogError(false); }, () => setCatalogError(true)), []);

  // Combined opportunities pool
  const allOpportunities = useMemo(() => {
    return [...customOpportunities, ...INITIAL_OPPORTUNITIES];
  }, [customOpportunities]);

  // Scope count calculations
  const moroccoCount = useMemo(() => allOpportunities.filter((x) => x.scope === 'داخل المغرب').length, [allOpportunities]);
  const abroadCount = useMemo(() => allOpportunities.filter((x) => x.scope === 'خارج المغرب').length, [allOpportunities]);
  const remoteCount = useMemo(() => allOpportunities.filter((x) => x.scope === 'عن بعد').length, [allOpportunities]);

  return (
    <div className="min-h-screen bg-[#F5F8FC] dark:bg-[#0A1D30] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar draftCount={0} />

      <main className="flex-1">
        {catalogError && <p role="status" className="p-3 text-center bg-amber-50 text-amber-900">تعذر تحديث الفرص الجديدة. يمكنك تصفح الفرص المتاحة والمحاولة لاحقاً.</p>}
        {route.page === 'home' && (
          <HomePage
            opportunities={allOpportunities}
            moroccoCount={moroccoCount}
            abroadCount={abroadCount}
            remoteCount={remoteCount}
          />
        )}

        {route.page === 'opportunities' && (
          <OpportunitiesPage
            opportunities={allOpportunities}
            initialScope={route.scopeFilter}
            initialCategory={route.categoryFilter}
          />
        )}

        {route.page === 'opportunity-detail' && (
          <OpportunityDetailPage
            opportunities={allOpportunities}
            id={route.id}
          />
        )}

        {route.page === 'submit' && (
          <SubmitPage />
        )}

        {route.page === 'admin' && (
          <AdminPage />
        )}

        {route.page === 'verification' && <VerificationPage />}

        {route.page === 'about' && <AboutPage />}

        {route.page === 'contact' && <ContactPage />}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <MainAppContent />
    </RouterProvider>
  );
}
