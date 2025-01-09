# @shellicar/build-version

> Build plugin that calculates and exposes version information through a virtual module import.

## Installation & Quick Start

```sh
npm i --save @shellicar/build-version
```

```sh
pnpm add @shellicar/build-version
```

```ts
// vite.config.ts
import VersionPlugin from '@shellicar/build-version/vite'

export default defineConfig({
  plugins: [
    VersionPlugin({})
  ]
})
```

```ts
// main.ts
import version from '@shellicar/build-version/version'
```

## Documentation

For full documentation, visit [here](https://github.com/shellicar/build-version).
