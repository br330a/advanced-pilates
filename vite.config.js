import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fontes devem ser arquivos próprios: a CSP permite font-src 'self', não data:.
  build: {
    assetsInlineLimit: 0,
  },
})
