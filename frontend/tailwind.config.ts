import type { Config } from 'tailwindcss'

/**
 * FitCoach — "Health Companion" theme.
 *
 * Aesthetic: soft sage-green gradient canvas, frosted-glass cards with
 * generous rounding, a calm sage-green accent for progress/metrics, and a
 * near-black "ink" used for primary CTAs and active controls. Headings and
 * body use Plus Jakarta Sans; precise numeric telemetry (joint angles) uses
 * JetBrains Mono.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Sage-green accent (progress, metrics, active tints) ──
        primary: {
          DEFAULT: '#5f9c67',
          dark: '#47814f',
          light: '#dcebd6',
        },
        // ── Light gradient canvas + frosted surfaces ──
        background: '#e4efdf', // base page tint (gradient applied in CSS)
        surface: {
          DEFAULT: '#ffffff', // solid white (glass handled via .glass utility)
          muted: '#eef4ec',   // recessed / inset panels
          raised: '#f5faf3',  // hovered / elevated elements
        },
        // ── Near-black green-tinted ink (text + primary CTA + active nav) ──
        ink: {
          DEFAULT: '#1f2a24', // primary text / CTA fill
          muted: '#5c6b60',   // secondary text
          faint: '#8a978d',   // tertiary text / disabled
          line: '#d8e4d4',    // hairline borders
        },
        // ── Semantic status ──
        success: '#4a9e57',
        warning: '#e0913a',
        error: '#e0574f',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '1.75rem', // 28px — soft, pill-adjacent rounding
      },
      boxShadow: {
        card: '0 6px 24px -12px rgb(47 82 55 / 0.28)',
        'card-md': '0 18px 44px -16px rgb(47 82 55 / 0.32)',
        glow: '0 0 0 1px rgb(95 156 103 / 0.4), 0 10px 30px -10px rgb(95 156 103 / 0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgb(95 156 103 / 0.5)' },
          '70%': { boxShadow: '0 0 0 10px rgb(95 156 103 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(95 156 103 / 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
