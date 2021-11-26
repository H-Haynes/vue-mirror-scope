import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  plugins: [vue()],
  build:{
    lib:{
      entry:path.resolve(__dirname,'src/index.js'),
      name:"VueMirrorScope",
      // fileName:(format) => `VueMirrorScope.${format}.js`
    },
    rollupOptions:{
      external:['vue'], // 不要打包的依赖，
      output:{
        // 提供全局依赖
        globals:{
          vue:"Vue"
        }
      }
    }
  }
})
