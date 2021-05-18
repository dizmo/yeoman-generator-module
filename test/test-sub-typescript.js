const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const { join } = require('path');

describe('generator-module:sub-typescript', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module --typescript', () => {
        return helpers.run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'typescript': true,
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
                'my-module/lib',
                'my-module/lib/index.ts',
                'my-module/LICENSE',
                'my-module/.npmignore',
                'my-module/package.json',
                'my-module/README.md',
                'my-module/test',
                'my-module/test/test.ts',
                'my-module/.travis.yml',
                'my-module/tsconfig.json',
                'my-module/typedoc.json',
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
                    '@babel/cli': '^7.14.3',
                    '@babel/core': '^7.14.3',
                    '@babel/plugin-transform-runtime': '^7.14.3',
                    '@babel/preset-env': '^7.14.2',
                    '@types/chai': '^4.2.18',
                    '@types/mocha': '^8.2.2',
                    '@typescript-eslint/eslint-plugin': '4.24.0',
                    '@typescript-eslint/parser': '4.24.0',
                    'chai': '^4.3.4',
                    'coveralls': '^3.1.0',
                    'eslint': '^7.26.0',
                    'minami': '^1.2.3',
                    'mocha': '^8.4.0',
                    'nyc': '^15.1.0',
                    'source-map-loader': '^2.0.2',
                    'typedoc': '^0.20.36',
                    'typescript': '^4.2.4',
                    'webpack': '^5.37.0',
                    'webpack-cli': '^4.7.0',
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
                'types': 'dist/lib/index.d.ts',
                'version': '1.0.0'
            });
        });
    });
    it('yo @dizmo/module --typescript --git', () => {
        return helpers.run(generator).withOptions({
            'author': 'Dizmo Developer',
            'email': 'developer@dizmo.com',
            'git': true,
            'typescript': true
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
