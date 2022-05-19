import { defineConfig, mergeConfig } from 'vite'
import { getConfig } from '@packages/build/vite.config'

const config = getConfig({
  type: 'vue',
  micro: true,
  moduleName: 'demo-vue-1',
  dirname: __dirname,
})

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(config, {
    server: {
      host: true,
      port: 8083,
    },
  })
)
