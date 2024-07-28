/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import * as path from 'path'; // Import path from Node.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), environment('all', { prefix: 'CANISTER_' }), environment('all', { prefix: 'DFX_' })],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js', // Ensure the path is correct
  },
  resolve: {
    alias: [
      {
        find: 'declarations',
        replacement: fileURLToPath(new URL('../declarations', import.meta.url)),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
});
