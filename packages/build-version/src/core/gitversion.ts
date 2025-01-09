import { execSync } from 'node:child_process';
import type { VersionCalculator } from './types';

const gitversionCalculator = () => {
  const version = execSync('gitversion -showvariable SemVer', { encoding: 'utf8' }).trim();
  const branch = execSync('gitversion -showvariable BranchName', { encoding: 'utf8' }).trim();
  return {
    version,
    branch,
  };
};

export const createGitversionCalculator = (): VersionCalculator => {
  return () => {
    return gitversionCalculator();
  };
};
