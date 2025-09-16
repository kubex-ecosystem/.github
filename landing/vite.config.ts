// /vite.config.ts
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// Ative PREACT=1 no env se quiser swap
const usePreact = process.env.PREACT === '1'

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    // relatório em dist/stats.html
    visualizer({ filename: 'dist/stats.html', template: 'treemap', gzipSize: true })
  ],
  resolve: usePreact ? {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  } : {},
  build: {
    target: 'es2022',
    cssTarget: 'chrome110',
    sourcemap: false,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('preact') || id.includes('react')) return 'vendor-react'
            if (id.includes('tailwind')) return 'vendor-style'
            return 'vendor'
          }
        }
      }
    }
  }
})
