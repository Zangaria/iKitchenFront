/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/tw-elements-react/dist/js/**/*.js',
	],
	theme: {
		extend: {
			backgroundColor: {
				primary: '#419692',
			},
			borderColor: {
				primary: '#419692',
			},
			textColor: {
				primary: '#419692',
			},
			ringColor: {
				primary: '#266F5A',
			},
		},
	},
	darkMode: 'class',
	plugins: [require('tw-elements-react/dist/plugin.cjs')],
};
