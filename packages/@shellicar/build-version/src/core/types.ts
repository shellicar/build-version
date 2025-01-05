export type VersionCalculator = () => string;

export type VersionCalculatorType = 'gitversion' | 'git' | VersionCalculator;

export interface Options {
  /**
   * Version calculator configuration
   * @default 'gitversion'
   */
  versionCalculator?: VersionCalculatorType;
  debug?: boolean;
}

export interface VersionInfo {
  buildDate: string;
  branch: string;
  sha: string;
  shortSha: string;
  commitDate: string;
  version: string;
}

export type ILogger = {
  debug: (typeof console)['debug'];
  error: (typeof console)['error'];
};
