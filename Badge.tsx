import type { ReactNode } from 'react';

export type BadgeTone = 'demo' | 'verified' | 'estimated' | 'neutral';

const tones: Record<BadgeTone, string> = {
  demo: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  verified: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  estimated: 'border-sky2-500/30 bg-sky2-500/10 text-sky2-400',
  neutral: 'border-ink-500 bg-ink-700 text-zinc-300',
};

export default function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
