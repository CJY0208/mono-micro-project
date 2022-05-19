import { defineConfig, mergeConfig, UserConfig } from 'vite'
import { ip, getConfig } from '@packages/build/vite.config'

const sharedConfig = getConfig({
  type: 'react',
  dirname: __dirname,
})

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(sharedConfig, {
    server: {
      host: true,
      port: 8080,
      proxy: {
        '/demo-react-1': 'http://localhost:8081/',
        '/demo-react-2': 'http://localhost:8082/',
        '/demo-vue-1': 'http://localhost:8083/',
        '/demo-vue-2': 'http://localhost:8084/',
      },
    },
  } as UserConfig)
)
