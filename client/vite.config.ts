import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const now = Date.now();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    sourcemap: true,
    minify: "terser",
    outDir: "static",
  }
})
