import { defineConfig, mergeConfig } from 'vite'
import { getConfig } from '@packages/build/vite.config'

const config = getConfig({
  type: 'react',
  micro: true,
  moduleName: 'demo-react-1',
  dirname: __dirname,
})

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(config, {
    server: {
      host: true,
      port: 8081,
    },
  })
)
