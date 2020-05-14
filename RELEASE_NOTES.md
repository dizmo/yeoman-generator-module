# RELEASE NOTES

## v2.y.z

### MAJOR CHANGES

* Support UMD modules with `npm run build`:

    So far only standard node modules where produced when invoking `npm run build`. However, to ease migration of older code bases UMD modules have been introduced which are standalone (i.e. browserfied) scripts executable in a browser context.

* Optional support UMD modules with `npm run -- build --prepack`:

    Introduced `--prepack` option to allow UMD support. Since standalone UMD modules can be relatively large, they are minified automatically (which can be suppressed by appending `--no-minify`).

* Support for ES6 via `esm` and `esmify`:

    While so far it was possible to use ES6 `import` and `export` statements in the *source* code, it was neither possible to write test cases with `import` statements, nor possible to browserify such ES6 code (e.g. when `babel` was deliberately switched off).

    With the `esm` package and the `esmify` plugin (for browserify) both problems have been fixed.

* Bundling via `webpack`:

    Replaced the `browserify` bundler with `webpack`, which required the addition of a `webpack.config.js` configuration to the project. Also, the `esmify` plugin is longer required, while `esm` still is &ndash; due to it being used in `npm test`.

* Support for `npm run docs` for JavaScript:

    Enabled documentation generation, where the `jsdoc` tool is used to parse the comments embedded within the source code to extract the necessary information.

* Support for `npm run docs` for TypeScript:

    Enabled documentation generation, where the `typedoc` tool is used to parse the comments embedded within the source code to extract the necessary information.

### NOTABLE CHANGES

* Refactored the `run-{lint, build, test}` CLI scripts:

    As a result of this refactoring the `--no-lint` and `--no-build` command line flags became completely independent of each other, while before there was an undesirable interdependence.

* Support for `npm run clean`:

    Cleans the `./dist` folder except for the `.gitignore` and `.npmignore` files, to ensure correct behaviour w.r.t. `npm run -- build --prepack`. Also, `npm run clean` is automatically invoked prior to any `npm run build` (or `npm run test`), where this behaviour can be suppressed with the `--no-clean` flag.

* Integrated generator tests with CI:

    The JavaScript, CoffeeScript and TypeScript project generators are now automatically verified with `npm test`, which is also run by the https://travis-ci.org continuous integration service. The entire list of generated files is checked, plus the full content of `package.json`.

## v1.y.z

### MAJOR CHANGES

* [Node.js] module generator (based on [Yeoman]) with support for [JavaScript], [TypeScript], and [CoffeeScript] (plus [Babel.js]).

* Support for Windows: Eliminated problematic usage of the `npx` execution helper.

### NOTABLE CHANGES

* Supports *building*, *linting*, *testing*, *continuous integration* and *coverage checks* for all three languages.

* Support for *building* without linting, *linting* with auto-fixing, *testing* and *coverage checks* without re-building.

* Support for *optional* `--typescript` and `--coffeescript` flags after `yo @dizmo/dizmo --upgrade`.

[Babel.js]: http://babeljs.io
[CoffeeScript]: http://coffeescript.org
[JavaScript]: https://www.ecma-international.org
[Node.js]: https://nodejs.org
[TypeScript]: http://www.typescriptlang.org
[Yeoman]: http://yeoman.io
