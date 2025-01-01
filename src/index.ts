import { execSync } from 'node:child_process';
import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';
import type { Options, VersionCalculator } from './types';
import { createGitCalculator } from './calculators/git';
import { createGitversionCalculator } from './calculators/gitversion';

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
      return createGitversionCalculator();
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

export const versionPluginFactory: UnpluginFactory<Options> = (options?: Options) => {
  const importFile = '@shellicar/build-version/version.json';
  console.log('options', options);
  const calculator = getCalculator(options);

  return {
    name: 'version-json',
    loadInclude(id) {
      return id === importFile;
    },
    resolveId(id) {
      if (id === importFile) {
        return id;
      }
    },
    load(id) {
      if (id === importFile) {
        const versionInfo = generateVersionInfo(calculator);
        return JSON.stringify(versionInfo, null, 2);
      }
    },
  };
};

export const unplugin = /* #__PURE__ */ createUnplugin(versionPluginFactory);

export default unplugin;
