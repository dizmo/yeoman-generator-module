const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const { join } = require('path');

describe('generator-module:sub-coffeescript', function () {
    const generator = join(__dirname, '../generators/app');
    it('yo @dizmo/module --coffeescript', () => {
        return helpers.run(generator).withOptions({
            'author': 'Dizmo Developer',
            'coffeescript': true,
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
                'my-module/coffeelint.json',
                'my-module/docs/.gitignore',
                'my-module/dist',
                'my-module/dist/.gitignore',
                'my-module/dist/.npmignore',
                'my-module/jsdoc.json',
                'my-module/lib',
                'my-module/lib/index.coffee',
                'my-module/LICENSE',
                'my-module/.npmignore',
                'my-module/package.json',
                'my-module/README.md',
                'my-module/test',
                'my-module/test/test.coffee',
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
                    '@babel/cli': '^7.15.4',
                    '@babel/core': '^7.15.5',
                    '@babel/plugin-transform-runtime': '^7.15.0',
                    '@babel/preset-env': '^7.15.6',
                    'chai': '^4.3.4',
                    'coffeelint': '2.1.0',
                    'coffeescript': '^2.5.1',
                    'coveralls': '^3.1.1',
                    'jsdoc': '^3.6.7',
                    'minami': '^1.2.3',
                    'mocha': '^9.1.1',
                    'nyc': '^15.1.0',
                    'source-map-loader': '^3.0.0',
                    'tmp': '^0.2.1',
                    'webpack': '^5.52.1',
                    'webpack-cli': '^4.8.0',
                    'yargs': '^17.1.1'
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
    it('yo @dizmo/module --coffeescript --git', () => {
        return helpers.run(generator).withOptions({
            'author': 'Dizmo Developer',
            'coffeescript': true,
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
