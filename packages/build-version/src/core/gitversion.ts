import { execSync } from 'node:child_process';
import type { VersionCalculator } from './types';

type GitversionType = 'gitversion';

const gitversionCalculator = (calculator: GitversionType) => {
  return execSync(`${calculator} -showvariable SemVer`, { encoding: 'utf8' }).trim();
};

export const createGitversionCalculator = (calculator: GitversionType): VersionCalculator => {
  return () => {
    return gitversionCalculator(calculator);
  };
};
