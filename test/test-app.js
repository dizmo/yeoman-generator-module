const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const { join } = require('path');

describe('generator-module:app', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module', () => {
        return helpers.run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'url': 'https://www.dizmo.com/developer'
        }).then(() => {
            assert.file([
                'my-module/babel.config.js',
                'my-module/cli',
                'my-module/cli/run-build.js',
                'my-module/cli/run-clean.js',
                'my-module/cli/run-docs.js',
                'my-module/cli/run-lint.js',
                'my-module/cli/run-prepack.js',
                'my-module/cli/run-test.js',
                'my-module/cli/run-utils.js',
                'my-module/docs/.gitignore',
                'my-module/dist',
                'my-module/dist/.gitignore',
                'my-module/dist/.npmignore',
                'my-module/.eslintrc.json',
                'my-module/jsdoc.json',
                'my-module/lib',
                'my-module/lib/index.js',
                'my-module/LICENSE',
                'my-module/.npmignore',
                'my-module/package.json',
                'my-module/README.md',
                'my-module/test',
                'my-module/test/test.js',
                'my-module/.travis.yml',
                'my-module/webpack.config.js',
                'my-module/.yo-rc.json'
            ]);
            assert.jsonFileContent('my-module/package.json', {
                'author': {
                    'name': 'Dizmo Developer',
                    'email': 'developer@dizmo.com',
                    'url': 'https://www.dizmo.com/developer'
                },
                'contributors': [
                    {
                        'name': 'Dizmo Developer',
                        'email': 'developer@dizmo.com',
                        'url': 'https://www.dizmo.com/developer'
                    }
                ],
                'dependencies': {},
                'description': 'a module',
                'devDependencies': {
                    '@babel/cli': '^7.14.5',
                    '@babel/core': '^7.14.5',
                    '@babel/plugin-transform-runtime': '^7.14.5',
                    '@babel/preset-env': '^7.14.5',
                    'chai': '^4.3.4',
                    'coveralls': '^3.1.0',
                    'eslint': '^7.28.0',
                    'jsdoc': '^3.6.7',
                    'minami': '^1.2.3',
                    'mocha': '^9.0.0',
                    'nyc': '^15.1.0',
                    'source-map-loader': '^3.0.0',
                    'webpack': '^5.38.1',
                    'webpack-cli': '^4.7.2',
                    'yargs': '^17.0.1'
                },
                'files': [
                    'dist/lib'
                ],
                'keywords': [
                    'module'
                ],
                'license': 'ISC',
                'main': 'dist/lib/index.js',
                'name': '@dizmo/my-module',
                'repository': {
                    'type': 'git',
                    'url': ''
                },
                'scripts': {
                    'build': 'node ./cli/run-build.js',
                    'clean': 'node ./cli/run-clean.js',
                    'cover': 'node ./cli/run-test.js --cover',
                    'docs': 'node ./cli/run-docs.js',
                    'lint': 'node ./cli/run-lint.js',
                    'prepack': 'node ./cli/run-prepack.js',
                    'prepare': 'npm run -- build --prepack',
                    'test': 'node ./cli/run-test.js'
                },
                'version': '1.0.0'
            });
        });
    });
    it('yo @dizmo/module --git', () => {
        return helpers.run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'git': true
        }).then(() => {
            assert.file([
                'my-module.git/.gitignore'
            ]);
            assert.noFile([
                'my-module.git/.npmignore'
            ]);
        });
    });
});
