import { createVitePlugin } from 'unplugin';
import { versionPluginFactory } from '.';

export default createVitePlugin(versionPluginFactory);
