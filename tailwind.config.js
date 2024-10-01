/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				manrope: ['"Manrope"', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: "#0b4d10", // Primary color
				secondary: "#FFC900", // Secondary color
			},
			backgroundColor: {
				primary: "#0b4d10", // Set primary background color
				secondary: "#FFC900", // Optional: secondary background color if needed
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
