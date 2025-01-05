import { DebugLevel } from './enums';
import type { Options } from './types';
import packageJson from '../../package.json';

const versionPath = `${packageJson.name}/dist/version/version2\.c?js$`

export const defaults = {
  versionPath,
  debugLevel: DebugLevel.INFO
} satisfies Options;
