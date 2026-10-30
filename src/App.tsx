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
import { Opportunity, SubmissionDraft } from './types';

const INITIAL_OPPORTUNITIES: Opportunity[] = rawOpportunities as Opportunity[];

function MainAppContent() {
  const { route, navigate } = useRouter();

  // Local submissions from localStorage
  const [drafts, setDrafts] = useState<SubmissionDraft[]>(() => {
    try {
      const saved = localStorage.getItem('forsaconnect_draft_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Approved custom opportunities added to active catalog
  const [customOpportunities, setCustomOpportunities] = useState<Opportunity[]>(() => {
    try {
      const saved = localStorage.getItem('forsaconnect_custom_approved_ops');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save drafts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('forsaconnect_draft_submissions', JSON.stringify(drafts));
    } catch (e) {
      console.error('Failed to save drafts to localStorage', e);
    }
  }, [drafts]);

  // Save approved custom opportunities
  useEffect(() => {
    try {
      localStorage.setItem('forsaconnect_custom_approved_ops', JSON.stringify(customOpportunities));
    } catch (e) {
      console.error('Failed to save custom opportunities', e);
    }
  }, [customOpportunities]);

  // Combined opportunities pool
  const allOpportunities = useMemo(() => {
    return [...customOpportunities, ...INITIAL_OPPORTUNITIES];
  }, [customOpportunities]);

  // Scope count calculations
  const moroccoCount = useMemo(() => allOpportunities.filter((x) => x.scope === 'داخل المغرب').length, [allOpportunities]);
  const abroadCount = useMemo(() => allOpportunities.filter((x) => x.scope === 'خارج المغرب').length, [allOpportunities]);
  const remoteCount = useMemo(() => allOpportunities.filter((x) => x.scope === 'عن بعد').length, [allOpportunities]);

  // Handlers for drafts
  const handleAddDraft = (draft: SubmissionDraft) => {
    setDrafts((prev) => [draft, ...prev]);
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleApproveDraft = (draft: SubmissionDraft) => {
    const newOpportunity: Opportunity = {
      id: draft.id,
      title_ar: draft.title,
      category: draft.category,
      scope: draft.scope,
      location: draft.location,
      organization: draft.organizer,
      description_ar: draft.description,
      eligibility_ar: draft.eligibility,
      event_date: 'معلن عبر الرابط',
      application_deadline: draft.deadline,
      cost_ar: draft.cost,
      application_method_ar: 'التقديم عبر الرابط الرسمي',
      verification_status: 'بحاجة إلى تحقق',
      source_url: draft.url,
      notes_ar: 'تمت الموافقة عليه محلياً في النسخة التجريبية؛ لم يجرِ التحقق المستقل من الجهة أو من فتح التسجيل.',
      verified_on: new Date().toISOString().split('T')[0],
      isCustom: true,
      adminStatus: 'approved',
    };

    setCustomOpportunities((prev) => [newOpportunity, ...prev]);
    setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
    // Navigate directly to the newly approved opportunity's page!
    navigate('opportunity-detail', newOpportunity.id);
  };

  const handleRejectDraft = (id: string, reason: string) => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'rejected', adminNotes: reason } : d))
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] dark:bg-[#0A1D30] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar draftCount={drafts.length} />

      <main className="flex-1">
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
          <SubmitPage
            drafts={drafts}
            onAddDraft={handleAddDraft}
            onDeleteDraft={handleDeleteDraft}
            onSimulateApprove={handleApproveDraft}
          />
        )}

        {route.page === 'admin' && (
          <AdminPage
            drafts={drafts}
            onApprove={handleApproveDraft}
            onReject={handleRejectDraft}
            onDelete={handleDeleteDraft}
            customApprovedCount={customOpportunities.length}
          />
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
