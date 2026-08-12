import { User, Bell, Shield, ChevronRight } from 'lucide-react'
import Card from '../components/ui/Card'

const settingsGroups = [
  {
    heading: 'Account',
    items: [{ icon: User, label: 'Profile Details', description: 'Name, age, fitness goals' }],
  },
  {
    heading: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', description: 'Workout reminders' },
      { icon: Shield, label: 'Privacy', description: 'Camera and data permissions' },
    ],
  },
]

/**
 * Profile / Settings page.
 *
 * Lets users manage their identity, notification preferences, and camera /
 * data permissions.
 */
export default function ProfilePage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <p className="eyebrow">Account</p>
        <h2 className="text-3xl font-bold text-ink mt-1 tracking-tight">Profile</h2>
        <p className="text-ink-muted text-sm mt-1">Settings and preferences</p>
      </div>

      {/* ── Identity card ── */}
      <Card elevated className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <User size={26} className="text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-ink">Your Name</p>
          <p className="text-xs text-ink-muted mt-0.5">Profile setup coming soon</p>
        </div>
      </Card>

      {/* ── Settings groups ── */}
      {settingsGroups.map((group) => (
        <div key={group.heading}>
          <h3 className="eyebrow mb-2">{group.heading}</h3>
          <Card noPadding className="overflow-hidden">
            {group.items.map(({ icon: Icon, label, description }, idx) => (
              <button
                key={label}
                className={[
                  'flex items-center justify-between w-full text-left px-5 py-4 transition-colors hover:bg-surface-raised',
                  idx < group.items.length - 1 ? 'border-b border-ink-line' : '',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-muted border border-ink-line flex items-center justify-center">
                    <Icon size={16} className="text-ink-muted" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{label}</p>
                    <p className="text-xs text-ink-faint">{description}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-ink-faint" aria-hidden="true" />
              </button>
            ))}
          </Card>
        </div>
      ))}

      {/* ── App info ── */}
      <Card className="text-center bg-surface-muted">
        <p className="font-mono text-[11px] text-ink-faint uppercase tracking-wide">
          FitCoach AI · Performance Console
        </p>
        <p className="font-mono text-[11px] text-ink-faint mt-0.5">v0.1.0</p>
      </Card>
    </div>
  )
}
