import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function getDevServerConf() {
  if (process.env.DOCKER) {
    return {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      force: true,
    }
  }
  return {
    host: '0.0.0.0',
    port: 3000,
  }
}

export default defineConfig({
  plugins: [vue()],
  root: process.cwd(),
  base: '/',
  publicDir: 'public',
  server: getDevServerConf(),
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    outDir: 'dist',
  },
})
