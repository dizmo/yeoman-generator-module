[![NPM version](https://badge.fury.io/js/<%= encodeURIComponent(name) %>.svg)](https://npmjs.org/package/<%= name %>)
[![Build Status](https://travis-ci.org/<%= name[0] === '@' ? name.slice(1) : name %>.svg?branch=master)](https://travis-ci.org/<%= name[0] === '@' ? name.slice(1) : name %>)
[![Coverage Status](https://coveralls.io/repos/github/<%= name[0] === '@' ? name.slice(1) : name %>/badge.svg?branch=master)](https://coveralls.io/github/<%= name[0] === '@' ? name.slice(1) : name %>?branch=master)

# <%= name %>

Library module.

## Usage

### Install

```sh
npm install <%= name %> --save
```

### Require

```javascript
const lib = require('<%= name %>');
```

### Examples

```javascript
...
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

#### with UMD support (incl. minimization):

```sh
npm run -- build --prepack
```

#### with UMD support (excl. minimization):

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

## Copyright

 © <%= year %> [<%= personName %>](<%= personUrl %>)
