const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"catamaran-light": ["Catamaran-Light"],
				"catamaran-regular": ["Catamaran-Regular"],
				"catamaran-medium": ["Catamaran-Medium"],
				"catamaran-bold": ["Catamaran-Bold"],
			},
			animation: {
				"fade-in": "fade-in linear 0.25s forwards",
				"fade-out": "fade-out linear 1s forwards",
				"slide-down": "slide-down ease-out 1s",
				'spin-slow': 'spin 3s linear infinite',
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				"fade-out": {
					"0%": { opacity: 1 },
					"100%": { opacity: 0 },
				},
				"slide-down": {
					"0%": { transform: "translateY(-70px)" },
					"100%": { transform: "translateY(0px)" },
				},
			},
		},
	},
	plugins: [],
};
