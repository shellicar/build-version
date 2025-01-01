import { createEsbuildPlugin } from 'unplugin';
import { versionPluginFactory } from '.';

export default createEsbuildPlugin(versionPluginFactory);
