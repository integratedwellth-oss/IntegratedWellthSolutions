import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 🔥 CRITICAL FIX: For custom domains (integratedwellth.co.za), this MUST be '/'
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
