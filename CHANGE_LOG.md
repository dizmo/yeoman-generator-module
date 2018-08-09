# CHANGE LOG

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
