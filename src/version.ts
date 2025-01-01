interface VersionInfo {
  buildDate: string;
  branch: string;
  sha: string;
  shortSha: string;
  commitDate: string;
  version: string;
}
const versionInfo: VersionInfo = {
  branch: '',
  buildDate: '',
  commitDate: '',
  sha: '',
  shortSha: '',
  version: '',
};
export default versionInfo;
