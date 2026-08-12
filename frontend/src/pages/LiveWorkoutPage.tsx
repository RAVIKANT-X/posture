/**
 * LiveWorkoutPage.
 *
 *   LiveWorkoutPage
 *     ├── useCamera              (camera stream + state)
 *     ├── usePoseLandmarker      (MediaPipe inference loop)
 *     ├── useSelectedExercise    (exercise from ExerciseContext)
 *     ├── calculateExerciseAngles (biomechanics)
 *     ├── CameraView             (<video> + states)
 *     │     └── PoseOverlay      (<canvas> skeleton)
 *     └── Controls + AngleDisplay
 */

import { useRef, useEffect } from 'react'
import { FlipHorizontal, CameraOff, Camera, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import CameraView from '../components/workout/CameraView'
import PoseOverlay from '../components/workout/PoseOverlay'
import { useCamera } from '../hooks/useCamera'
import { usePoseLandmarker } from '../hooks/usePoseLandmarker'
import { useSelectedExercise } from '../hooks/useSelectedExercise'
import { calculateExerciseAngles } from '../features/biomechanics/angles'
import type { JointAngles } from '../features/biomechanics/biomechanicsTypes'

export default function LiveWorkoutPage() {
  const navigate = useNavigate()
  const { selectedExercise } = useSelectedExercise()
  const { videoRef, status, error, facing, isActive, start, stop, switchCamera } = useCamera()
  const { modelStatus, poses, startLoop, stopLoop } = usePoseLandmarker()
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  useEffect(() => {
    return () => {
      stop()
      stopLoop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStart = () => start('user')
  const handleStop = () => {
    stop()
    stopLoop()
  }

  // ── Compute live angles whenever a new pose arrives ─────────────────────
  let liveAngles: JointAngles = {}
  if (selectedExercise && poses.length > 0 && poses[0].worldLandmarks.length > 0) {
    liveAngles = calculateExerciseAngles(selectedExercise.primaryAngles, poses[0].worldLandmarks)
  }

  const personVisible = poses.length > 0 && poses[0].landmarks.length > 0

  return (
    <div className="space-y-4 animate-fade-up">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div>
          {!selectedExercise && (
            <button
              onClick={() => navigate('/exercises')}
              className="flex items-center gap-1 text-xs text-primary mb-1.5 hover:text-primary-light transition-colors"
            >
              <ArrowLeft size={12} />
              Choose exercise
            </button>
          )}
          <p className="eyebrow">{selectedExercise ? 'Live session' : 'Live workout'}</p>
          <h2 className="text-3xl font-bold text-ink mt-1 tracking-tight">
            {selectedExercise ? selectedExercise.name : 'Live Workout'}
          </h2>
        </div>
        <ModelStatusBadge status={modelStatus} />
      </div>

      {/* ── Camera + pose overlay ─────────────────────────────────────────── */}
      <CameraView videoRef={videoRef} status={status} error={error} facing={facing}>
        <PoseOverlay
          canvasRef={canvasRef}
          videoRef={videoRef}
          facing={facing}
          modelStatus={modelStatus}
          poses={poses}
          startLoop={startLoop}
          stopLoop={stopLoop}
        />
      </CameraView>

      {/* ── Status row ───────────────────────────────────────────────────── */}
      {isActive && (
        <Card className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={[
                'w-2 h-2 rounded-full',
                personVisible ? 'bg-primary animate-pulse' : 'bg-ink-faint',
              ].join(' ')}
            />
            <span className="font-mono text-xs text-ink-muted">
              {personVisible
                ? `${poses[0].landmarks.length} LANDMARKS TRACKED`
                : 'WAITING FOR PERSON…'}
            </span>
          </div>
          <span className="font-mono text-[10px] text-ink-faint uppercase tracking-wide">
            {facing === 'user' ? 'Front cam' : 'Rear cam'}
          </span>
        </Card>
      )}

      {/* ── Live angle readout ───────────────────────────────────────────── */}
      {isActive && selectedExercise && personVisible && Object.keys(liveAngles).length > 0 && (
        <Card>
          <p className="eyebrow mb-3">Live Joint Angles</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(liveAngles).map((result) => (
              <div
                key={result.name}
                className="bg-surface-muted border border-ink-line rounded-lg px-3 py-2.5"
              >
                <p className="font-mono text-[10px] text-ink-faint truncate uppercase tracking-wide">
                  {result.name}
                </p>
                <p
                  className={[
                    'font-mono text-2xl font-bold tabular mt-0.5',
                    result.valid ? 'text-primary' : 'text-ink-faint',
                  ].join(' ')}
                >
                  {result.valid ? `${result.degrees.toFixed(1)}°` : '—'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Camera controls ───────────────────────────────────────────────── */}
      <div className="flex gap-3">
        {!isActive ? (
          <Button variant="primary" fullWidth size="lg" onClick={handleStart} disabled={status === 'requesting'}>
            <Camera size={18} aria-hidden="true" />
            {status === 'requesting' ? 'Starting…' : 'Enable Camera'}
          </Button>
        ) : (
          <>
            <Button variant="outline" fullWidth onClick={handleStop}>
              <CameraOff size={18} aria-hidden="true" />
              Stop Camera
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={switchCamera}
              aria-label="Switch camera"
              title="Switch between front and rear camera"
              className="shrink-0 px-4"
            >
              <FlipHorizontal size={18} aria-hidden="true" />
            </Button>
          </>
        )}
      </div>

      {/* ── No exercise selected warning ─────────────────────────────────── */}
      {!selectedExercise && (
        <Card className="bg-surface-muted flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-warning shrink-0" aria-hidden="true" />
          <p className="text-xs text-ink-muted leading-relaxed">
            No exercise selected.{' '}
            <button onClick={() => navigate('/exercises')} className="text-primary underline underline-offset-2">
              Choose one
            </button>{' '}
            to see live angle measurements.
          </p>
        </Card>
      )}
    </div>
  )
}

// ── Sub-component: model status badge ────────────────────────────────────────

type ModelStatus = 'uninitialized' | 'loading' | 'ready' | 'error'

function ModelStatusBadge({ status }: { status: ModelStatus }) {
  const config: Record<ModelStatus, { label: string; dot: string }> = {
    uninitialized: { label: 'Pose model', dot: 'bg-ink-faint' },
    loading: { label: 'Loading…', dot: 'bg-warning animate-pulse' },
    ready: { label: 'Model ready', dot: 'bg-primary' },
    error: { label: 'Model error', dot: 'bg-error' },
  }
  const { label, dot } = config[status]

  return (
    <div className="flex items-center gap-1.5 bg-surface border border-ink-line rounded-full px-3 py-1.5 shrink-0">
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wide">{label}</span>
    </div>
  )
}
