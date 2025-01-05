import type { Options } from '../../@shellicar/build-version/dist/core/types';
import VersionPlugin from '../../@shellicar/build-version/dist/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

const versionCalculator = process.env.CI ? 'git' : 'gitversion';

const options: Options = {
  debug: true,
  versionCalculator,
};

export default defineConfig({
  clearScreen: false,
  plugins: [Inspect(), VersionPlugin(options)],
});
