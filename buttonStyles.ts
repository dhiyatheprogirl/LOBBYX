export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-500 active:scale-[0.98]',
  secondary: 'border border-ink-500 bg-ink-700 text-zinc-100 hover:border-brand-500/50 hover:bg-ink-600',
  ghost: 'text-zinc-300 hover:bg-ink-700 hover:text-white',
};

export function buttonClass(variant: ButtonVariant = 'primary', extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`;
}
