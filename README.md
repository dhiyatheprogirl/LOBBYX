# Roblox Hub

An independent community site for Roblox players. Not affiliated with or endorsed by Roblox Corporation.

## Status: Phase 1 of 6 (frontend with demo data)

| Phase | Scope | State |
|------|-------|-------|
| 1 | Frontend, homepage, sign-in interface, dashboard (demo data) | **Done** |
| 2 | Supabase database, Row Level Security, auth | Not started |
| 3 | Roblox OAuth 2.0 | Not started |
| 4 | Roblox game discovery and player info | Not started |
| 5 | Playtime tracking | Not started |
| 6 | Friends, parties, community | Not started |

### What works in Phase 1
- All routes and navigation (`/`, `/login`, `/dashboard`, `/games`, `/community`, `/settings`)
- Responsive layout (sidebar on desktop, menu on mobile)
- Username form with validation and loading/error states
- Games page: search, category filters, favourites (saved in your browser)
- Community page: player search, local-only friend request state, validated post form (local only)
- Settings: tracking preference toggle (saved in your browser)
- Recharts weekly chart separating verified and estimated playtime

### What is NOT real yet
- **Sign-in is a local demo session.** It does not verify a Roblox account. The "Continue with Roblox" button is disabled until Phase 3.
- **All games, players, sessions, friends, posts and playtime numbers are fictional** (see `src/data/demoData.ts`) and are labelled as demo in the UI.
- **Nothing is tracked.** The tracking toggle only stores a preference.
- No backend, no database, no API keys.

> Roblox does not provide a complete personal playtime history through its public APIs.
> Later phases will only record sessions that can actually be observed and will label
> anything inferred as *estimated*.

## Installation

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run typecheck
```

No environment variables are needed for Phase 1. See `.env.example` for what later phases will use.
Never commit `.env`; it is git-ignored.

## Database setup

Not applicable until Phase 2. Phase 2 will add `supabase/migrations/` with tables, indexes and
Row Level Security policies, plus setup instructions here.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel (framework preset: Vite).
3. `vercel.json` already rewrites all routes to `index.html` for client-side routing.

## Project structure

```
src/
  components/
    layout/   AppShell, PublicLayout, ProtectedRoute
    ui/       Button, Card, Badge, Avatar, StatCard, StatusDot, DemoBanner, EmptyState, Spinner, Logo
  context/    AuthContext (demo session in Phase 1)
  data/       demoData.ts (ALL fictional)
  hooks/      useLocalStorage
  lib/        format helpers, button styles
  pages/      Home, Login, Dashboard, Games, Community, Settings, NotFound
  types/      shared TypeScript types
```
