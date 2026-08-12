import { Activity, Dumbbell, TrendingUp, Zap, ArrowRight, ScanLine } from 'lucide-react'
import Card from '../components/ui/Card'
import { useNavigate } from 'react-router-dom'

const statCards = [
  { label: 'Total Sessions', value: '—', icon: Activity, accent: 'text-primary' },
  { label: 'This Week', value: '—', icon: Zap, accent: 'text-warning' },
  { label: 'Avg. Accuracy', value: '—', icon: TrendingUp, accent: 'text-success' },
  { label: 'Exercises Done', value: '—', icon: Dumbbell, accent: 'text-ink-muted' },
]

/**
 * Home / Dashboard page.
 *
 * Presents the training console: a quick-start hero, key telemetry stats,
 * and a system-status readout. Live data arrives from the Progress module
 * in a later phase.
 */
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 animate-fade-up">
      {/* ── Welcome banner ── */}
      <div>
        <p className="eyebrow">Session ready</p>
        <h2 className="text-3xl font-bold text-ink mt-1 tracking-tight text-balance">
          Ready to move?
        </h2>
        <p className="text-ink-muted mt-1 text-sm">
          Set up in front of your camera and let the coach read your form.
        </p>
      </div>

      {/* ── Quick-start hero ── */}
      <Card
        elevated
        noPadding
        className="relative overflow-hidden cursor-pointer group"
        onClick={() => navigate('/exercises')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/exercises')
        }}
      >
        {/* Technical grid backdrop */}
        <div className="absolute inset-0 grid-backdrop opacity-[0.4]" aria-hidden="true" />
        <div
          className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative p-6 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <ScanLine size={16} aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                Start a session
              </span>
            </div>
            <p className="text-2xl font-bold text-ink mt-2">Begin Workout</p>
            <p className="text-ink-muted text-xs mt-1.5 max-w-[15rem]">
              Real-time pose analysis with live joint-angle tracking.
            </p>
          </div>

          <span className="shrink-0 w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 shadow-[0_0_22px_-4px_rgb(182_243_74_/_0.7)]">
            <ArrowRight size={22} strokeWidth={2.4} aria-hidden="true" />
          </span>
        </div>
      </Card>

      {/* ── Stat grid ── */}
      <div>
        <h3 className="eyebrow mb-3">Your Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {statCards.map(({ label, value, icon: Icon, accent }) => (
            <Card key={label} className="transition-colors hover:border-ink-muted/40">
              <div className="flex items-center justify-between">
                <Icon size={18} className={accent} aria-hidden="true" />
                <span className="w-1 h-1 rounded-full bg-ink-line" aria-hidden="true" />
              </div>
              <p className="font-mono text-3xl font-bold text-ink mt-3 tabular">{value}</p>
              <p className="text-xs text-ink-muted mt-1">{label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── System status ── */}
      <Card className="bg-surface-muted flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" aria-hidden="true" />
        <p className="font-mono text-[11px] text-ink-faint">
          SYSTEM READY · pose engine idle · awaiting session start
        </p>
      </Card>
    </div>
  )
}
