// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:6900',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});