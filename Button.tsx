import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { buttonClass, type ButtonVariant } from '../../lib/buttonStyles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  type = 'button',
  children,
  ...rest
}: Props) {
  return (
    <button {...rest} type={type} disabled={disabled || loading} className={buttonClass(variant, className)}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
