# Creating NPM packages with [@dizmo/generator-module]

NPM has become a hugely important part of the JavaScript ecosystem. It allows the easy packaging and publication of various projects and libraries, which can be based on JavaScript or other languages like for example [TypeScript] (or CoffeeScript).

At [dizmo], we have developed the [@dizmo/generator-module] NPM module generator, which allows us to quickly create an NPM based library project with support for the following features:

* **Generation:** the process of generating an NPM based module (based upon a template);

* **Transpilation:** the process of translating from e.g. (modern) JavaScript or TypeScript to (older) JavaScript;

* **Bundling:** the process of bundling various separate JavaScript modules into a single one;

* **Minification:** the process of compressing a large module into a smaller one;

* **Linting:** the process of checking that the coding style meets certain standards;

* **Testing:** the process of testing code for expected behavior;

* **Coverage analysis:** the process of checking how much of the code is covered by tests;

* **Continuous integration:** the process of automatically running tests (on a remote server).

## Generation

Our module generator is based on [Yeoman]. After installing [Yeoman] and the [@dizmo/generator-module] package, you can create an NPM project with:

```sh
yo @dizmo/module [--git] [--typescript|--coffeescript]
```

As you see we support pure JavaScript, TypeScript and CoffeeScript projects. Further -- provided the [`git`] command is available -- it is possible to initialized a project as a GIT repository. Let's have a closer look at a JavaScript project:

### JavaScript module

```sh
yo @dizmo/module --git
```
```sh
     _-----_     
    |       |    ╭──────────────────────────╮
    |--(o)--|    │  Welcome to the awesome  │
   `---------´   │  dizmo module generator! │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? Name your module: @dizmo/my-module
? Describe it: library module
? And your URL? https://github.com/hsk81
   create package.json
   create cli/run-build.js
   create cli/run-lint.js
   create cli/run-prepack.js
   create cli/run-test.js
   create cli/run-utils.js
   create lib/index.js
   create test/test.js
   create LICENSE
   create README.md
   create .travis.yml
   create .eslintrc.json
   create .gitignore
   create dist/.gitignore
   create dist/.npmignore

Setting the project root at: /home/hsk81/my-module.git
```

### Directory structure

```sh
tree my-module.git/ -a
```
```sh
my-module.git/
├── cli
│   ├── run-build.js
│   ├── run-lint.js
│   ├── run-prepack.js
│   ├── run-test.js
│   └── run-utils.js
├── dist
│   ├── .gitignore
│   └── .npmignore
├── .eslintrc.json
├── .gitignore
├── lib
│   └── index.js
├── LICENSE
├── package.json
├── README.md
├── test
│   └── test.js
├── .travis.yml
└── .yo-rc.json

4 directories, 16 files
```
where we have omitted above the `.git` sub-directory. Let's have an even closer look at the various sub-directories:

#### `./cli` --- **the embedded build system**
```sh
tree my-module.git/cli/ -a
```
```sh
my-module.git/cli/
├── run-build.js
├── run-lint.js
├── run-prepack.js
├── run-test.js
└── run-utils.js

0 directories, 5 files
```
These scripts beneath the `./cli` folder provide support for all the features listed above: building (transpilation), linting (code standard adherence), testing (code correctness with coverage analysis), and prepackaging (bundling with minification).

The totality of this embedded build systems is *less than* `100` lines of code, and thanks to it being directly embedded into the project, it allows for specific adjustments of the build process.

#### `./dist` --- **the distribution folder**
```sh
tree my-module.git/dist/ -a
```
```sh
my-module.git/dist/
├── .gitignore
└── .npmignore

0 directories, 2 files
```
The `./dist` folder is the target location of the transpilation, bundling and minification processes. The `.gitignore` file here ensures that no bundle (which can be rather large) is committed to the GIT repository, while the (empty) `.npmignore` file ensures that the bundle *is* published to the NPM repository.

Hence, these two files should *never* be removed: Sometimes, it is necessary to clean-up the remaining files under `./dist`, upon which great care should be taken to *not* also accidentally remove these `.gitignore` and `.npmignore` files. 

#### `./lib` --- **the source folder**

```sh
tree my-module.git/lib/ -a
```
```sh
my-module.git/lib/
└── index.js

0 directories, 1 file
```

The `./lib` folder contains all the source files, which collectively make up the library; it is also possible to create sub-folders within it. By default a single `index.js` is given, which with its `export` statements provides the API of this library.

#### `./test` --- **the test folder**

```sh
tree my-module.git/test/ -a
```
```sh
my-module.git/test/
└── test.js

0 directories, 1 file
```

The `./test` folder contains test scripts (beginning with a `test` prefix), which together test the code under `./lib` for expected behavior. By default a single `test.js` is given containing test cases for `./lib/index.js`.

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

By invoking `npm run build` all scripts under `./lib` (and `./test`) are by default transpiled and linted. Optionally, they are bundled and then minified. The transpilation is performed with [Babel], linting with [ESLint], (UMD) bundling with [Browserify] and minification with [Terser.js].

[Babel]: https://babeljs.io/

### Lint

```sh
npm run lint
```

#### with auto-fixing:

```sh
npm run -- lint --fix
```

By invoking `npm run lint` the linting process can also be triggered separately (outside of a build process), and it is performed with [ESLint], whereas the `.eslintrc.json` file is used for configuring the set of linting rules.

[ESLint]: https://eslint.org/

### Test

```sh
npm run test
```

#### without (re-)building:

```sh
npm run -- test --no-build
```

By invoking `npm run test` by default a build step is performed, after which the (transpiled) test scripts are executed -- using the [Mocha] framework.

[Mocha]: https://mochajs.org/

### Cover

```sh
npm run cover
```

#### without (re-)building:

```sh
npm run -- cover --no-build
```

By invoking `npm run cover` by default a build step is performed, after which the (transpiled) test scripts are executed -- using [Mocha] in combination with the [Istanbul.js] coverage framework (to provide corresponding statistics).

[Istanbul.js]: https://istanbul.js.org/

## Publish

```sh
npm publish
```

#### initially (if public):

```sh
npm publish --access=public
```

By invoking `npm publish` the transpiled scripts under `./dist` are prepackaged by bundling and minifying them, after which the bundle is then published to the NPM registry. While for bundling [Browserify] is used, for minification [Terser.js] is facilitated.

[Browserify]: http://browserify.org/
[Terser.js]: https://www.npmjs.com/package/terser

## Continuous integration

```sh
$ cat .travis.yml 
```
```sh
language : node_js
node_js :
 - stable
install:
 - npm install
script:
 - npm run cover

after_script: "npx nyc report --reporter=text-lcov | npx coveralls"
```
When the source code of the NPM library is pushed to a GIT repository (for example on GitHub.com), it can automatically be tested using the [Travis CI] service. For this to work a `.travis.yml` configuration (as shown above) needs to be provided (which is generated by [@dizmo/generator-module]). Further, the [Travis CI] needs to have access to the corresponding GIT repository -- to be able to pull and test the most recent commits.

Finally, the results of the tests is reported to the [Coveralls] service, which offers a user interface to interactively investigate the portions of the code base, which are (or are *not*) covered by the provided test cases (under `./test`).

[Travis CI]: https://travis-ci.org/
[Coveralls]: https://coveralls.io/
----
[dizmo]: https://dizmo.com/
[@dizmo/generator-module]: https://www.npmjs.com/package/@dizmo/generator-module/
[`git`]: https://git-scm.com/
[TypeScript]: http://www.typescriptlang.org/
[Yeoman]: https://yeoman.io/
