// ALL DATA IN THIS FILE IS FICTIONAL DEMO DATA FOR PHASE 1.
// It is replaced by real Supabase / Roblox API data in later phases.
import type { DailyActivity, Game, Party, Player, Post, Session } from '../types';

export const demoGames: Game[] = [
  { id: 'g1', name: 'Sample Obby Run', description: 'A placeholder obstacle course used to preview the game card layout.', category: 'Obby', playersNow: 1240, gradient: 'from-violet-600/60 to-indigo-900/60' },
  { id: 'g2', name: 'Sample Tycoon Town', description: 'Placeholder simulator entry. Real descriptions come from Roblox in Phase 4.', category: 'Simulator', playersNow: 860, gradient: 'from-blue-600/50 to-slate-900/60' },
  { id: 'g3', name: 'Sample Kingdom Quest', description: 'Placeholder adventure experience with a long description to test text clamping across cards.', category: 'Adventure', playersNow: 2310, gradient: 'from-purple-700/60 to-zinc-900/60' },
  { id: 'g4', name: 'Sample Neighbourhood', description: 'Placeholder roleplay world used for layout testing only.', category: 'Roleplay', playersNow: 3120, gradient: 'from-fuchsia-700/40 to-slate-900/60' },
  { id: 'g5', name: 'Sample Arena Strike', description: 'Placeholder team shooter entry for the category filter.', category: 'Shooter', playersNow: 540, gradient: 'from-sky-700/50 to-zinc-900/60' },
  { id: 'g6', name: 'Sample Turbo Track', description: 'Placeholder racing game for the category filter.', category: 'Racing', playersNow: 310, gradient: 'from-indigo-700/50 to-zinc-900/60' },
  { id: 'g7', name: 'Sample Pet Garden', description: 'Placeholder simulator about growing a garden.', category: 'Simulator', playersNow: 1780, gradient: 'from-violet-700/40 to-blue-900/50' },
  { id: 'g8', name: 'Sample Sky Islands', description: 'Placeholder adventure exploring floating islands.', category: 'Adventure', playersNow: 690, gradient: 'from-blue-700/40 to-purple-900/50' },
];

export const demoFriends: Player[] = [
  { id: 'p1', username: 'DemoPlayer_One', displayName: 'Demo One', status: 'in-game', currentGame: 'Sample Obby Run' },
  { id: 'p2', username: 'DemoPlayer_Two', displayName: 'Demo Two', status: 'online' },
  { id: 'p3', username: 'DemoPlayer_Three', displayName: 'Demo Three', status: 'offline' },
  { id: 'p4', username: 'DemoPlayer_Four', displayName: 'Demo Four', status: 'in-game', currentGame: 'Sample Kingdom Quest' },
  { id: 'p5', username: 'DemoPlayer_Five', displayName: 'Demo Five', status: 'offline' },
];

export const demoDiscover: Player[] = [
  { id: 'd1', username: 'SampleUser_A', displayName: 'Sample A', status: 'online' },
  { id: 'd2', username: 'SampleUser_B', displayName: 'Sample B', status: 'offline' },
  { id: 'd3', username: 'SampleUser_C', displayName: 'Sample C', status: 'in-game', currentGame: 'Sample Tycoon Town' },
];

export const demoWeek: DailyActivity[] = [
  { day: 'Mon', verified: 45, estimated: 20 },
  { day: 'Tue', verified: 30, estimated: 35 },
  { day: 'Wed', verified: 0, estimated: 15 },
  { day: 'Thu', verified: 70, estimated: 25 },
  { day: 'Fri', verified: 55, estimated: 40 },
  { day: 'Sat', verified: 95, estimated: 60 },
  { day: 'Sun', verified: 40, estimated: 30 },
];

export const demoSessions: Session[] = [
  { id: 's1', game: 'Sample Obby Run', when: 'Today, 18:20', minutes: 40, source: 'verified' },
  { id: 's2', game: 'Sample Kingdom Quest', when: 'Today, 15:05', minutes: 30, source: 'estimated' },
  { id: 's3', game: 'Sample Tycoon Town', when: 'Yesterday, 20:10', minutes: 55, source: 'verified' },
  { id: 's4', game: 'Sample Pet Garden', when: 'Yesterday, 13:30', minutes: 25, source: 'estimated' },
];

export const demoTotalMinutes = 4260;

export const demoParties: Party[] = [
  { id: 'pt1', name: 'Friday obby night', game: 'Sample Obby Run', host: 'DemoPlayer_One', members: 3, capacity: 6 },
  { id: 'pt2', name: 'Quest co-op', game: 'Sample Kingdom Quest', host: 'DemoPlayer_Four', members: 2, capacity: 4 },
];

export const demoPosts: Post[] = [
  { id: 'po1', author: 'DemoPlayer_Two', body: 'Looking for people to try the new obstacle courses this weekend.', when: '2h ago' },
  { id: 'po2', author: 'SampleUser_A', body: 'What is everyone playing this week? Share your favourites.', when: '5h ago' },
];
