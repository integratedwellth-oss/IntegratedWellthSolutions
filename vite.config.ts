import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 🔥 CRITICAL FIX: This matches your GitHub repository name
  base: '/IntegratedWellthSolutions/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
