import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Gamepad2, LayoutDashboard, LogOut, Menu, Settings, Users, X } from 'lucide-react';
import Logo from '../ui/Logo';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/games', label: 'Games', icon: Gamepad2 },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/');
  }

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
              isActive ? 'bg-brand-600/15 text-brand-300' : 'text-zinc-400 hover:bg-ink-700 hover:text-white'
            }`
          }
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  const account = user && (
    <div className="border-t border-ink-600 pt-4">
      <div className="flex items-center gap-3 px-1">
        <Avatar name={user.username} size={36} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{user.username}</p>
          <p className="text-xs text-amber-300/80">Demo session</p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-ink-700 hover:text-white"
      >
        <LogOut className="h-4 w-4" aria-hidden /> Sign out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between border-r border-ink-600/60 bg-ink-900/60 p-4 lg:flex">
        <div className="space-y-8">
          <div className="px-1 pt-1">
            <Logo />
          </div>
          {nav}
        </div>
        {account}
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink-600/60 bg-ink-900/80 px-4 backdrop-blur lg:hidden">
          <Logo />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-lg p-2 text-zinc-300 hover:bg-ink-700"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>
        {open && (
          <div className="animate-fade-up space-y-6 border-b border-ink-600 bg-ink-800 p-4 lg:hidden">
            {nav}
            {account}
          </div>
        )}
        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
