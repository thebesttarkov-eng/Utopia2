import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.9], speed: 4 },
      svgo: { plugins: [{ name: 'removeViewBox' }] },
    }),
  ],
  base: './',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/react-router') || id.includes('/react-dom') || /\/react\//.test(id)) return 'react-vendor'
          if (id.includes('/d3-geo') || id.includes('/topojson')) return 'd3-vendor'
          if (id.includes('/lucide-react')) return 'icons'
        },
      },
    },
  },
})
