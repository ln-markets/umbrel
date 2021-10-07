import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function getDevServerConf() {
  if (process.env.NODE_ENV === 'development') {
    return {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      force: true,
    }
  } else {
    return {
      host: '0.0.0.0',
      port: process.env.API_PORT,
    }
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
