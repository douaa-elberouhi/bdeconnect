import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        port: 5173,
        /** Si 5173 est déjà pris (autre `npm run dev`), Vite essaie le port suivant. */
        strictPort: false,
    },
});