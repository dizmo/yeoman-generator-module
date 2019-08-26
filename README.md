[![NPM version](https://badge.fury.io/js/%40dizmo%2Fgenerator-module.svg)](https://npmjs.org/package/@dizmo/generator-module)
[![Build Status](https://travis-ci.org/dizmo/yeoman-generator-module.svg?branch=master)](https://travis-ci.org/dizmo/yeoman-generator-module)

# @dizmo/generator-module

> Generator for [Node.js] JavaScript, TypeScript and CoffeeScript modules

## Prerequisites

* [Node.js] v10.15.3 LTS (or higher); for Linux distribution based packages (`deb` or `rpm`) see also [binary distributions](https://github.com/nodesource/distributions).

## Install

```sh
(sudo) npm install -g yo
```

```sh
(sudo) npm install -g @dizmo/generator-module
```

## Help

```sh
yo @dizmo/module --help
```

## Generate

```sh
yo @dizmo/module [--git] [--typescript|--coffeescript]
```

## Upgrade

```sh
yo @dizmo/module --upgrade
```

## Development

### Clean

```sh
npm run clean
```

### Build

```sh
npm run build
```

#### without linting and cleaning:

```sh
npm run -- build --no-lint --no-clean
```

#### with UMD bundling (incl. minimization):

```sh
npm run -- build --prepack
```

#### with UMD bundling (excl. minimization):

```sh
npm run -- build --prepack --no-minify
```

### Lint

```sh
npm run lint
```

#### with auto-fixing:

```sh
npm run -- lint --fix
```

### Test

```sh
npm run test
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- test --no-lint --no-clean --no-build
```

### Cover

```sh
npm run cover
```

#### without linting, cleaning and (re-)building:

```sh
npm run -- cover --no-lint --no-clean --no-build
```

## Publish

```sh
npm publish
```

#### initially (if `public`):

```sh
npm publish --access=public
```

## Copyright

 © 2019 [dizmo AG](http://dizmo.com/), Switzerland

[Node.js]: https://nodejs.org
