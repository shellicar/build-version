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

  const getPullRequestNumber = (branch: string): number | null => {
    const match = branch.match(/^pull\/(\d+)\/merge$/);
    return match ? Number.parseInt(match[1], 10) : null;
  };

  const getVersionInfo = (): { tag: string; distance: number } => {
    const describe = execCommand('git describe --tags --long');
    if (!describe) {
      return {
        tag: FALLBACK_VERSION,
        distance: 0,
      };
    }

    const match = describe.match(/^(.*)-(\d+)-g[0-9a-f]+$/);
    if (!match) {
      return {
        tag: FALLBACK_VERSION,
        distance: 0,
      };
    }

    return {
      tag: match[1],
      distance: Number.parseInt(match[2], 10),
    };
  };

  const sanitizeBranchName = (branch: string): string => {
    return branch.replace(/[^a-zA-Z0-9-]/g, '-');
  };

  const parseVersion = (tag: string): { major: number; minor: number; patch: number } => {
    const [major = '0', minor = '0', patch = '0'] = tag.split('.');
    return {
      major: Number.parseInt(major, 10) ?? 0,
      minor: Number.parseInt(minor, 10) ?? 0,
      patch: Number.parseInt(patch, 10) ?? 0,
    };
  };

  const getBranchOrRef = (): string => {
    const currentBranch = execCommand('git branch --show-current');
    if (currentBranch) {
      return currentBranch;
    }

    const detachedHead = execCommand('git branch | grep "\\*"');
    if (!detachedHead) {
      return 'unknown';
    }

    const match = detachedHead.match(/HEAD detached at ([^)]+)/);
    return match ? match[1] : detachedHead;
  };

  return () => {
    const branch = getBranchOrRef();
    const prNumber = getPullRequestNumber(branch);
    const { tag, distance } = getVersionInfo();

    if (branch === 'main') {
      const { major, minor, patch } = parseVersion(tag);
      return `${major}.${minor}.${patch + distance}`;
    }

    const sanitizedBranch = prNumber ? `PullRequest-${prNumber}` : sanitizeBranchName(branch);
    const version = `${tag}-${sanitizedBranch}.${distance}`;
    logger.debug('Using feature branch version', { branch, sanitizedBranch, distance, version });
    return version;
  };
};
