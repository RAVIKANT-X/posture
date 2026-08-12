import { CheckCircle2, AlertCircle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const metrics = [
  { label: 'Total Reps', value: '—' },
  { label: 'Duration', value: '—' },
  { label: 'Form Score', value: '—' },
  { label: 'Deviations', value: '—' },
]

/**
 * Session Summary page.
 *
 * Presents post-workout telemetry: reps, duration, form score, deviations,
 * and a coaching summary. Live values are wired up in a later phase.
 */
export default function SessionSummaryPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <p className="eyebrow">Debrief</p>
        <h2 className="text-3xl font-bold text-ink mt-1 tracking-tight">Session Summary</h2>
        <p className="text-ink-muted text-sm mt-1">Your results and coaching feedback</p>
      </div>

      {/* ── Completion hero ── */}
      <Card elevated noPadding className="relative overflow-hidden">
        <div className="absolute inset-0 grid-backdrop opacity-30" aria-hidden="true" />
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-12 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center text-center py-8 px-6">
          <span className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
            <CheckCircle2 size={30} className="text-primary" aria-hidden="true" />
          </span>
          <p className="text-xl font-bold text-ink mt-4">Session Complete</p>
          <p className="text-ink-muted text-sm mt-1">Well done — here&apos;s how it went.</p>
        </div>
      </Card>

      {/* ── Metrics grid ── */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ label, value }) => (
          <Card key={label}>
            <p className="font-mono text-3xl font-bold text-ink tabular">{value}</p>
            <p className="text-xs text-ink-muted mt-1">{label}</p>
          </Card>
        ))}
      </div>

      {/* ── Coaching feedback ── */}
      <Card className="bg-surface-muted">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-ink">Coaching Feedback</p>
            <p className="text-xs text-ink-muted mt-1 leading-relaxed">
              AI coaching cues and form-deviation details will appear here once your session
              telemetry is captured.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate('/exercises')}>
          Start Another Session
        </Button>
      </div>
    </div>
  )
}
