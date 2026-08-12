import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  // Near-black "ink" pill — the primary call to action
  primary:
    'bg-ink text-white font-semibold hover:bg-ink/90 active:bg-ink ' +
    'shadow-[0_10px_28px_-10px_rgb(31_42_36_/_0.7)] ' +
    'disabled:bg-ink/30 disabled:text-white/60 disabled:shadow-none disabled:cursor-not-allowed',
  // Sage-green solid — secondary emphasis
  secondary:
    'bg-primary text-white font-semibold hover:bg-primary-dark active:bg-primary-dark ' +
    'shadow-[0_10px_26px_-12px_rgb(71_129_79_/_0.8)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
  // Quiet glass outline
  outline:
    'glass text-ink font-medium hover:bg-white/80 ' +
    'active:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-full',
  md: 'px-5 py-2.5 text-base rounded-full',
  lg: 'px-6 py-3.5 text-base rounded-full',
}

/**
 * Reusable button component.
 * Supports primary (ink pill), secondary (sage), and outline (glass) variants.
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
        'inline-flex items-center justify-center gap-2',
        'transition-all duration-150 select-none',
        'min-h-[44px]', // WCAG touch target minimum
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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
