import type { Options } from './core/types';
import { plugin } from './core';

export default plugin.vite as unknown as ((options?: Options) => import('vite').Plugin[]);
