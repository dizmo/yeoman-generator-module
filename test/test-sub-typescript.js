const assert = require('yeoman-assert');
const { run } = require('yeoman-test');
const { join } = require('path');

describe('generator-module:sub-typescript', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module --typescript', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'typescript': true,
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
                'lib',
                'lib/index.ts',
                'LICENSE',
                '.npmignore',
                'package.json',
                'README.md',
                'test',
                'test/test.ts',
                '.travis.yml',
                'tsconfig.json',
                'typedoc.json',
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
                    '@babel/cli': '^7.10.5',
                    '@babel/core': '^7.11.1',
                    '@babel/preset-env': '^7.11.0',
                    '@babel/plugin-transform-runtime': '^7.11.0',
                    '@types/chai': '^4.2.12',
                    '@types/mocha': '^8.0.1',
                    '@typescript-eslint/eslint-plugin': '3.9.0',
                    '@typescript-eslint/parser': '3.9.0',
                    'chai': '^4.2.0',
                    'coveralls': '^3.1.0',
                    'eslint': '^7.6.0',
                    'esm': '^3.2.25',
                    'minami': '^1.2.3',
                    'mocha': '^8.1.1',
                    'nyc': '^15.1.0',
                    'typedoc': '^0.18.0',
                    'typescript': '^3.9.7',
                    'source-map-loader': '^1.0.1',
                    'webpack': '^4.44.1',
                    'webpack-cli': '^3.3.12',
                    'yargs': '^15.4.1'
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
                'types': 'dist/lib/index.d.ts',
                'version': '1.0.0'
            });
        });
    });
    it('yo @dizmo/module --typescript --git', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'git': true,
            'typescript': true
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
