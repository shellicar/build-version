import type { Options } from '@shellicar/build-version/types';
import VersionPlugin from '@shellicar/build-version/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

const versionCalculator = process.env.CI ? 'git' : 'gitversion';

const options: Options = {
  debug: true,
  versionCalculator,
  versionPath: '/build-version/dist/core/version.js$',
};

export default defineConfig({
  clearScreen: false,
  plugins: [Inspect(), VersionPlugin(options)],
});
