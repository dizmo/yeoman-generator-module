# CHANGE LOG

## v2.4.z

* Support for `npm run docs`:

    It is possible now to generate documentation, where the `jsdoc` tool is used to parse the comments embedded within the source code to extract the necessary information.

## v2.3.z

* Bundling via `webpack`:

    Replaced the `browserify` bundler with `webpack`, which required the addition of a `webpack.config.js` configuration to the project. Also, the `esmify` plugin is longer required, while `esm` still is &ndash; due to it being used in `npm test`.

## v2.2.z

* Support for `npm run clean`:

    The `./dist` folder by default contains the `.gitignore` and `.npmignore` files, to ensure correct behaviour w.r.t. `npm run -- build --prepack`, i.e. any `./dist/*.umd.js` or `./dist/*.min.js` bundles are *ignored* by GIT, but they are *still* published by NPM.

    To avoid these ignore files being accidentally removed (with e.g. a manual `rm ./dist`), introduced `npm run clean` which cleans the `./dist` directory *except* for these `.gitignore` and `.npmignore` files. Further, `npm run clean` is automatically invoked prior to any `npm run build` (or `npm run test`), where this behavior can be suppressed with the `--no-clean` flag.

* Support for ES6 via `esm` and `esmify`:

    While so far it was possible to use ES6 `import` and `export` statements in the *source* code, it was neither possible to write test cases with `import` statements, nor possible to browserify such ES6 code (e.g. when `babel` was deliberately switched off).

    With the `esm` package and the `esmify` plugin (for browserify) both problems have been fixed.

* Integrated generator tests with CI:

    The JavaScript, CoffeeScript and TypeScript project generators are now automatically verified with `npm test`, which is also run by the https://travis-ci.org continuous integration service. The entire list of generated files is checked, plus the full content of `package.json`.

## v2.1.z

* Support UMD modules with `npm run build`:

    So far only standard node modules were produced when invoking `npm run build`. However to ease migration of older code bases UMD modules have been introduced, which are standalone (i.e. browserfied) scripts executable in a browser context.

* Optional support UMD modules with `npm run -- build --no-umd`:

    Introduced `--no-umd` option to suppress UMD support, since standalone UMD modules can be relatively large compared to regular ones.

* Enforced optionality of UMD modules with `npm run -- build [--prepack]`:

    Creating UMD modules is a slow process. Hence `npm run build` does not create UMD modules by default anymore, but `npm run -- build --prepack` does. Further, the created UMD modules are then automatically minified, but which can be suppressed with `npm run -- build --prepack --no-minify`. Also, when running `npm pack` the `prepack` step to generate the UMD files is automatically run (which is also the case for `npm publish`).

## v2.0.z

* Refactored the `run-{lint, build, test}` CLI scripts:

    So far the CLI scripts where making re-use of each other via `npm run-script`, which worked fine but was relatively slow due to the indirect invocation. Now, the scripts make directly use of each other's functionality.

    The result of this refactoring is also, that the `--no-lint` and `--no-build` command line flags became completely independent of each other, while before there was an undesirable interdependence.

## v1.2.z

* Optional `--typescript` and `--coffeescript` flags on `--upgrade`:

    When upgrading a TypeScript or CoffeeScript project a simple `yo @dizmo/module --upgrade` is enough. The auto-detection is achieved by checking in `package.json:devDependencies` the `typescript` or `coffeescript` entries.

## v1.1.z

* Support for *building* without linting, *linting* with auto-fixing, *testing* and *coverage checks* without re-building.

* Support for native testing for [CoffeeScript] and [TypeScript] projects.

* Support for Windows: Eliminated problematic usage of the `npx` execution helper.

## v1.0.z

* [Node.js] module generator (based on [Yeoman]) with support for [JavaScript], [CoffeeScript], and [TypeScript] (plus [Babel.js]).

* Supports *building*, *linting*, *testing*, *continuous integration* and *coverage checks* for all three languages.

[Babel.js]: http://babeljs.io
[CoffeeScript]: http://coffeescript.org
[JavaScript]: https://www.ecma-international.org
[Node.js]: https://nodejs.org
[TypeScript]: http://www.typescriptlang.org
[Yeoman]: http://yeoman.io
