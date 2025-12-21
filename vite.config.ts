import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load variables from the process environment (GitHub Actions) 
    // and .env files (local dev)
    const env = loadEnv(mode, process.cwd(), '');

    return {
      // 🔥 CRITICAL: Matches your repo name to fix the blank page
      base: '/IntegratedWellthSolutions/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      
      plugins: [react()],
      
      define: {
        // Injects secrets into the browser code at build-time
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.WHATSAPP_TOKEN': JSON.stringify(env.WHATSAPP_TOKEN),
      },
      
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // Standard alias for cleaner imports
        },
      },
      
      build: {
        outDir: 'dist',
      }
    };
});
