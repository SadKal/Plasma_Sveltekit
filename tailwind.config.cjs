const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#fcf3f7',
					'100': '#fbe8f0',
					'200': '#f8d2e3',
					'300': '#f4adca',
					'400': '#ed79a6',
					'500': '#e35185',
					'600': '#d13364',
					'700': '#b4224b',
					'800': '#951f3e',
					'900': '#7d1e37',
					'950': '#4c0b1c',
				},
				secondary: {
					'50': '#f2fbf9',
					'100': '#d2f5ee',
					'200': '#a5eade',
					'300': '#71d7ca',
					'400': '#43beb2',
					'500': '#2caaa0',
					'600': '#1f827c',
					'700': '#1d6864',
					'800': '#1b5452',
					'900': '#1b4644',
					'950': '#0a2829',
				}

			}
		}
	}
};

module.exports = config;