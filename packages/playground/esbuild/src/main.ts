import type { VersionInfo } from '@shellicar/build-version/dist/core/types';
import version from '@shellicar/build-version/dist/core/version2';
import { z } from 'zod';

const testVersion = (v: VersionInfo) => {
  const schema = z.object({
    buildDate: z.string().datetime(),
    branch: z.string().min(1),
    sha: z.string().length(40),
    shortSha: z.string().length(7),
    commitDate: z.string().min(1),
    version: z.string().min(1),
  });
  console.log(schema.parse(v));
};

testVersion(version);
