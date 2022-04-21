import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { URL } from 'node:url'

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [vue()],
  root: process.cwd(),
  base: '/',
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    force: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    outDir: 'dist',
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
})
