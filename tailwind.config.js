/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // No monospace anywhere — `font-mono` resolves to Inter as a safety net.
        mono: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        // Display serif — used only for the social-post graphics.
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        aether: {
          bg: '#050507',
          card: '#0a0a0d',
          border: '#1a1a24',
          accent: '#00F098',
          accentDim: 'rgba(0, 240, 152, 0.1)',
          text: '#f8fafc',
          muted: '#8ba1b5',
        },
      },
    },
  },
  plugins: [],
}
