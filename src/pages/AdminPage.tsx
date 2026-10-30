import React from 'react';
import { Home, ShieldCheck } from 'lucide-react';
import { SubmissionDraft } from '../types';
import { useRouter } from '../context/RouterContext';
import { AdminSimulatorSection } from '../components/AdminSimulatorSection';

interface AdminPageProps {
  drafts: SubmissionDraft[];
  onApprove: (draft: SubmissionDraft) => void;
  onReject: (id: string, reason: string) => void;
  onDelete: (id: string) => void;
  customApprovedCount: number;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  drafts,
  onApprove,
  onReject,
  onDelete,
  customApprovedCount,
}) => {
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
          <span className="text-slate-800 dark:text-slate-200 font-bold">لوحة الإشراف والمراجعة (تجريبية)</span>
        </nav>

        <AdminSimulatorSection
          drafts={drafts}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
          customApprovedCount={customApprovedCount}
        />
      </div>
    </div>
  );
};
