/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				text: '#170c0d',
				background: '#fbf8f9',
				primary: '#fb8900',
				secondary: '#e6d0d2',
				accent: '#fcde8f',
				box: '#FFDBB0',
				titles: '#CC5934',
				button: '#FAA541'
			}
		}
	},
	plugins: []
};
