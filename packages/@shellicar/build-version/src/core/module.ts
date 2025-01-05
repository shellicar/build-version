import { name } from '../../package.json';

const exportSpecifier = 'version2';

export const MODULE_ID = `${name}/${exportSpecifier}`;
export const versionPath = `${name}/dist/core/${exportSpecifier}\.c?js`;
// export const versionPath = '@shellicar/build-version/packages/build-version/dist/core/version2\.c?js';
