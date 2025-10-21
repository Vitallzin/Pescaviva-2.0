// vite.config.ts (Versão CORRIGIDA)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  server: {
    port: 5173
  },
  // ==========================================
  // ADIÇÃO CRUCIAL PARA O DEPLOY NO VERCEL
  // ==========================================
  build: {
    outDir: '../dist' 
  }
})