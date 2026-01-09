import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/aayush_website_updated/'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/yoosh': {
        target: 'http://127.0.0.1:5055',
        changeOrigin: true,
      },
    },
  },
}))
