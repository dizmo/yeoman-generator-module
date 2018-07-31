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
yo @dizmo/module [--typescript|--coffeescript] [--git]
```

## Upgrade
```sh
yo @dizmo/module [--typescript|--coffeescript] --upgrade
```

## Development
### Build
```sh
npm run build
```
### Lint
```sh
npm run lint
```
#### with fixes:
```sh
npm run -- lint --fix
```
Supported for JavaScript and TypeScript, but not CoffeeScript modules.
### Test
```sh
npm run test
```
### Cover
```sh
npm run cover
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
