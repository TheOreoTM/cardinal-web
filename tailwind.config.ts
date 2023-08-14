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
				'text-light': '#ffffff',
				'background-light': '#52382e',
				'secondary-light': '#412d25',
				'secondary-dark': '#241814',
				'text-dark': '#a48d8d',
				'text': '#e5e1ef',
				'background': '#09070d',
				'primary': '#99af64',
				'secondary': '#120e1b',
				'accent': '#8aa253',
			},
		},
	},
	plugins: [],
};
export default config;
