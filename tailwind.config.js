/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FFCE00',
                    light: '#FFE382',
                },
                secondary: {
                    DEFAULT: '#212529',
                    light: '#474D53',
                },
            },
            fontFamily: {
                heading: ['Kalam', 'cursive'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
