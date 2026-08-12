import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, User } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/profile', label: 'Profile', icon: User },
] as const

/**
 * Floating pill navigation — a frosted-glass bar that hovers above content.
 * The active route is marked with a solid near-black "ink" circle, echoing
 * the health-companion reference design.
 */
export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 nav-safe-bottom"
      aria-label="Main navigation"
    >
      <ul className="glass-strong flex items-center gap-1 rounded-full p-2 shadow-card-md">
        {navItems.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'relative flex items-center justify-center rounded-full transition-all duration-200',
                  'w-12 h-12',
                  isActive
                    ? 'bg-ink text-white shadow-[0_8px_18px_-6px_rgb(31_42_36_/_0.7)]'
                    : 'text-ink-muted hover:text-ink hover:bg-white/60',
                ].join(' ')
              }
              aria-label={label}
            >
              {({ isActive }) => (
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.9} aria-hidden="true" />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
