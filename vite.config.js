import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the build work from any host or sub-path (Netlify, Vercel, GitHub Pages, S3...)
export default defineConfig({
  base: './',
  plugins: [react()],
});
