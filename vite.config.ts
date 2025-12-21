import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Loads environment variables directly from the build environment
    const env = loadEnv(mode, process.cwd(), '');

    return {
      /**
       * 🔥 THE FIX: Relative pathing ensures the browser finds assets (JS/CSS) 
       * regardless of the folder name or organization hosting it.
       */
      base: './', 
      
      plugins: [react()],
      
      define: {
        // Injects your GitHub Secrets into the build for the live site
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.WHATSAPP_TOKEN': JSON.stringify(env.WHATSAPP_TOKEN),
      },
      
      resolve: {
        alias: {
          /** * Points to your source directory. Ensure your folders are inside 
           * the './src' folder for this to work.
           */
          '@': path.resolve(__dirname, './src'),
        },
      },
      
      build: {
        // Standard output directory for the website build
        outDir: 'dist',
      }
    };
});
