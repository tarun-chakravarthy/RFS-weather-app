import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'rfs': {
          navy: 'var(--rfs-navy)',
          red: 'var(--rfs-red)',
          gold: 'var(--rfs-gold)',
          white: 'var(--rfs-white)',
        },
        'bg': {
          app: 'var(--bg-app)',
          card: 'var(--bg-card)',
          header: 'var(--bg-header)',
        },
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        'accent': {
          primary: 'var(--accent-primary)',
          danger: 'var(--accent-danger)',
          gold: 'var(--accent-gold)',
        },
        'fire': {
          low: 'var(--fire-low)',
          moderate: 'var(--fire-moderate)',
          high: 'var(--fire-high)',
          extreme: 'var(--fire-extreme)',
        },
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
    },
  },
  plugins: [],
} satisfies Config;
