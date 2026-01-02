import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/users': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/generate': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})
