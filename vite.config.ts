import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@Pages': path.resolve(__dirname, './src/pages'),
            '@Components': path.resolve(__dirname, './src/components'),
            '@Layouts': path.resolve(__dirname, './src/layouts'),
            '@UI': path.resolve(__dirname, './src/UI'),
            '@Types': path.resolve(__dirname, './src/types'),
        },
    },
    plugins: [react()],
});
