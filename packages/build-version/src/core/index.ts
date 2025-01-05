import { execSync } from 'node:child_process';
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import { defaults } from './defaults';
import { createGitCalculator } from './git';
import { createGitversionCalculator } from './gitversion';
import type { Options, VersionCalculator } from './types';
import { DebugLevel } from './enums';
import packageJson from '../../package.json';

const MODULE_ID = `${packageJson.name}/version2`


const execCommand = (command: string): string => {
  return execSync(command, { encoding: 'utf8' }).trim();
};

const getCalculator = (options?: Options): VersionCalculator => {
  if (typeof options?.versionCalculator === 'function') {
    return options.versionCalculator;
  }

  switch (options?.versionCalculator) {
    case 'git':
      return createGitCalculator({ debug: options?.debug });
    default:
      return createGitversionCalculator(options?.versionCalculator ?? 'gitversion');
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

const versionPluginFactory: UnpluginFactory<Options> = (inputOptions: Options, meta) => {
  const options = {
    ...defaults,
    ...inputOptions,
  };
  const info = (message: any, ...args: any) => {
    if (options.debug && options.debugLevel <= DebugLevel.INFO) {
      console.info('[info][version]:', message, ...args);
    }
  };
  const debug = (message: any, ...args: any) => {
    if (options.debug && options.debugLevel <= DebugLevel.DEBUG) {
      console.debug('[dbug][version]:', message, ...args);
    }
  };
  info({options});

  const versionPattern = new RegExp(options.versionPath);
  
  const matchVersion = (id: string) => {
    if (meta.framework === 'vite') {
      const match = versionPattern.test(id);
      if (match) {
        info('Found match', id);
        return true;
      }
    }
    else {
      const match = id === MODULE_ID;
      if (match) {
        info('Found match', id);
        return true;
      }
    }
    return false;
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
    transform(code, id) {
      // debug('transform', { code, id });
    },
    transformInclude(id) {
      // debug('transformInclude', id);
      return true;
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
