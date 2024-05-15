import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    headers: { 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups' },
  },
  assetsInclude: ['**/*.PNG'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
