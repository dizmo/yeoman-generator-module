[![NPM version](https://badge.fury.io/js/%40dizmo%2Fgenerator-module.svg)](https://npmjs.org/package/@dizmo/generator-module)

# @dizmo/generator-module
> Generator for [Node.js] JavaScript, TypeScript and CoffeeScript modules

## Prerequisites

* [Node.js] v8.11.3 LTS (or higher); for Linux distribution based packages (`deb` or `rpm`) see also [binary distributions](https://github.com/nodesource/distributions).

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
### Build
```sh
npm run build
```
#### without linting:
```sh
npm run -- build --no-lint
```
### Lint
```sh
npm run lint
```
#### with auto-fixing (for JavaScript and TypeScript):
```sh
npm run -- lint --fix
```
### Test
```sh
npm run test
```
#### without (re-)building:
```sh
npm run -- test --no-build
```
### Cover
```sh
npm run cover
```
#### without (re-)building:
```sh
npm run -- cover --no-build
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

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland

[Node.js]: https://nodejs.org
