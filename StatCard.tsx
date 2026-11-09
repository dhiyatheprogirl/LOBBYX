import type { ReactNode } from 'react';
import Card from './Card';

export default function StatCard({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon: ReactNode }) {
  return (
    <Card className="animate-fade-up hover:border-brand-500/40">
      <div className="flex items-center justify-between text-zinc-400">
        <span className="text-sm">{label}</span>
        <span className="text-brand-400">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </Card>
  );
}
