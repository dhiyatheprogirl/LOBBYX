import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold text-white">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-sky2-500 text-sm font-bold">
        H
      </span>
      Roblox Hub
    </Link>
  );
}
