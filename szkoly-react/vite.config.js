import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: { // obsluga dyskow sieciowych
		watch: {
			usePolling: true
		}
	},
  plugins: [react()],
})
