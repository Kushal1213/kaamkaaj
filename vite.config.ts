import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative assets let the same build run at a custom domain, a GitHub Pages
  // repository subpath, or the existing private preview URL.
  base: './',
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
