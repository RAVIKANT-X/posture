import { Flame, Calendar, BarChart2 } from 'lucide-react'
import Card from '../components/ui/Card'

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/**
 * Progress / History page.
 *
 * Surfaces training streaks, weekly volume, and session history. Live data
 * is loaded from the backend progress endpoints in a later phase.
 */
export default function ProgressPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <p className="eyebrow">Analytics</p>
        <h2 className="text-3xl font-bold text-ink mt-1 tracking-tight">Progress</h2>
        <p className="text-ink-muted text-sm mt-1">Your workout history and performance trends</p>
      </div>

      {/* ── Streak ── */}
      <Card elevated className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <Flame size={26} className="text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="font-mono text-4xl font-bold text-ink tabular leading-none">—</p>
          <p className="text-sm text-ink-muted mt-1.5">Day streak</p>
        </div>
      </Card>

      {/* ── Weekly volume chart ── */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="eyebrow">Weekly Volume</p>
          <BarChart2 size={16} className="text-ink-faint" aria-hidden="true" />
        </div>
        <div className="h-32 flex items-end gap-2">
          {weekDays.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full bg-surface-muted rounded-md h-full flex items-end overflow-hidden border border-ink-line">
                <div className="w-full bg-primary/30 h-0" />
              </div>
              <span className="font-mono text-[10px] text-ink-faint">{day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Session history ── */}
      <div>
        <h3 className="eyebrow mb-3">Recent Sessions</h3>
        <Card className="bg-surface-muted">
          <div className="flex items-center gap-3 py-1">
            <Calendar size={18} className="text-ink-faint shrink-0" aria-hidden="true" />
            <p className="text-sm text-ink-muted">
              No sessions recorded yet. Complete a workout to build your history.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
