export type PresenceStatus = 'online' | 'in-game' | 'offline';
export type DataSource = 'verified' | 'estimated';
export type GameCategory = 'Adventure' | 'Simulator' | 'Obby' | 'Roleplay' | 'Shooter' | 'Racing';

export interface Player {
  id: string;
  username: string;
  displayName: string;
  status: PresenceStatus;
  currentGame?: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  /** Demo only. Real player counts arrive in Phase 4. */
  playersNow: number;
  gradient: string;
}

export interface Session {
  id: string;
  game: string;
  when: string;
  minutes: number;
  source: DataSource;
}

export interface DailyActivity {
  day: string;
  verified: number;
  estimated: number;
}

export interface Post {
  id: string;
  author: string;
  body: string;
  when: string;
}

export interface Party {
  id: string;
  name: string;
  game: string;
  host: string;
  members: number;
  capacity: number;
}

export interface DemoUser {
  username: string;
  displayName: string;
}
