import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'vaile-storefront-drop-001/client/src'),
      '@shared': path.resolve(__dirname, 'vaile-storefront-drop-001/shared'),
    },
  },
  root: path.resolve(__dirname, 'vaile-storefront-drop-001/client'),
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: false,
    host: true,
  },
});
