[![NPM version](https://badge.fury.io/js/%40dizmo%2Fgenerator-module.svg)](https://npmjs.org/package/@dizmo/generator-module)
[![Build Status](https://travis-ci.org/dizmo/yeoman-generator-module.svg?branch=master)](https://travis-ci.org/dizmo/yeoman-generator-module)

# @dizmo/generator-module

> Generator for [Node.js] JavaScript, TypeScript and CoffeeScript modules

## Prerequisites

* [Node.js] v10.15.3 LTS (or higher); for Linux distribution based packages (`deb` or `rpm`) see also [binary distributions](https://github.com/nodesource/distributions).

## Install

```sh
npm install -g yo
```

```sh
npm install -g @dizmo/generator-module
```

**Note:** On most operating systems the `-g` option (shortcut for `--global`) requires super user (administrator) rights. Due to security considerations however, avoid using such a privileged account and see the [FAQ](#i-cannot-install-yo-globally-with-npm-install--g) section to be able to install global packages as a *regular* user.


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

## FAQ

### I cannot install `yo` globally with `npm install -g`?

You have to set up `npm` for global installations, since `yo` should neither be installed nor run with `sudo`. The preferred approach here is to enable `npm` to install packages globally *without* breaking out of the `$HOME` folder, by setting a local `node` `prefix`. This is achieved for example by running:

```sh
echo 'prefix = ~/.node' >> ~/.npmrc
```

in your local shell. After that the `$PATH` environment variable needs to be modified, to point to the new installation destination for the global `node` executables, by adjusting your favorite shell's configuration &ndash; for example use:

```sh
export PATH="$PATH:$HOME/.node/bin"
```

in your `~/.bashrc`. After that, you can happily run `npm install -g yo` without `sudo` and without running into potential permission conflicts. Further, later-on if something gets completely broken and you want to start from scratch, all you need to do, is to remove your `~/.node` directory.

### Security Audits

The [npm] tool offers the `npm audit` and `npm audit fix` commands, which scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies. Run `npm help audit` to get an in-depth description about this tool.

## Copyright

 © 2019 [dizmo AG](http://dizmo.com/), Switzerland

[Node.js]: https://nodejs.org
