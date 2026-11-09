import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DemoBanner from '../components/ui/DemoBanner';
import EmptyState from '../components/ui/EmptyState';
import StatusDot from '../components/ui/StatusDot';
import { useAuth } from '../context/AuthContext';
import { demoDiscover, demoFriends, demoParties, demoPosts } from '../data/demoData';
import type { Post } from '../types';

type Tab = 'players' | 'parties' | 'discussion';
const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'players', label: 'Players' },
  { id: 'parties', label: 'Parties' },
  { id: 'discussion', label: 'Discussion' },
];

export default function Community() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('players');
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>(demoPosts);
  const [draft, setDraft] = useState('');
  const [postError, setPostError] = useState<string | null>(null);

  const everyone = [...demoDiscover, ...demoFriends];
  const q = query.trim().toLowerCase();
  const filtered = everyone.filter((p) => q === '' || p.username.toLowerCase().includes(q) || p.displayName.toLowerCase().includes(q));
  const friendIds = new Set(demoFriends.map((f) => f.id));

  function submitPost(e: FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (body.length < 3) return setPostError('Write at least 3 characters.');
    if (body.length > 280) return setPostError('Posts are limited to 280 characters.');
    setPostError(null);
    setPosts((prev) => [{ id: crypto.randomUUID(), author: user?.username ?? 'You', body, when: 'Just now' }, ...prev]);
    setDraft('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Community</h1>
        <p className="text-sm text-zinc-500">Players, parties and discussion.</p>
      </div>
      <DemoBanner>
        Players, parties and posts are sample data. Actions in this page only change what you see locally and are lost on refresh. Real social features arrive in Phase 6.
      </DemoBanner>

      <div role="tablist" aria-label="Community sections" className="flex gap-1 border-b border-ink-600">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm transition-colors ${
              tab === t.id ? 'border-brand-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'players' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players"
              aria-label="Search players"
              className="w-full rounded-lg border border-ink-500 bg-ink-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No players found" message="Try a different search." />
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {filtered.map((p) => {
                const isFriend = friendIds.has(p.id);
                const isPending = pending.includes(p.id);
                return (
                  <li key={p.id}>
                    <Card className="flex items-center justify-between gap-3 p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar name={p.username} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">{p.displayName}</p>
                          <StatusDot status={p.status} />
                        </div>
                      </div>
                      {isFriend ? (
                        <Badge>Friend</Badge>
                      ) : (
                        <Button
                          variant="secondary"
                          className="px-3 py-1.5 text-xs"
                          disabled={isPending}
                          onClick={() => setPending((prev) => [...prev, p.id])}
                        >
                          {isPending ? 'Request sent (demo)' : 'Add friend'}
                        </Button>
                      )}
                    </Card>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {tab === 'parties' && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {demoParties.map((p) => (
            <li key={p.id}>
              <Card>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-white">{p.name}</h2>
                  <Badge tone="demo">Sample</Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-400">{p.game}</p>
                <p className="mt-3 text-xs text-zinc-500">
                  Host: {p.host} · {p.members}/{p.capacity} members
                </p>
                <Button variant="secondary" disabled title="Parties are built in Phase 6" className="mt-4 px-3 py-1.5 text-xs">
                  Join (Phase 6)
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {tab === 'discussion' && (
        <div className="space-y-4">
          <Card>
            <form onSubmit={submitPost} noValidate className="space-y-3">
              <label htmlFor="post" className="text-sm font-medium text-zinc-300">
                Start a discussion
              </label>
              <textarea
                id="post"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                maxLength={300}
                aria-invalid={postError ? true : undefined}
                className="w-full resize-none rounded-lg border border-ink-500 bg-ink-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Share something with the community"
              />
              {postError && (
                <p role="alert" className="text-sm text-red-400">
                  {postError}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">{draft.trim().length}/280</span>
                <Button type="submit">Post (local demo)</Button>
              </div>
            </form>
          </Card>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.id} className="animate-fade-up">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.author} size={32} />
                    <div>
                      <p className="text-sm font-medium text-white">{p.author}</p>
                      <p className="text-xs text-zinc-500">{p.when}</p>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-300">{p.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
