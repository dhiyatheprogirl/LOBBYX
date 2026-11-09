export default function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-500 px-6 py-12 text-center">
      <p className="font-medium text-zinc-200">{title}</p>
      <p className="mt-1 text-sm text-zinc-500">{message}</p>
    </div>
  );
}
