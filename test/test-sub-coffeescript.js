const assert = require('yeoman-assert');
const { run } = require('yeoman-test');
const { join } = require('path');

describe('generator-module:sub-coffeescript', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module --coffeescript', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'coffeescript': true,
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
                'coffeelint.json',
                'docs/.gitignore',
                'dist',
                'dist/.gitignore',
                'dist/.npmignore',
                'jsdoc.json',
                'lib',
                'lib/index.coffee',
                'LICENSE',
                '.npmignore',
                'package.json',
                'README.md',
                'test',
                'test/test.coffee',
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
                    '@babel/cli': '^7.8.4',
                    '@babel/core': '^7.9.6',
                    '@babel/preset-env': '^7.9.6',
                    'chai': '^4.2.0',
                    'coffeelint': '2.1.0',
                    'coffeescript': '^2.5.1',
                    'coveralls': '^3.1.0',
                    'esm': '^3.2.25',
                    'jsdoc': '^3.6.4',
                    'minami': '^1.2.3',
                    'mocha': '^7.1.2',
                    'nyc': '^15.0.1',
                    'source-map-loader': '^0.2.4',
                    'tmp': '^0.2.1',
                    'webpack': '^4.43.0',
                    'webpack-cli': '^3.3.11',
                    'yargs': '^15.3.1'
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
    it('yo @dizmo/module --coffeescript --git', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'coffeescript': true,
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
