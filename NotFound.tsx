import { Link } from 'react-router-dom';
import { buttonClass } from '../lib/buttonStyles';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-5xl font-bold text-brand-400">404</p>
      <h1 className="mt-4 text-xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-zinc-400">That page does not exist.</p>
      <Link to="/" className={buttonClass('primary', 'mt-6')}>
        Back home
      </Link>
    </div>
  );
}
