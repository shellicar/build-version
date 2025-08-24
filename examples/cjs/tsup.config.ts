import versionPlugin from '@shellicar/build-version/esbuild';
import type { Options } from '@shellicar/build-version/types';
import { defineConfig } from 'tsup';

const pluginOptions = {
  debug: true,
  strict: true,
  versionCalculator: () => ({
    branch: 'bob',
    version: '1.2.3',
  }),
} satisfies Options;

export default defineConfig(() => ({
  entry: ['src/main.ts'],
  splitting: true,
  sourcemap: false,
  treeshake: true,
  dts: false,
  clean: false,
  minify: false,
  keepNames: true,
  bundle: true,
  tsconfig: 'tsconfig.json',
  target: 'node22',
  format: ['cjs'],
  outDir: 'dist',
  esbuildPlugins: [versionPlugin(pluginOptions)],
}));
