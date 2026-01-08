import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Custom domains use '/' as base, not a subdirectory
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
