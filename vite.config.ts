import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // ✅ IMPORTANT: root domain deployment
  plugins: [react()],
  server: {
    proxy: {
      '/api/yoosh': {
        target: 'http://127.0.0.1:5055',
        changeOrigin: true,
      },
    },
  },
})

