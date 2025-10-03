/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {
			colors: {
				brand: {
					yellow: "#facc15", // amber-400
					orange: "#f97316", // orange-500
					red: "#ef4444", // red-500
					green: "#22c55e", // green-500
					blue: "#3b82f6", // blue-500
					surface: "#fff7ed", // orange-50
					"on-surface": "#0f172a", // slate-900
					muted: "#6b7280", // gray-500
					border: "#f1f5f9" // slate-100
				}
			},
			fontFamily: {
				sans: ["ui-sans-serif", "Roboto", "Noto Sans", "Arial"]
			}
		}
	},
	plugins: []
};
