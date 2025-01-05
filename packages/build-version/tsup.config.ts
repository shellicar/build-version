import type { Options } from 'tsup';

export default (<Options>{
  entry: ['src/**/*.ts'],
  clean: true,
  bundle: true,
  format: ['cjs', 'esm'],
  tsconfig: 'tsconfig',
  dts: {
    banner: `/// <reference path="version.d.ts" />`
  },
  cjsInterop: true,
  treeshake: true,
  outDir: 'dist',
  minify: 'terser',
  sourcemap: true,
  keepNames: true,
  splitting: true,
});
