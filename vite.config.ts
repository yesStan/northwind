import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const path = require('path')

export default defineConfig({
  resolve:{
    alias:{
      // '@dicebear/core' : path.resolve(__dirname, './node_modules/@dicebear/core')
    },
  },
  plugins: [vue()],
  define: {
    'process.env': process.env
  }
})

// template: {
//   compilerOptions: {
//     isCustomElement: (tag) => ['EasyDataTable'].includes(tag),
//   }
// }