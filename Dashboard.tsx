import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarDays, Clock, PauseCircle, Timer, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import DemoBanner from '../components/ui/DemoBanner';
import StatCard from '../components/ui/StatCard';
import StatusDot from '../components/ui/StatusDot';
import { useAuth } from '../context/AuthContext';
import { demoFriends, demoGames, demoSessions, demoTotalMinutes, demoWeek } from '../data/demoData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatMinutes } from '../lib/format';

export default function Dashboard() {
  const { user } = useAuth();
  const [favourites] = useLocalStorage<string[]>('rh-favourites', ['g1', 'g3']);
  const [trackingEnabled] = useLocalStorage<boolean>('rh-tracking', true);

  const today = demoWeek[demoWeek.length - 1];
  const todayMinutes = today.verified + today.estimated;
  const weekMinutes = demoWeek.reduce((sum, d) => sum + d.verified + d.estimated, 0);
  const favGames = demoGames.filter((g) => favourites.includes(g.id));

  return (
    <div className="space-y-6">
      <div className="animate-fade-up flex items-center gap-4">
        <Avatar name={user?.username ?? '?'} size={56} />
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome back, {user?.displayName}</h1>
          <p className="text-sm text-zinc-500">Roblox user ID: not linked (available after Phase 3)</p>
        </div>
      </div>

      <DemoBanner />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total playtime" value={formatMinutes(demoTotalMinutes)} hint="Demo value" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Today" value={formatMinutes(todayMinutes)} hint="Demo value" icon={<Timer className="h-4 w-4" />} />
        <StatCard label="This week" value={formatMinutes(weekMinutes)} hint="Demo value" icon={<CalendarDays className="h-4 w-4" />} />
        <StatCard
          label="Tracking"
          value={trackingEnabled ? 'Enabled' : 'Paused'}
          hint={trackingEnabled ? 'Nothing is tracked in Phase 1' : 'You paused tracking'}
          icon={<PauseCircle className="h-4 w-4" />}
        />
      </section>

      <Card className="animate-fade-up">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold text-white">Weekly activity (minutes)</h2>
          <div className="flex gap-2">
            <Badge tone="verified">Verified</Badge>
            <Badge tone="estimated">Estimated</Badge>
          </div>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Verified = sessions directly observed. Estimated = inferred from limited signals. Sample numbers only.
        </p>
        <div className="mt-4 h-64" role="img" aria-label="Stacked bar chart of demo weekly playtime in minutes">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demoWeek} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3d" vertical={false} />
              <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(139,92,246,0.08)' }}
                contentStyle={{ background: '#111118', border: '1px solid #2e2e3d', borderRadius: 8, color: '#e4e4e7' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="verified" name="Verified" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="estimated" name="Estimated" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-white">Recent sessions</h2>
          <ul className="mt-4 divide-y divide-ink-600">
            {demoSessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-100">{s.game}</p>
                  <p className="text-xs text-zinc-500">{s.when}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-300">{formatMinutes(s.minutes)}</span>
                  <Badge tone={s.source}>{s.source === 'verified' ? 'Verified' : 'Estimated'}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-semibold text-white">Friends</h2>
          <ul className="mt-4 divide-y divide-ink-600">
            {demoFriends.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={f.username} size={34} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-100">{f.displayName}</p>
                    {f.currentGame && <p className="truncate text-xs text-zinc-500">{f.currentGame}</p>}
                  </div>
                </div>
                <StatusDot status={f.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <Star className="h-4 w-4 text-brand-400" aria-hidden /> Favourite games
          </h2>
          <Link to="/games" className="text-sm text-brand-300 hover:text-brand-400">
            Browse games
          </Link>
        </div>
        {favGames.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No favourites yet. Star games in the Games page to see them here.</p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favGames.map((g) => (
              <li key={g.id} className={`rounded-lg bg-gradient-to-br ${g.gradient} p-4`}>
                <p className="font-medium text-white">{g.name}</p>
                <p className="text-xs text-zinc-300/80">{g.category}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
