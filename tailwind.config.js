/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B02990',
          foreground: '#FFFFFF',
          dark: '#8a1f70',
          light: '#d43ab3',
        },
        secondary: {
          DEFAULT: '#EECFE3',
          foreground: '#B02990',
          dark: '#dba8cc',
          light: '#f5e4ef',
        },
        accent: {
          light: '#FDF2F8',
        },
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        subtle: '#F9FAFB',
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#6B7280',
        },
        border: '#E5E7EB',
        'border-subtle': '#F3F4F6',
        input: '#E5E7EB',
        ring: '#B02990',
        success: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F59E0B',
          foreground: '#FFFFFF',
        },
        danger: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'hover': '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
