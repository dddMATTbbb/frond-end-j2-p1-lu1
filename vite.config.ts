import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      tailwindcss(),
      react()
  ],
    test: {
        exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
      environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts'
  }
})
