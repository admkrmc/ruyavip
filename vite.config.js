import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        copyFileSync('.nojekyll', 'dist/.nojekyll')
      }
    }
  ],
  base: '/ruyavip/', // GitHub Pages repository name
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
