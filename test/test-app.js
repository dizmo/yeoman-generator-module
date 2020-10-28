const assert = require('yeoman-assert');
const { run } = require('yeoman-test');
const { join } = require('path');

describe('generator-module:app', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'url': 'https://www.dizmo.com/developer'
        }).then(() => {
            assert.file([
                'babel.config.js',
                'cli',
                'cli/run-build.js',
                'cli/run-clean.js',
                'cli/run-docs.js',
                'cli/run-lint.js',
                'cli/run-prepack.js',
                'cli/run-test.js',
                'cli/run-utils.js',
                'docs/.gitignore',
                'dist',
                'dist/.gitignore',
                'dist/.npmignore',
                '.eslintrc.json',
                'jsdoc.json',
                'lib',
                'lib/index.js',
                'LICENSE',
                '.npmignore',
                'package.json',
                'README.md',
                'test',
                'test/test.js',
                '.travis.yml',
                'webpack.config.js',
                '.yo-rc.json'
            ]);
            assert.jsonFileContent('package.json', {
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
                'description': 'library module',
                'devDependencies': {
                    '@babel/cli': '^7.12.1',
                    '@babel/core': '^7.12.3',
                    '@babel/plugin-transform-runtime': '^7.12.1',
                    '@babel/preset-env': '^7.12.1',
                    'chai': '^4.2.0',
                    'coveralls': '^3.1.0',
                    'eslint': '^7.12.1',
                    'esm': '^3.2.25',
                    'jsdoc': '^3.6.6',
                    'minami': '^1.2.3',
                    'mocha': '^8.2.0',
                    'nyc': '^15.1.0',
                    'source-map-loader': '^1.1.2',
                    'webpack': '^5.3.0',
                    'webpack-cli': '^4.1.0',
                    'yargs': '^16.1.0'
                },
                'files': [
                    'dist/lib'
                ],
                'keywords': [
                    'library',
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
                    'test': 'node ./cli/run-test.js'
                },
                'version': '1.0.0'
            });
        });
    });
    it('yo @dizmo/module --git', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'git': true
        }).then(() => {
            assert.file([
                '.gitignore'
            ]);
            assert.noFile([
                '.npmignore'
            ]);
        });
    });
});
