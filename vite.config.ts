import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // This loads secrets from GitHub Actions instead of the deleted .env file
    const env = loadEnv(mode, process.cwd(), '');

    return {
      // Points to your integratedwellth-oss repo
      base: '/IntegratedWellthSolutions/', 
      plugins: [react()],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.WHATSAPP_TOKEN': JSON.stringify(env.WHATSAPP_TOKEN),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      build: {
        outDir: 'dist', // This is where the website "lives" after building
      }
    };
});
