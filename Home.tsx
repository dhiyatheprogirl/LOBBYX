import { Link } from 'react-router-dom';
import { Activity, Gamepad2, ShieldCheck, Users } from 'lucide-react';
import { buttonClass } from '../lib/buttonStyles';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const features = [
  { icon: Activity, title: 'Playtime you can trust', text: 'Verified and estimated playtime are always shown separately. Nothing is ever made up.' },
  { icon: Gamepad2, title: 'Game explorer', text: 'Search experiences, filter by category and save favourites.' },
  { icon: Users, title: 'Player community', text: 'Find players, build friend lists, form parties and start discussions.' },
  { icon: ShieldCheck, title: 'Safe sign-in', text: 'Planned Roblox OAuth login. The site will never ask for your Roblox password.' },
];

const phases = [
  { n: 1, name: 'Frontend and demo dashboard', state: 'current' },
  { n: 2, name: 'Supabase database and auth', state: 'planned' },
  { n: 3, name: 'Roblox OAuth', state: 'planned' },
  { n: 4, name: 'Game discovery and player info', state: 'planned' },
  { n: 5, name: 'Playtime tracking', state: 'planned' },
  { n: 6, name: 'Friends, parties and community', state: 'planned' },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:pt-28">
        <div className="animate-fade-up">
          <Badge tone="demo">Phase 1 preview: demo data only</Badge>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your Roblox life, in <span className="bg-gradient-to-r from-brand-400 to-sky2-400 bg-clip-text text-transparent">one hub</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Discover games, connect with other players and keep an honest record of your playtime.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login" className={buttonClass('primary', 'px-6 py-3')}>
              Get started
            </Link>
            <a href="#roadmap" className={buttonClass('secondary', 'px-6 py-3')}>
              View roadmap
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="hover:border-brand-500/40">
            <Icon className="h-5 w-5 text-brand-400" aria-hidden />
            <h2 className="mt-4 font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{text}</p>
          </Card>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4">
        <Card>
          <h2 className="text-lg font-semibold text-white">An honest note about playtime</h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Roblox does not provide a complete personal playtime history through its public APIs. Roblox Hub will only record sessions it can actually observe, label anything inferred as
            <em> estimated</em>, and let you pause or disable tracking at any time.
          </p>
        </Card>
      </section>

      <section id="roadmap" className="mx-auto mt-16 max-w-6xl scroll-mt-24 px-4 pb-20">
        <h2 className="text-lg font-semibold text-white">Roadmap</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((p) => (
            <li key={p.n} className="flex items-center justify-between rounded-lg border border-ink-600 bg-ink-800/60 px-4 py-3">
              <span className="text-sm text-zinc-300">
                <span className="mr-2 text-zinc-500">Phase {p.n}</span>
                {p.name}
              </span>
              <Badge tone={p.state === 'current' ? 'verified' : 'neutral'}>{p.state === 'current' ? 'In progress' : 'Planned'}</Badge>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
