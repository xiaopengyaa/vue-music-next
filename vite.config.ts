import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  server: {
    fs: {
      allow: ['./'],
    },
  },
})
