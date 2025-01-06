/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f1e7',
        shell: '#fffaf4',
        ink: '#1d2430',
        fog: '#6d7483',
        copper: '#a86a3d',
        teal: '#0f6e78',
        line: '#d8cfbf',
      },
      boxShadow: {
        archive: '0 24px 70px rgba(29, 36, 48, 0.10)',
        card: '0 12px 36px rgba(29, 36, 48, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
