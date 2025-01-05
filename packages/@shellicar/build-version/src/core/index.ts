import { execSync } from 'node:child_process';
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import { defaults } from './defaults';
import { createGitCalculator } from './git';
import { createGitversionCalculator } from './gitversion';
import { MODULE_ID } from './module';
import { DebugLevel, type Options, type VersionCalculator } from './types';

const execCommand = (command: string): string => {
  return execSync(command, { encoding: 'utf8' }).trim();
};

const getCalculator = (options: Options): VersionCalculator => {
  if (typeof options?.versionCalculator === 'function') {
    return options.versionCalculator;
  }

  switch (options.versionCalculator) {
    case 'git':
      return createGitCalculator({ debug: options.debug });
    default:
      return createGitversionCalculator(options.versionCalculator ?? 'gitversion');
  }
};

const generateVersionInfo = (calculator: VersionCalculator) => {
  const sha = execCommand('git rev-parse HEAD');
  const shortSha = sha.substring(0, 7);
  return {
    buildDate: new Date().toISOString(),
    branch: execCommand('git rev-parse --abbrev-ref HEAD'),
    sha,
    shortSha,
    commitDate: execCommand('git log -1 --format=%cI'),
    version: calculator(),
  };
};

const versionPluginFactory: UnpluginFactory<Options> = (inputOptions?: Options, meta?) => {
  const options = {
    ...defaults,
    ...inputOptions,
  };
  const info = (message: any, ...args: any) => {
    if (options.debug && options.debugLevel <= DebugLevel.INFO) {
      console.info('[version] (info):', message, ...args);
    }
  };
  const debug = (message: any, ...args: any) => {
    if (options.debug && options.debugLevel <= DebugLevel.DEBUG) {
      console.debug('[version] (dbug):', message, ...args);
    }
  };
  info({ options });

  const versionPattern = new RegExp(options.versionPath);

  const matchVersion = (id: string) => {
    if (meta?.framework === 'vite') {
      return versionPattern.test(id);
    }
    return id === MODULE_ID;
  };

  info({ options });
  const calculator = getCalculator(options);

  return {
    name: 'version',
    buildStart() {
      info('Build start');
    },
    buildEnd() {
      info('Build end');
    },
    loadInclude(id) {
      if (matchVersion(id)) {
        debug('loadInclude', id);
        return true;
      }
    },
    resolveId(id) {
      if (matchVersion(id)) {
        debug('resoleId', id);
        return id;
      }
    },
    load(id) {
      if (matchVersion(id)) {
        debug('load', id);
        const versionInfo = generateVersionInfo(calculator);
        const json = JSON.stringify(versionInfo, null, 2);
        const code = `export default ${json}`;
        return code;
      }
    },
  };
};

export const plugin = createUnplugin(versionPluginFactory);
