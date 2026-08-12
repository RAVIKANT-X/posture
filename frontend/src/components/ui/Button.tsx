import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-background font-semibold hover:bg-primary-light active:bg-primary-dark ' +
    'shadow-[0_0_20px_-6px_rgb(182_243_74_/_0.6)] hover:shadow-[0_0_28px_-4px_rgb(182_243_74_/_0.75)] ' +
    'disabled:bg-primary/25 disabled:text-background/50 disabled:shadow-none disabled:cursor-not-allowed',
  secondary:
    'bg-surface-raised text-ink border border-ink-line hover:border-primary/50 hover:text-primary ' +
    'active:bg-surface disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'border border-ink-line text-ink-muted bg-transparent hover:border-primary/60 hover:text-primary ' +
    'active:bg-surface disabled:opacity-40 disabled:cursor-not-allowed',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
}

/**
 * Reusable button component.
 * Supports primary, secondary, and outline variants with three sizes.
 * Touch-friendly minimum target size enforced via min-h.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium',
        'transition-all duration-150 select-none',
        'min-h-[44px]', // WCAG touch target minimum
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
