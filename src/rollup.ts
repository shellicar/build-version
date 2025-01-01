import { createRollupPlugin } from 'unplugin';
import { versionPluginFactory } from '.';

export default createRollupPlugin(versionPluginFactory);
