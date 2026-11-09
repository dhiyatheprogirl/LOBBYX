import { useMemo, useState } from 'react';
import { ExternalLink, Search, Star, Users } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DemoBanner from '../components/ui/DemoBanner';
import EmptyState from '../components/ui/EmptyState';
import { demoGames } from '../data/demoData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatCount } from '../lib/format';
import { buttonClass } from '../lib/buttonStyles';
import type { GameCategory } from '../types';

const categories: Array<'All' | GameCategory> = ['All', 'Adventure', 'Simulator', 'Obby', 'Roleplay', 'Shooter', 'Racing'];

export default function Games() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | GameCategory>('All');
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [favourites, setFavourites] = useLocalStorage<string[]>('rh-favourites', ['g1', 'g3']);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoGames.filter(
      (g) =>
        (category === 'All' || g.category === category) &&
        (!favouritesOnly || favourites.includes(g.id)) &&
        (q === '' || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)),
    );
  }, [query, category, favouritesOnly, favourites]);

  function toggleFavourite(id: string) {
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Game explorer</h1>
          <p className="text-sm text-zinc-500">Search and filter sample experiences.</p>
        </div>
        <a href="https://www.roblox.com/discover" target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
          Browse real games on Roblox <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <DemoBanner>These are placeholder games with invented player counts. Real Roblox experiences are loaded in Phase 4.</DemoBanner>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games"
            aria-label="Search games"
            className="w-full rounded-lg border border-ink-500 bg-ink-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                category === c ? 'border-brand-500 bg-brand-600/20 text-brand-300' : 'border-ink-500 text-zinc-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={() => setFavouritesOnly((v) => !v)}
            aria-pressed={favouritesOnly}
            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors ${
              favouritesOnly ? 'border-brand-500 bg-brand-600/20 text-brand-300' : 'border-ink-500 text-zinc-400 hover:text-white'
            }`}
          >
            <Star className="h-3 w-3" aria-hidden /> Favourites
          </button>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState title="No games found" message="Try a different search or category." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((g) => {
            const isFav = favourites.includes(g.id);
            return (
              <li key={g.id} className="animate-fade-up">
                <Card className="flex h-full flex-col overflow-hidden p-0 hover:border-brand-500/40">
                  <div className={`flex h-28 items-start justify-between bg-gradient-to-br ${g.gradient} p-3`}>
                    <Badge tone="demo">Sample</Badge>
                    <button
                      onClick={() => toggleFavourite(g.id)}
                      aria-pressed={isFav}
                      aria-label={isFav ? `Remove ${g.name} from favourites` : `Add ${g.name} to favourites`}
                      className="rounded-full bg-black/30 p-1.5 text-white transition hover:bg-black/50"
                    >
                      <Star className={`h-4 w-4 ${isFav ? 'fill-brand-300 text-brand-300' : ''}`} />
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-semibold text-white">{g.name}</h2>
                      <Badge>{g.category}</Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{g.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Users className="h-3.5 w-3.5" aria-hidden /> {formatCount(g.playersNow)} (demo)
                      </span>
                      <Button variant="secondary" disabled title="Launch links are added in Phase 4" className="px-3 py-1.5 text-xs">
                        Launch (Phase 4)
                      </Button>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
