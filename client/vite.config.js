import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/manualService': {
        target: 'http://194.238.16.80:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://194.238.16.80:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
