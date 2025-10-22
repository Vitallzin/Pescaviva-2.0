// vite.config.ts (Versão CORRIGIDA)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src',
   server: {
    open: true,
    port: 4099,
    host: true,
    strictPort: true,
  },
})