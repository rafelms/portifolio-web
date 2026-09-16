/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema dark com destaques da paleta "Salt and Pepper": #FFFFFF · #D4D4D4 · #B3B3B3 · #2B2B2B
        background: '#0F0F10', // Quase preto neutro
        surface: '#2B2B2B', // Cartões e superfícies elevadas
        silver: '#D4D4D4',
        steel: '#B3B3B3',
        primary: '#D4D4D4', // Prata — fundos de botões/badges. Texto escuro: 12.9:1
        'primary-hover': '#FFFFFF', // Branco — hover de fundos
        'primary-light': '#FFFFFF', // Destaque em texto/ícones sobre fundo escuro
        'on-primary': '#0F0F10',
        text: '#F5F5F5',
        muted: '#B3B3B3', // Texto secundário (9.3:1 sobre o fundo)
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
