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
var lib = require('<%= name %>');
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

## License

 © <%= year %> [<%= personName %>](<%= personUrl %>)
