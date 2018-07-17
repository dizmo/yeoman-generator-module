# @dizmo/generator-module [![NPM version][npm-image]][npm-url]
> Generator for [Node.js] JavaScript, TypeScript and CoffeeScript modules

## Prerequisites

* [Node.js] v8.1.10 LTS (or higher); for Linux distribution based packages (`deb` or `rpm`) see also [binary distributions](https://github.com/nodesource/distributions).

## Install
```bash
(sudo) npm install -g yo
```
```bash
(sudo) npm install -g @dizmo/generator-module
```

## Help
```bash
yo @dizmo/module --help
```

## Generate
### JavaScript
```bash
yo @dizmo/module
```
### TypeScript
```bash
yo @dizmo/module --typescript
```
### CoffeeScript
```bash
yo @dizmo/module --coffeescript
```

## Upgrade
### JavaScript
```bash
yo @dizmo/module --upgrade
```
### TypeScript
```bash
yo @dizmo/module --upgrade --typescript
```
### CoffeeScript
```bash
yo @dizmo/module --upgrade --coffeescript
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
npm run lint:fix
```
Only supported for JavaScript and TypeScript, but not CoffeeScript modules.
### Test
```sh
npm run test
```
### Cover
```sh
npm run cover
```

## Copyright

 © 2018 [dizmo AG](http://dizmo.com/), Switzerland

[Node.js]: https://nodejs.org

[npm]: http://www.npmjs.com
[npm-image]: https://badge.fury.io/js/%40dizmo%2Fgenerator-module.svg
[npm-url]: https://npmjs.org/package/@dizmo/generator-module
