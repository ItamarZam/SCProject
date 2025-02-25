import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tabler/icons-react', 'recharts', 'react-dropzone', 'lucide-react', 'framer-motion'],
    exclude: [],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    force: true // Force dependency optimization on startup
  },
  preview: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@tabler/icons-react', 'lucide-react', 'framer-motion'],
          'charts': ['recharts']
        }
      }
    }
  }
});