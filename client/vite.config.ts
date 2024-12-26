import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'process'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
