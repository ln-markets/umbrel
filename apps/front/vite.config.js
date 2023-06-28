import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import process from 'node:process'

export default defineConfig({
  plugins: [vue()],
  root: process.cwd(),
  base: '/',
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    outDir: 'dist',
  },
})
