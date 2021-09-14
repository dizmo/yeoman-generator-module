[![NPM version](https://badge.fury.io/js/<%= encodeURIComponent(name) %>.svg)](https://npmjs.org/package/<%= name %>)
[![Build Status](https://travis-ci.com/<%= name[0] === '@' ? name.slice(1) : name %>.svg?branch=master)](https://travis-ci.com/<%= name[0] === '@' ? name.slice(1) : name %>)
[![Coverage Status](https://coveralls.io/repos/github/<%= name[0] === '@' ? name.slice(1) : name %>/badge.svg?branch=master)](https://coveralls.io/github/<%= name[0] === '@' ? name.slice(1) : name %>?branch=master)

# <%= name %>

Module.

## Usage

### Installation

```sh
npm install <%= name %> --save
```

### Import

```javascript
import '<%= name %>';
```

### Example(s)

```javascript
...
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

## Debugging

Connect `<%= name %>` to another project:

```sh
[<%= name %>] $ npm link # symlink global:<%= name %>
```

```sh
[a-project] $ npm link <%= name %> # symlink node-modules:<%= name %>
```

```sh
[a-project] $ head webpack.config.js # ensure <%= name %> in entry.main
```

```
entry: {
    main: [..., '<%= name %>', './source/index.js']
}
```

Disconnect `<%= name %>` from the project:

```sh
[a-project] $ npm unlink <%= name %> # delete local symlink
```

```sh
[<%= name %>] $ npm uninstall -g # delete global symlink
```

## Documentation

```sh
npm run docs
```

## Publication

```sh
npm publish
```

#### initially (if public):

```sh
npm publish --access=public
```

## Copyright

 © <%= year %> [<%= personName %>](<%= personUrl %>)
