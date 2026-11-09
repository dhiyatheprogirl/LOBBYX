import type { HTMLAttributes } from 'react';

export default function Card({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`rounded-xl border border-ink-600 bg-ink-800/80 p-5 backdrop-blur transition-colors duration-200 ${className}`}
    />
  );
}
