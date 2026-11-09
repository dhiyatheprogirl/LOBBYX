import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from '../ui/Logo';
import { buttonClass } from '../../lib/buttonStyles';
import { useAuth } from '../../context/AuthContext';

export default function PublicLayout() {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-ink-600/60 bg-ink-900/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={({ isActive }) => buttonClass('ghost', isActive ? 'text-white' : '')}>
              Home
            </NavLink>
            {user ? (
              <Link to="/dashboard" className={buttonClass('primary')}>
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className={buttonClass('primary')}>
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-ink-600/60 py-8 text-center text-xs text-zinc-500">
        <p>Roblox Hub is an independent community project and is not affiliated with or endorsed by Roblox Corporation.</p>
      </footer>
    </div>
  );
}
