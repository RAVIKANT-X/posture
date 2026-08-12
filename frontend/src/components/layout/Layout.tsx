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
 * Application shell — a dark "training console".
 *
 * Structure:
 *   ┌─────────────────────┐
 *   │       Header        │
 *   ├─────────────────────┤
 *   │   Main (scrollable) │
 *   ├─────────────────────┤
 *   │   BottomNav (mobile)│
 *   └─────────────────────┘
 */
export default function Layout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'AI Fitness Coach'

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-ink-line">
        <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center justify-between">
          {/* App brand mark */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_18px_-4px_rgb(182_243_74_/_0.7)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0e1116"
                strokeWidth="2.4"
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
            <span className="font-semibold text-ink text-sm tracking-tight">
              FitCoach<span className="text-primary"> AI</span>
            </span>
          </div>

          {/* Current page title — centred */}
          <h1 className="absolute left-1/2 -translate-x-1/2 eyebrow pointer-events-none">
            {title}
          </h1>

          {/* Live status pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-ink-line px-2.5 py-1">
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
          'pb-28 md:pb-8',
        ].join(' ')}
      >
        <Outlet />
      </main>

      {/* ── Bottom navigation (mobile only) ──────────────── */}
      <BottomNav />
    </div>
  )
}
