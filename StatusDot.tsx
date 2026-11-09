import type { PresenceStatus } from '../../types';

const styles: Record<PresenceStatus, { dot: string; label: string }> = {
  online: { dot: 'bg-sky2-400', label: 'Online' },
  'in-game': { dot: 'bg-brand-400', label: 'In game' },
  offline: { dot: 'bg-zinc-600', label: 'Offline' },
};

export default function StatusDot({ status, showLabel = true }: { status: PresenceStatus; showLabel?: boolean }) {
  const s = styles[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {showLabel ? s.label : <span className="sr-only">{s.label}</span>}
    </span>
  );
}
