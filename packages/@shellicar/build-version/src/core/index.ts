import { type UnpluginFactory, createUnplugin } from 'unplugin';
import { virtualModuleId } from './module';
import type { ILogger, Options } from './types';
import { loadVirtualModule } from './version';

const resolveVirtualId = (id: string) => `\0${id}`;

const pluginFactory: UnpluginFactory<Options> = (options: Options) => {
  const debug = options.debug ? (message?: unknown, ...optionalParams: unknown[]) => console.debug(`[version] ${message}`, ...optionalParams) : () => {};
  const error = (message?: unknown, ...optionalParams: unknown[]) => console.error(`[version] ${message}`, ...optionalParams);
  const logger: ILogger = {
    debug,
    error,
  };

  return {
    name: 'unplugin-version',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        debug('resolveId %s', id);
        return resolveVirtualId(virtualModuleId);
      }
    },
    load(id) {
      if (id === resolveVirtualId(virtualModuleId)) {
        debug('load %s', id);
        return loadVirtualModule(options, logger);
      }
    },
  };
};

export const plugin = createUnplugin(pluginFactory);
