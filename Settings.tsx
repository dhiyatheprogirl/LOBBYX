import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DemoBanner from '../components/ui/DemoBanner';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tracking, setTracking] = useLocalStorage<boolean>('rh-tracking', true);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>
      <DemoBanner>Settings are stored in this browser only during Phase 1.</DemoBanner>

      <Card className="space-y-4">
        <h2 className="font-semibold text-white">Playtime tracking</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-200">Track my sessions</p>
            <p className="text-xs text-zinc-500">
              You can pause tracking at any time. No tracking exists yet in Phase 1, this saves your preference for later phases.
            </p>
          </div>
          <button
            role="switch"
            aria-checked={tracking}
            aria-label="Toggle playtime tracking"
            onClick={() => setTracking((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${tracking ? 'bg-brand-600' : 'bg-ink-500'}`}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${tracking ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold text-white">Account</h2>
        <p className="text-sm text-zinc-400">
          Signed in as <span className="text-white">{user?.username}</span> (demo session, not linked to Roblox).
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            signOut();
            navigate('/');
          }}
        >
          Sign out
        </Button>
      </Card>
    </div>
  );
}
