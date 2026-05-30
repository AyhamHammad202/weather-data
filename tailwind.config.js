/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base palette (using theme custom variables)
        'void': 'var(--bg-primary)',
        'abyss': 'var(--bg-secondary)',
        'deep': 'var(--bg-tertiary)',
        'surface': 'var(--bg-glass)',
        'surface-2': 'var(--bg-glass-heavy)',
        'surface-3': 'var(--bg-glass-card)',
        'border': 'var(--border-glass-card)',
        'border-2': 'var(--border-input)',
        // Neon accents
        'neon-cyan': '#00e5ff',
        'neon-blue': '#2979ff',
        'neon-violet': '#7c3aed',
        'neon-purple': '#a855f7',
        'neon-green': '#00ff88',
        'neon-amber': '#ffb300',
        'neon-red': '#ff1744',
        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        // Variable colors
        'temp-color': '#ff6b35',
        'rain-color': '#00b4d8',
        'humidity-color': '#48cae4',
        'evap-color': '#f77f00',
        'wind-color': '#90e0ef',
        'sun-color': '#ffd60a',
        'pressure-color': '#7b2d8b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.1)',
        'neon-blue': '0 0 20px rgba(41, 121, 255, 0.4), 0 0 60px rgba(41, 121, 255, 0.1)',
        'neon-violet': '0 0 20px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.1)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 255, 136, 0.1)',
        'glow-card': '0 8px 32px rgba(0, 229, 255, 0.08), 0 2px 8px rgba(0,0,0,0.5)',
        'glow-hover': '0 8px 40px rgba(0, 229, 255, 0.2), 0 2px 16px rgba(0,0,0,0.6)',
        'inner-glow': 'inset 0 1px 0 rgba(0,229,255,0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'heavy': '32px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 229, 255, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(135deg, #00e5ff, #2979ff, #7c3aed)',
        'dark-gradient': 'linear-gradient(180deg, #020408 0%, #05080f 50%, #080d1a 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
