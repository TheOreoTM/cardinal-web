import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			backgroundColor: {
				'cta-button': '#4A82EF',
				'nav': '#2F2F2F',
			},
			borderColor: {
				'nav-button': '#454545',
			},
			colors: {
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
				},
				text: {
					DEFAULT: '#e5e1ef',
				},
				// 'background': '#09070d',
				background: 'var(--background)',
				primary: {
					DEFAULT: '#99af64',
					foreground: 'hsl(var(--primary-foreground))',
				},
				'secondary': {
					DEFAULT: '#120e1b',
					100: '#d1c5d1',
					200: '#a298a2',
					300: '#746074',
					400: '#463446',
					500: '#120e1b',
					600: '#0f0b17',
					700: '#0b0811',
					800: '#08050b',
				},

				accent: {
					DEFAULT: '#8aa253',
					foreground: 'hsl(var(--accent-foreground))',
				},
			},
		},
	},
	plugins: [],
};
export default config;
