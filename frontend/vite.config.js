import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // басқа құрылғылардан қолжетімді болу үшін
    port: 5173,      // Docker контейнерімен сәйкес болуы керек
  },
})
