import cleanPlugin from '@shellicar/build-clean/esbuild';
import { defineConfig, type Options } from 'tsup';

const commonOptions = (watch: Options['watch']) =>
  ({
    entry: ['src/**/*.ts'],
    clean: false,
    bundle: true,
    tsconfig: 'tsconfig.json',
    dts: true,
    cjsInterop: true,
    treeshake: true,
    minify: watch ? 'terser' : false,
    sourcemap: true,
    keepNames: true,
    splitting: true,
    esbuildPlugins: [cleanPlugin({ destructive: true })],
  }) satisfies Options;

export default defineConfig((options) => [
  {
    ...commonOptions(options.watch),
    format: ['esm'],
    outDir: 'dist/esm',
  },
  {
    ...commonOptions(options.watch),
    format: ['cjs'],
    outDir: 'dist/cjs',
  },
]);
