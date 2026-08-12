import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, User } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/profile', label: 'Profile', icon: User },
] as const

/**
 * Fixed bottom navigation bar — visible on mobile, hidden on md+ screens.
 * Active route is highlighted with the electric-lime primary colour.
 */
export default function BottomNav() {
  return (
    <nav
      className={[
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-background/90 backdrop-blur-md border-t border-ink-line',
        'nav-safe-bottom',
        'md:hidden',
      ].join(' ')}
      aria-label="Main navigation"
    >
      <ul className="flex items-stretch max-w-screen-lg mx-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'relative flex flex-col items-center justify-center gap-1',
                  'py-2.5 min-h-[60px] w-full',
                  'text-[11px] font-medium transition-colors duration-150',
                  isActive ? 'text-primary' : 'text-ink-faint hover:text-ink-muted',
                ].join(' ')
              }
              aria-label={label}
            >
              {({ isActive }) => (
                <>
                  {/* Active top indicator bar */}
                  {isActive && (
                    <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary shadow-[0_0_10px_0_rgb(182_243_74_/_0.8)]" />
                  )}
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
