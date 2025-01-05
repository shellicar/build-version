import { DebugLevel } from './enums';
import type { Options } from './types';

export const defaults = {
  versionPath: 'virtual:version.js',
  debugLevel: DebugLevel.INFO
} satisfies Options;
