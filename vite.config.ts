import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 🔥 CRITICAL FIX: This MUST match your repository name exactly
  base: '/IntegratedWellthSolutions/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
