import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/device.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
