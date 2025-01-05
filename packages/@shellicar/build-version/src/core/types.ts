import type { DebugLevel } from "./enums";

export type VersionCalculator = () => string;

export type VersionCalculatorType = 'gitversion' | 'git' | VersionCalculator;

export interface Options {
  /**
   * Version calculator configuration
   * @default 'gitversion'
   */
  versionCalculator?: VersionCalculatorType;
  /**
   * Pattern to match the resolved version path
   */
  versionPath?: string;
  debug?: boolean;
  debugLevel?: DebugLevel;
}

export interface VersionInfo {
  buildDate: string;
  branch: string;
  sha: string;
  shortSha: string;
  commitDate: string;
  version: string;
}
