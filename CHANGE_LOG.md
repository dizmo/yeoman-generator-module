# CHANGE LOG

## v2.1.z

* Support UMD modules with `npm run build`:

    So far only standard node modules were produced when invoking `npm run build`. However, to ease migration of older code bases UMD modules have been introduced, which are standalone (i.e. browserfied) scripts executable in a browser context.

* Optional support UMD modules with `npm run -- build --no-umd`:

    Introduced `--no-umd` option to suppress UMD support, since standalone UMD modules can be relatively large compared to regular ones.

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
