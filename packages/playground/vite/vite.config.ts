import type { Options } from '@shellicar/build-version/types';
import VersionPlugin from '@shellicar/build-version/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

console.log('env', Object.entries(process.env));

const isGithub = process.env['GITHUB_ACTIONS'];
const isCi = process.env['CI'];
console.log('test', { isGithub, isCi });

const options: Options = {
  debug: true,
  versionCalculator: 'gitversion',
  versionPath: '/build-version/dist/core/version.js$',
};

export default defineConfig({
  clearScreen: false,
  plugins: [Inspect(), VersionPlugin(options)],
});
