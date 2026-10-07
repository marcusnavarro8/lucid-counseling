import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose on the LAN (0.0.0.0) so phones can connect
    port: 7777,
    strictPort: true, // fail instead of silently picking another port
    allowedHosts: true, // accept tunnel hosts (*.trycloudflare.com, etc.)
  },
})
