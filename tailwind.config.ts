import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cafe: {
          oscuro: '#241A14',
          medio: '#6B4A35',
          hover: '#382A21',
        },
        crema: '#F4EFE7',
        arena: '#D9C8B4',
        oliva: {
          DEFAULT: '#68705A',
          hover: '#555C4A',
        },
        blanco: '#FAF9F6',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Fraunces', 'serif'],
        sans: ['var(--font-work-sans)', 'Work Sans', 'sans-serif'],
      },
      maxWidth: {
        container: '1320px',
      },
    },
  },
  plugins: [],
};

export default config;
