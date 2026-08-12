/**
 * ExerciseSelectionPage.
 *
 * Displays the exercise library. When the user taps an exercise:
 *  1. The exercise is stored in ExerciseContext (useSelectedExercise).
 *  2. The user can start the session, navigating to /workout.
 */

import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { EXERCISE_LIBRARY } from '../features/exercise/exerciseLibrary'
import { useSelectedExercise } from '../hooks/useSelectedExercise'
import type { ExerciseDefinition } from '../features/exercise/exerciseTypes'

// ── Exercise category icons (inline SVG — no extra library) ──────────────────

function SquatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="3.5" r="1.5" />
      <path d="M12 5.5v4M9 7l3 2.5L15 7M9 14l-2 5M15 14l2 5M8 14h8" />
    </svg>
  )
}

function PushUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <circle cx="18" cy="4" r="1.5" />
      <path d="M18 5.5v3l-3 2H5M5 10.5v3" />
      <line x1="2" y1="13.5" x2="8" y2="13.5" />
    </svg>
  )
}

function CurlIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="3.5" r="1.5" />
      <path d="M12 5.5v4M9 9.5l3 1 3-1M12 10.5l-3 6" />
      <line x1="7" y1="19.5" x2="11" y2="19.5" />
    </svg>
  )
}

const exerciseIcons: Record<string, () => JSX.Element> = {
  squat: SquatIcon,
  pushup: PushUpIcon,
  curl: CurlIcon,
}

// ── Exercise card ─────────────────────────────────────────────────────────────

interface ExerciseCardProps {
  exercise: ExerciseDefinition
  index: number
  isSelected: boolean
  onSelect: (exercise: ExerciseDefinition) => void
}

function ExerciseCard({ exercise, index, isSelected, onSelect }: ExerciseCardProps) {
  const Icon = exerciseIcons[exercise.id] ?? SquatIcon

  return (
    <Card
      elevated={isSelected}
      className={[
        'cursor-pointer transition-all duration-150',
        isSelected
          ? 'border-primary/70 shadow-glow'
          : 'hover:border-ink-muted/40',
      ].join(' ')}
      onClick={() => onSelect(exercise)}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(exercise)
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 min-w-0">
          {/* Icon badge */}
          <div
            className={[
              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors',
              isSelected
                ? 'bg-primary text-background'
                : 'bg-surface-muted text-primary border border-ink-line',
            ].join(' ')}
          >
            <Icon />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-ink-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="font-semibold text-ink truncate">{exercise.name}</p>
            </div>
            <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{exercise.description}</p>
            {/* Muscle groups */}
            <div className="flex flex-wrap gap-1 mt-2">
              {exercise.muscleGroups.slice(0, 3).map((m) => (
                <span
                  key={m}
                  className="text-[10px] font-mono uppercase tracking-wide bg-surface-muted text-ink-muted border border-ink-line px-1.5 py-0.5 rounded"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Selection indicator */}
        <div className="shrink-0">
          <div
            className={[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              isSelected
                ? 'bg-primary text-background'
                : 'border border-ink-line text-transparent',
            ].join(' ')}
          >
            <Check size={14} strokeWidth={3} aria-hidden="true" />
          </div>
        </div>
      </div>
    </Card>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExerciseSelectionPage() {
  const navigate = useNavigate()
  const { selectedExercise, setSelectedExercise } = useSelectedExercise()

  const handleSelect = (exercise: ExerciseDefinition) => {
    setSelectedExercise(exercise)
  }

  const handleStart = () => {
    if (selectedExercise) {
      navigate('/workout')
    }
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div>
        <p className="eyebrow">Exercise library</p>
        <h2 className="text-3xl font-bold text-ink mt-1 tracking-tight">Choose a movement</h2>
        <p className="text-ink-muted text-sm mt-1">
          Pick an exercise to arm the pose engine for the right joints.
        </p>
      </div>

      {/* ── Exercise cards ───────────────────────────────────────────────── */}
      <div className="space-y-3">
        {EXERCISE_LIBRARY.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            isSelected={selectedExercise?.id === exercise.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* ── Tracked angles detail ────────────────────────────────────────── */}
      {selectedExercise && (
        <Card className="bg-surface-muted">
          <div className="flex items-center justify-between mb-3">
            <p className="eyebrow">Tracked angles · {selectedExercise.name}</p>
            <span className="font-mono text-[10px] text-primary">
              {selectedExercise.requiredLandmarks.length} landmarks
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedExercise.primaryAngles.map((a) => (
              <span
                key={a.name}
                className="text-xs font-mono bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded"
              >
                {a.name}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* ── Start CTA ────────────────────────────────────────────────────── */}
      <Button
        variant="primary"
        fullWidth
        size="lg"
        disabled={!selectedExercise}
        onClick={handleStart}
      >
        {selectedExercise ? `Start ${selectedExercise.name}` : 'Select an exercise above'}
      </Button>
    </div>
  )
}
