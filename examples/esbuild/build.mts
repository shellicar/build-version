import graphqlPlugin from '@shellicar/build-version/esbuild';
import type { Options } from '@shellicar/build-version/types';
import { build } from 'esbuild';

const options: Options = {
  versionCalculator: 'git',
  debug: true,
};

build({
  entryPoints: ['src/main.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  target: 'node20',
  tsconfig: 'tsconfig.json',
  plugins: [graphqlPlugin(options)],
});
