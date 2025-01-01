import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import VersionPlugin from '@shellicar/build-version/vite';

export default defineConfig({
  clearScreen: false,
  plugins: [
    Inspect(), 
    VersionPlugin({
      versionCalculator: 'git'
    })
  ],
});
