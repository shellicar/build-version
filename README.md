# @shellicar/build-version

Build plugin that calculates and exposes version information through a virtual module import.

- ⚡️ Supports Vite, Webpack, Rspack, Vue CLI, Rollup, esbuild and more, powered by [unplugin](https://github.com/unjs/unplugin).

## Usage

```sh
pnpm add -D @shellicar/build-version
```

### With Vite

```ts
import VersionPlugin from '@shellicar/build-version/vite'

export default defineConfig({
  plugins: [
    VersionPlugin({
      versionCalculator: 'git'
    })
  ]
})
```

### Importing Version Information

```ts
interface VersionInfo {
  buildDate: string;
  branch: string;
  sha: string;
  shortSha: string;
  commitDate: string;
  version: string;
}
```

```ts
import version from '@shellicar/build-version/version'

console.log(version)
```

### Version Calculators

#### Git Calculator
Uses pure git commands to calculate version numbers following mainline versioning:
- On main branch: increment patch version for each commit after a tag
- On feature branches: use base version with branch name and commit count suffix
- On PR branches: use PR number in version suffix

Example versions:
- Tagged commit on main: `1.2.3`
- Commits after tag on main: `1.2.4`, `1.2.5`
- Feature branch: `1.2.3-feature-name.2`
- PR branch: `1.2.3-PullRequest0123.2`

#### GitVersion Calculator
Uses the GitVersion CLI to calculate versions. Requires GitVersion to be installed.

#### Custom Calculator
Provide your own version calculation function:

```ts
VersionPlugin({
  versionCalculator: () => '1.0.0-custom'
})
```

## Options

See [types.ts](./packages/build-version/src/core/types.ts) for detailed options documentation.

## Credits

- [unplugin](https://github.com/unjs/unplugin)
- [GitVersion](https://gitversion.net)
