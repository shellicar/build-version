import { execSync } from 'node:child_process';
import type { VersionCalculator } from '../types';

const gitversionCalculator: VersionCalculator = () => {
  return execSync('gitversion -showvariable SemVer', { encoding: 'utf8' }).trim();
};

export const createGitversionCalculator = (options?: { debug?: boolean }): VersionCalculator => {
  return () => {
    return gitversionCalculator();
  };
}
