import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Serve files from the repository root while keeping the Vite config inside `frontend/`.
  root: path.resolve(__dirname, '..'),
  plugins: [react(), tailwindcss()],
  resolve: {
    // Alias `@` to the root `src` so imports like `@/components/...` keep working.
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
