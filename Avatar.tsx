// Phase 1 shows initials. Real Roblox avatar images are loaded in Phase 3/4.
const palette = ['from-violet-500 to-indigo-600', 'from-blue-500 to-violet-600', 'from-purple-500 to-blue-600', 'from-indigo-500 to-purple-700'];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || '?';
  return (
    <div
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${palette[hash(name) % palette.length]}`}
    >
      {initials}
    </div>
  );
}
