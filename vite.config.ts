import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
      tailwindcss(),
      react()
  ],
    test: {
        exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
      environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts'
  }
})
