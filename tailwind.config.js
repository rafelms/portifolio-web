/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0E13',
        surface: '#1A2330',
        primary: '#1F6FEB', // Azul — fundos (botões, badges). Texto branco: 4.6:1
        'primary-hover': '#1858C4', // Azul escuro — hover de fundos (branco: 6.5:1)
        'primary-light': '#58A6FF', // Azul claro — texto/ícones sobre fundo escuro (7.6:1)
        'on-primary': '#FFFFFF',
        text: '#E6EBF0',
        muted: '#A8B3BF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
