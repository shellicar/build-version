import { execSync } from 'node:child_process';

const FALLBACK_VERSION = '0.1.0';

const createExecCommand = (debug: boolean) => {
  return (command: string): string | null => {
    try {
      if (debug) {
        console.log(`Executing git command: ${command}`)
      }
      const result = execSync(command, { encoding: 'utf8' }).trim();
      if (debug) {
        console.log(`Command result: ${result}`);
      }
      return result;
    } catch (error) {
      if (debug) {
        console.error(`Command failed: ${command}`);
        console.error(error);
      }
      return null;
    }
  };
};

export const createGitCalculator = (options?: { debug?: boolean }) => {
  const execCommand = createExecCommand(Boolean(options?.debug));

  const hasAnyTags = (): boolean => {
    const result = execCommand('git tag --list');
    return Boolean(result && result.length > 0);
  };

  const getLatestTag = (): string | null => {
    return hasAnyTags() ? execCommand('git describe --tags --abbrev=0') : null;
  };

  const getTotalCommitCount = (): number => {
    const result = execCommand('git rev-list --count HEAD');
    return result ? Number.parseInt(result, 10) : 1;
  };

  const getCommitsSinceTag = (tag: string): number => {
    const result = execCommand(`git rev-list ${tag}..HEAD --count`);
    return result ? Number.parseInt(result, 10) + 1 : 1;
  };

  const getPullRequestNumber = (branch: string): string | null => {
    const prMatch = branch.match(/^PR-(\d+)$/);
    return prMatch ? prMatch[1] : null;
  };

  const sanitizeBranchName = (branch: string): string => {
    const withoutPrefix = branch.replace(/^feature\//, '');
    return withoutPrefix.replace(/[^a-zA-Z0-9-]/g, '-');
  };

  return () => {
    const branch = execCommand('git rev-parse --abbrev-ref HEAD') ?? 'unknown';
    const baseVersion = getLatestTag(); // returns null if no tags

    const commitCount = baseVersion === null
      ? getTotalCommitCount()
      : getCommitsSinceTag(baseVersion);

    // Only use exact tag version on main when we have a tag and it's the current commit
    if (branch === 'main' && baseVersion !== null && commitCount === 1) {
      return baseVersion;
    }

    // Use fallback version only when parsing version components
    const [major, minor, patch] = (baseVersion ?? FALLBACK_VERSION)
      .split('.')
      .map(n => Number.parseInt(n, 10));

    if (branch === 'main') {
      return `${major}.${minor}.${patch + commitCount - 1}`;
    }

    const prNumber = getPullRequestNumber(branch);
    if (prNumber) {
      return `${major}.${minor}.${patch}-PullRequest${prNumber.padStart(4, '0')}.${commitCount}`;
    }

    const sanitizedBranch = sanitizeBranchName(branch);
    return `${major}.${minor}.${patch}-${sanitizedBranch}.${commitCount}`;
  };
};
