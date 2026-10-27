import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base keeps asset paths working on Vercel, Netlify or any sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { assetsDir: 'static' },
});
