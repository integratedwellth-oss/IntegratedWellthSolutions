import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load variables from the current environment and secrets
    const env = loadEnv(mode, process.cwd(), '');

    return {
      // Points assets to your organization repo to un-blank the page
      base: '/IntegratedWellthSolutions/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      
      plugins: [react()],
      
      define: {
        // Safe injection of keys for use in your React components
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.WHATSAPP_TOKEN': JSON.stringify(env.WHATSAPP_TOKEN),
      },
      
      resolve: {
        alias: {
          // Standardized alias for your source files
          '@': path.resolve(__dirname, './src'), 
        },
      },
      
      build: {
        outDir: 'dist', // Ensures build files go to the correct directory
      }
    };
});
