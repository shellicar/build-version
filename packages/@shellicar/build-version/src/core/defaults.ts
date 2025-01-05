import { versionPath } from './module';
import { DebugLevel, type Options } from './types';

export const defaults = {
  versionPath,
  debug: false,
  debugLevel: DebugLevel.INFO,
} satisfies Options;
