import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { DemoUser } from '../types';

// PHASE 1 ONLY: this is a local demo session, NOT real authentication.
// It is replaced by Supabase sessions + Roblox OAuth in Phases 2 and 3.
interface AuthValue {
  user: DemoUser | null;
  signInDemo: (username: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<DemoUser | null>('rh-demo-user', null);

  const signInDemo = useCallback(
    (username: string) => setUser({ username, displayName: username }),
    [setUser],
  );
  const signOut = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(() => ({ user, signInDemo, signOut }), [user, signInDemo, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
