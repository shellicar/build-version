import { execSync } from 'node:child_process';
import type { ILogger } from './types';

const FALLBACK_VERSION = '0.1.0';

const createExecCommand = (logger: ILogger) => {
  return (command: string): string | null => {
    try {
      logger.debug(`Executing git command: ${command}`);
      const result = execSync(command, { encoding: 'utf8' }).trim();
      logger.debug(`Command result: ${result}`);
      return result;
    } catch (error) {
      logger.error(`Command failed: ${command}`);
      console.error(error);
      return null;
    }
  };
};

export const createGitCalculator = (logger: ILogger) => {
  const execCommand = createExecCommand(logger);

  const hasAnyTags = (): boolean => {
    const result = execCommand('git tag --list');
    return Boolean(result && result.length > 0);
  };

  const getLatestTag = (): string | null => {
    return hasAnyTags() ? execCommand('git describe --tags --abbrev=0') : null;
  };

  const sanitizeBranchName = (branch: string): string => {
    const withoutPrefix = branch.replace(/^feature\//, '');
    return withoutPrefix.replace(/[^a-zA-Z0-9-]/g, '-');
  };

  const getCommitsSinceMainBranch = (branch: string): number => {
    const mergeBase = execCommand(`git merge-base main ${branch}`);
    if (!mergeBase) {
      return 0;
    }

    const result = execCommand(`git rev-list ${mergeBase}..HEAD --count`);
    return result ? Number.parseInt(result, 10) : 0;
  };

  return () => {
    const branch = execCommand('git rev-parse --abbrev-ref HEAD') ?? 'unknown';
    const baseVersion = getLatestTag();

    if (!baseVersion) {
      return FALLBACK_VERSION;
    }

    const [major, minor, patch] = baseVersion.split('.').map((n) => Number.parseInt(n, 10));

    if (branch === 'main') {
      return baseVersion;
    }

    const commitCount = getCommitsSinceMainBranch(branch);
    const sanitizedBranch = sanitizeBranchName(branch);
    const version = `${major}.${minor}.${patch}-${sanitizedBranch}.${commitCount}`;
    logger.debug('Using feature branch version', { branch, sanitizedBranch, commitCount, version });
    return version;
  };
};
