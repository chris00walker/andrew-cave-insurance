/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Trust-Building Primary Colors
        brand: {
          DEFAULT: '#1B365D', // Deep Navy Blue - Trust & Authority
          light: '#2C3E50',    // Professional Slate - Executive Gravitas
          dark: '#0F1B2E',     // Darker navy for depth
        },
        // Caribbean Identity Colors
        caribbean: {
          teal: '#17A2B8',     // Caribbean Teal - Local Connection
          coral: '#FF6B6B',    // Coral Accent - Warmth (use sparingly)
        },
        // Wealth & Legacy Colors
        wealth: {
          gold: '#C9A961',     // Refined Gold - Premium Services
          green: '#28A745',    // Success Green - Growth & Prosperity
        },
        // Trust-Building Neutrals
        neutral: {
          white: '#FFFFFF',    // Pure transparency
          warm: '#F8F9FA',     // Warm gray backgrounds
          silver: '#E9ECEF',   // Premium subtle accents
        },
        // Professional Text Hierarchy
        text: {
          authority: '#212529', // Authority Black - Headlines
          professional: '#495057', // Professional Gray - Body
          subtle: '#6C757D',   // Subtle Gray - Supporting text
        },
        // Legacy support (keeping for existing components)
        accent: '#C9A961', // Now maps to refined gold
      },
      // Trust-Building Typography
      fontFamily: {
        'serif': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-source-sans)', 'sans-serif'],
        'authority': ['var(--font-playfair)', 'serif'], // For headlines
        'professional': ['var(--font-source-sans)', 'sans-serif'], // For body
      },
      fontSize: {
        // Trust-Building Hierarchy
        'hero': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 56px
        'section': ['2.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 40px
        'subsection': ['2rem', { lineHeight: '1.3', fontWeight: '600' }], // 32px
        'card-title': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        'body-large': ['1.25rem', { lineHeight: '1.7', fontWeight: '400' }], // 20px
        'body': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }], // 18px
        'body-small': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'fine': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
      },
      borderRadius: { xl: '1.25rem' },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
