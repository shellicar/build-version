import { DebugLevel } from './enums';
import type { Options } from './types';
import { versionPath } from './module';

export const defaults = {
  versionPath,
  debugLevel: DebugLevel.INFO
} satisfies Options;
