import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    setupFiles: './test/config/setup-tests.ts',
    environmentMatchGlobs: [
      ['src/domain/**/infra/http/controllers/**', 'prisma'],
    ],
  },
})
