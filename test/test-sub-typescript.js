const assert = require('yeoman-assert');
const { run } = require('yeoman-test');
const { join } = require('path');

describe('generator-module:sub-typescript', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module --typescript', () => {
        return run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'typescript': true
        }).then(() => {
            assert.file([
                'babel.config.js',
                'cli',
                'cli/run-build.js',
                'cli/run-clean.js',
                'cli/run-lint.js',
                'cli/run-prepack.js',
                'cli/run-test.js',
                'cli/run-utils.js',
                'dist',
                'dist/.gitignore',
                'dist/.npmignore',
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
                'tslint.json',
                '.yo-rc.json'
            ]);
            assert.jsonFileContent('package.json', {
                'author': {
                    'name': 'Dizmo Developer',
                    'email': 'developer@dizmo.com',
                    'url': ''
                },
                'contributors': [
                    {
                        'name': 'Dizmo Developer',
                        'email': 'developer@dizmo.com',
                        'url': ''
                    }
                ],
                'dependencies': {},
                'description': 'library module',
                'devDependencies': {
                    '@babel/cli': '^7.5.5',
                    '@babel/core': '^7.5.5',
                    '@babel/preset-env': '^7.5.5',
                    '@types/chai': '^4.2.0',
                    '@types/mocha': '^5.2.7',
                    'browserify': '^16.5.0',
                    'chai': '^4.2.0',
                    'coveralls': '^3.0.6',
                    'esm': '^3.2.25',
                    'esmify': '^2.1.1',
                    'exorcist': '^1.0.1',
                    'mocha': '^6.2.0',
                    'nyc': '^14.1.1',
                    'tslint': '^5.19.0',
                    'typescript': '^3.5.3',
                    'yargs': '^14.0.0'
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
