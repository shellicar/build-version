import graphqlPlugin from '@shellicar/build-version/esbuild';
import type { Options } from '@shellicar/build-version/types';
import { build } from 'esbuild';

console.log('env', Object.entries(process.env));

const isGithub = process.env['GITHUB_ACTIONS'];
const isCi = process.env['CI'];
console.log('test', { isGithub, isCi });

const options: Options = {
  versionCalculator: 'git',
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
