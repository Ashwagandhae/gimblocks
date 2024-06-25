import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['generate.ts'],
  format: ['esm'],
  clean: true,
});
