import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: import.meta.env === 'development' ? { global: 'window' } : {},
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
