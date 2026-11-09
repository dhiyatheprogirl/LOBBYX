import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DemoBanner from '../components/ui/DemoBanner';
import { useAuth } from '../context/AuthContext';
import { validateRobloxUsername } from '../lib/format';

export default function Login() {
  const { user, signInDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const [username, setUsername] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const problem = validateRobloxUsername(username) ?? (agreed ? null : 'Please confirm you understand this is a demo.');
    setError(problem);
    if (problem) return;
    setLoading(true);
    // Short delay only to demonstrate the loading state. No network call happens.
    window.setTimeout(() => {
      signInDemo(username.trim());
      navigate(from, { replace: true });
    }, 500);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="animate-fade-up space-y-5">
        <div>
          <h1 className="text-2xl font-semibold text-white">Sign in</h1>
          <p className="mt-1 text-sm text-zinc-400">Create your Roblox Hub profile.</p>
        </div>

        <Button disabled className="w-full" title="Roblox OAuth is added in Phase 3">
          <Lock className="h-4 w-4" aria-hidden /> Continue with Roblox (Phase 3)
        </Button>
        <p className="-mt-3 text-xs text-zinc-500">
          Real sign-in will use Roblox OAuth 2.0. This site will never ask for your Roblox password.
        </p>

        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="h-px flex-1 bg-ink-600" /> OR PREVIEW THE APP <span className="h-px flex-1 bg-ink-600" />
        </div>

        <DemoBanner>This creates a local preview session in your browser only. It does not verify you own any Roblox account.</DemoBanner>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-zinc-300">
              Demo display name
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'login-error' : undefined}
              placeholder="e.g. BlockBuilder42"
              className="mt-1.5 w-full rounded-lg border border-ink-500 bg-ink-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <label className="flex items-start gap-2 text-sm text-zinc-400">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-ink-500 bg-ink-900 accent-brand-500"
            />
            I understand this is a demo with sample data.
          </label>
          {error && (
            <p id="login-error" role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}
          <Button type="submit" loading={loading} className="w-full">
            Enter demo
          </Button>
        </form>
      </Card>
    </div>
  );
}
