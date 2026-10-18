
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true,
  },

  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        '404': resolve(import.meta.dirname, '404.html'),
        '503': resolve(import.meta.dirname, '503.html'),
      },
    },
  },
});
