import type { ReactNode } from 'react';
import { FlaskConical } from 'lucide-react';

export default function DemoBanner({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
      <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <p>
        <strong className="font-semibold">Demo data.</strong>{' '}
        {children ?? 'Everything on this page is fictional sample data for Phase 1. Nothing here comes from Roblox.'}
      </p>
    </div>
  );
}
