/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				DEFAULT: '#1B365D',
  				light: '#2C3E50',
  				dark: '#0F1B2E'
  			},
  			caribbean: {
  				teal: '#17A2B8',
  				coral: '#FF6B6B'
  			},
  			wealth: {
  				gold: '#C9A961',
  				green: '#28A745'
  			},
  			neutral: {
  				white: '#FFFFFF',
  				warm: '#F8F9FA',
  				silver: '#E9ECEF'
  			},
  			text: {
  				authority: '#212529',
  				professional: '#495057',
  				subtle: '#6C757D'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			serif: [
  				'var(--font-playfair)',
  				'serif'
  			],
  			sans: [
  				'var(--font-source-sans)',
  				'sans-serif'
  			],
  			authority: [
  				'var(--font-playfair)',
  				'serif'
  			],
  			professional: [
  				'var(--font-source-sans)',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			hero: [
  				'3.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			section: [
  				'2.5rem',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			],
  			subsection: [
  				'2rem',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			],
  			'card-title': [
  				'1.5rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '600'
  				}
  			],
  			'body-large': [
  				'1.25rem',
  				{
  					lineHeight: '1.7',
  					fontWeight: '400'
  				}
  			],
  			body: [
  				'1.125rem',
  				{
  					lineHeight: '1.7',
  					fontWeight: '400'
  				}
  			],
  			'body-small': [
  				'1rem',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			fine: [
  				'0.875rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			]
  		},
  		borderRadius: {
  			xl: '1.25rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			fadeInUp: 'fadeInUp 1s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")],
};
