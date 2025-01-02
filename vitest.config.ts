import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: [
        'html'
      ],
      include: [
        'src/**/*.ts',
      ],
      exclude: [
        'src/**/*.spec.ts',
        'src/index.ts',
      ]
    },
  },
})
