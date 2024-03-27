import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    watch: {
      include: ['src/**', 'public/**'],
    },
  },
});