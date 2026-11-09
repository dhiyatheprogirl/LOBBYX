export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(n);
}

// Roblox usernames: 3 to 20 characters, letters, numbers and at most one
// underscore, which cannot be at the start or the end.
export function validateRobloxUsername(value: string): string | null {
  const v = value.trim();
  if (v.length === 0) return 'Enter a username.';
  if (v.length < 3 || v.length > 20) return 'Usernames are 3 to 20 characters long.';
  if (!/^[A-Za-z0-9_]+$/.test(v)) return 'Use only letters, numbers and underscores.';
  if (v.startsWith('_') || v.endsWith('_')) return 'Usernames cannot start or end with an underscore.';
  if ((v.match(/_/g) ?? []).length > 1) return 'Only one underscore is allowed.';
  return null;
}
