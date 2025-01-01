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
