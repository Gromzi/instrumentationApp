import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
    // viteStaticCopy({
    //   targets: [
    //     { src: 'src/music', dest: 'src/' },
    //     { src: 'src/samples', dest: 'src/' }
    //   ]
    // })
  ],
  base: './',
  build: {
    outDir: 'dist-react'
  },
  server: {
    port: 5123,
    strictPort: true
  }
})
