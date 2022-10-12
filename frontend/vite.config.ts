import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './home.html',
      },
    },
  },
  server: {
    open: '/home.html',
  },
})