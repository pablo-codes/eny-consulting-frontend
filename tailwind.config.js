/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#002654',
                background: '#ffffff',
                text: {
                    primary: '#333333',
                    secondary: '#666666',
                    light: '#999999'
                },
                border: '#e5e5e5',
                confidence: {
                    high: '#4ade80',
                    medium: '#fbbf24',
                    low: '#f87171'
                }
            }
        },
    },
    plugins: [],
}