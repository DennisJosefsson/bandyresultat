import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), visualizer()],
  server: {
    headers: { 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups' },
  },
  assetsInclude: ['**/*.PNG'],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (
  //           id.includes('leaflet') ||
  //           id.includes('react-leaflet') ||
  //           id.includes('react-leaflet-cluster') ||
  //           id.includes('leaflet.markercluster')
  //         )
  //           return 'leaflet'
  //       },
  //     },
  //   },
  // },
})
