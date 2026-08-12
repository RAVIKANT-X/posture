import type { Config } from 'tailwindcss'

/**
 * FitCoach AI — "Performance Training Console" theme.
 *
 * Aesthetic: dark charcoal instrument-panel surfaces, an electric-lime
 * signature accent that means "active / good form", and load-bearing
 * semantic colors (amber = caution, red = deviation). Numeric telemetry
 * (angles, reps, scores) is rendered in JetBrains Mono; all other UI in
 * Space Grotesk.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Signature accent (electric lime — active / good form / progress) ──
        primary: {
          DEFAULT: '#b6f34a',
          dark: '#8fd422',
          light: '#d6fb87',
        },
        // ── Charcoal instrument-panel surfaces ──
        background: '#0e1116', // deep charcoal page background
        surface: {
          DEFAULT: '#181d25', // card background
          muted: '#11151b',   // recessed / inset panels
          raised: '#212832',  // hovered / elevated elements
        },
        // ── Neutral ink scale (text + hairlines on dark) ──
        ink: {
          DEFAULT: '#e8ecf1', // primary text
          muted: '#94a1b2',   // secondary text
          faint: '#5c6672',   // tertiary text / disabled
          line: '#262d38',    // hairline borders
        },
        // ── Semantic status (load-bearing form-quality signals) ──
        success: '#7bd938',
        warning: '#f5a524',
        error: '#ff5d5d',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '1.125rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.4)',
        'card-md': '0 8px 24px -6px rgb(0 0 0 / 0.55)',
        glow: '0 0 0 1px rgb(182 243 74 / 0.35), 0 0 28px -6px rgb(182 243 74 / 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgb(182 243 74 / 0.5)' },
          '70%': { boxShadow: '0 0 0 10px rgb(182 243 74 / 0)' },
          '100%': { boxShadow: '0 0 0 0 rgb(182 243 74 / 0)' },
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
