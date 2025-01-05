import { name } from '../../package.json';

const exportSpecifier = 'version';

export const MODULE_ID = `${name}/${exportSpecifier}`;
export const versionPath = `${name}/dist/core/${exportSpecifier}\.c?js`;
