# @shellicar/build-version

> Build plugin that calculates and exposes version information through a virtual module import.

[![npm package](https://img.shields.io/npm/v/@shellicar/build-version.svg)](https://npmjs.com/package/@shellicar/build-version)
[![build status](https://github.com/shellicar/build-version/actions/workflows/node.js.yml/badge.svg)](https://github.com/shellicar/build-version/actions/workflows/node.js.yml)

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
