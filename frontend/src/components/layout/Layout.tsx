import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

/** Maps route paths to human-readable page titles */
const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/exercises': 'Exercises',
  '/workout': 'Live Workout',
  '/session-summary': 'Session Summary',
  '/progress': 'Progress',
  '/profile': 'Profile',
}

/**
 * Application shell — a light "health companion" canvas.
 *
 * Structure:
 *   ┌─────────────────────┐
 *   │   Glass header      │
 *   ├─────────────────────┤
 *   │   Main (scrollable) │
 *   │                     │
 *   │   Floating pill nav │
 *   └─────────────────────┘
 */
export default function Layout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'Health Companion'

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-40 glass border-b border-white/40">
        <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center justify-between">
          {/* App brand mark */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center shadow-[0_6px_16px_-6px_rgb(31_42_36_/_0.7)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                {/* Simple human figure / pose icon */}
                <circle cx="12" cy="4" r="1.5" />
                <path d="M12 6v5M9 8l3 3 3-3M12 11l-2 5M12 11l2 5" />
              </svg>
            </span>
            <span className="font-bold text-ink text-sm tracking-tight">
              Fit<span className="text-primary-dark">Coach</span>
            </span>
          </div>

          {/* Current page title — centred */}
          <h1 className="absolute left-1/2 -translate-x-1/2 eyebrow pointer-events-none">
            {title}
          </h1>

          {/* Live status pill */}
          <div className="flex items-center gap-1.5 rounded-full bg-white/60 border border-white/70 px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] text-ink-muted">v0.1</span>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────── */}
      <main
        className={[
          'flex-1 overflow-y-auto',
          'max-w-screen-lg mx-auto w-full',
          'px-4 py-6',
          'pb-32',
        ].join(' ')}
      >
        <Outlet />
      </main>

      {/* ── Floating pill navigation ─────────────────────── */}
      <BottomNav />
    </div>
  )
}
