# RELEASE NOTES

## v2.y.z

### MAJOR CHANGES

* Refactored the `run-{lint, build, test}` CLI scripts:

    As a result of this refactoring the `--no-lint` and `--no-build` command line flags became completely independent of each other, while before there was an undesirable interdependence.

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
