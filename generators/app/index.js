'use strict';

const chalk = require('chalk');
const fs = require('fs');
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const process = require('process');
const shell = require('shelljs');
const rimraf = require('rimraf');
const yosay = require('yosay');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('name', {
            defaults: '@dizmo/my-module',
            required: false,
            type: String
        });
        this.option('description', {
            desc: 'Short one-liner describing the module',
            type: String
        });
        this.option('author', {
            defaults: this.user.git.name() || process.env.USER,
            desc: 'Name of the author',
            type: String
        });
        this.option('email', {
            defaults: this.user.git.email() || process.env.MAIL,
            desc: 'Email of the author',
            type: String
        });
        this.option('url', {
            defaults:
                this.config.get('promptValues') &&
                this.config.get('promptValues').personUrl || process.env.URL,
            desc: 'URL of the author',
            type: String
        });
        this.option('git', {
            defaults: false,
            desc: 'GIT repository initialization',
            type: Boolean
        });
        this.option('coffeescript', {
            alias: 'coffee-script',
            defaults: false,
            desc: 'Sub-generator with CoffeeScript',
            type: Boolean
        });
        this.option('typescript', {
            alias: 'type-script',
            defaults: false,
            desc: 'Sub-generator with TypeScript',
            type: Boolean
        });
        this.option('upgrade', {
            defaults: false,
            desc: 'Upgrade the build system',
            type: Boolean
        });
    }
    prompting() {
        const self = this;
        const prompts = [];
        const pkg = fs.existsSync('package.json')
            ? JSON.parse(fs.readFileSync('package.json')) : {};
        this.log(yosay('Welcome to the {0} generator!'.replace(
            '{0}', chalk.green.bold(
                oc(self.options['prompts'], 'yosay') || 'dizmo module'
            )
        )));
        prompts.push({
            type: 'input',
            name: 'name',
            message: 'Name your module:',
            default: function () {
                if (pkg && pkg.name) {
                    return pkg.name;
                }
                return self.options['name'];
            },
            when: function (prop) {
                if (pkg && pkg.name) {
                    if (!pkg.name.match(/\s/)) {
                        prop.name = pkg.name;
                        return false;
                    }
                }
                if (self.args.length > 0) {
                    if (!self.args[0].match(/\s/)) {
                        prop.name = self.args[0];
                        return false;
                    }
                }
                return true;
            },
            validate: function (value) {
                return !value.match(/\s/);
            }
        });
        prompts.push({
            type: 'input',
            name: 'description',
            message: 'Describe it:',
            default: function () {
                if (pkg && pkg.description) {
                    return pkg.description;
                }
                return self.description
                    || oc(oc(self.options['prompts'], 'description'), 'default')
                    || 'a module';
            },
            when: function (prop) {
                if (pkg && pkg.description) {
                    prop.description = pkg.description;
                    return false;
                }
                if (self.options['description']) {
                    prop.description = self.options['description'];
                    return false;
                }
                return true;
            }
        });
        prompts.push({
            store: true,
            type: 'input',
            name: 'personName',
            message: 'What\'s your name?',
            default: function () {
                if (pkg && pkg.author && pkg.author.name) {
                    return pkg.author.name;
                }
                return self.personName;
            },
            when: function (prop) {
                if (pkg && pkg.author && pkg.author.name) {
                    prop.personName = pkg.author.name;
                    return false;
                }
                if (self.options['author']) {
                    prop.personName = self.options['author'];
                    return false;
                }
                return true;
            }
        });
        prompts.push({
            store: true,
            type: 'input',
            name: 'personEmail',
            message: 'And your email?',
            default: function () {
                if (pkg && pkg.author && pkg.author.email) {
                    return pkg.author.email;
                }
                return self.personEmail;
            },
            when: function (prop) {
                if (pkg && pkg.author && pkg.author.email) {
                    prop.personEmail = pkg.author.email;
                    return false;
                }
                if (self.options['email']) {
                    prop.personEmail = self.options['email'];
                    return false;
                }
                return true;
            }
        });
        prompts.push({
            store: true,
            type: 'input',
            name: 'personUrl',
            message: 'And your URL?',
            default: function () {
                if (pkg && pkg.author && pkg.author.url) {
                    return pkg.author.url;
                }
                return self.personUrl;
            },
            when: function (prop) {
                if (pkg && pkg.author && pkg.author.url) {
                    prop.personUrl = pkg.author.url;
                    return false;
                }
                if (self.options['url']) {
                    prop.personUrl = self.options['url'];
                    return false;
                }
                return true;
            }
        });
        return this.prompt(prompts).then(function (prop) {
            if (prop.name === undefined) {
                if (pkg && pkg.name) {
                    prop.name = pkg.name;
                } else {
                    prop.name = self.options['name'];
                }
            }
            if (prop.description === undefined) {
                if (pkg && pkg.description) {
                    prop.description = pkg.description;
                } else {
                    prop.description = self.options['description']
                        || oc(oc(self.options['prompts'], 'description'), 'default')
                        || 'a module';
                }
            }
            if (prop.personName === undefined) {
                if (pkg && pkg.author && pkg.author.name) {
                    prop.personName = pkg.author.name;
                } else {
                    prop.personName = self.options['author'];
                }
            }
            if (prop.personEmail === undefined) {
                if (pkg && pkg.author && pkg.author.email) {
                    prop.personEmail = pkg.author.email;
                } else {
                    prop.personEmail = self.options['email'];
                }
            }
            if (prop.personUrl === undefined) {
                if (pkg && pkg.author && pkg.author.url) {
                    prop.personUrl = pkg.author.url;
                } else {
                    prop.personUrl = self.options['url'];
                }
            }
            self.properties = lodash.assign(prop, {
                _: lodash
            });
        });
    }
    configuring() {
        if (fs.existsSync('package.json')) {
            this.destinationRoot(process.cwd());
        } else {
            const root = lodash.kebabCase(this.properties.name[0] === '@'
                ? this.properties.name.split('/')[1] || this.properties.name
                : this.properties.name);
            if (this.options['git']) {
                this.destinationRoot(root + '.git');
            } else {
                this.destinationRoot(root);
            }
            this.properties.initial = true;
        }
        this.config.save();
    }
    writing() {
        const upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json')
        );
        if (!upgrade) {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), this.properties, {
                _: lodash
            });
        }
        const pkg = this.fs.readJSON(
            this.destinationPath('package.json')
        );
        if (!upgrade || upgrade) {
            pkg.dependencies = sort(
                lodash.assign(pkg.dependencies, {
                })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    '@babel/cli': '^7.12.10',
                    '@babel/core': '^7.12.10',
                    '@babel/plugin-transform-runtime': '^7.12.10',
                    '@babel/preset-env': '^7.12.11',
                    'chai': '^4.2.0',
                    'coveralls': '^3.1.0',
                    'jsdoc': '^3.6.6',
                    'minami': '^1.2.3',
                    'mocha': '^8.2.1',
                    'nyc': '^15.1.0',
                    'source-map-loader': '^2.0.0',
                    'webpack': '^5.11.1',
                    'webpack-cli': '^4.3.1',
                    'yargs': '^16.2.0'
                })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'eslint': '^7.17.0'
                })
            );
            pkg.scripts = sort(
                lodash.assign(pkg.scripts, {
                    'build': 'node ./cli/run-build.js',
                    'clean': 'node ./cli/run-clean.js',
                    'cover': 'node ./cli/run-test.js --cover',
                    'docs': 'node ./cli/run-docs.js',
                    'lint': 'node ./cli/run-lint.js',
                    'prepack': 'node ./cli/run-prepack.js',
                    'test': 'node ./cli/run-test.js'
                })
            );
        }
        if (!upgrade || upgrade) {
            this.fs.copyTpl(
                this.templatePath('cli/'),
                this.destinationPath('cli/'), {
                    ...this.properties, _: require('lodash')
                }
            );
        }
        if (!upgrade) {
            this.fs.copyTpl(
                this.templatePath('lib/'),
                this.destinationPath('lib/'), {
                    ...this.properties, _: require('lodash')
                }
            );
            this.fs.copyTpl(
                this.templatePath('test/'),
                this.destinationPath('test/'), {
                    ...this.properties, _: require('lodash')
                }
            );
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('babel.config.js'),
                this.destinationPath('babel.config.js'));
            this.fs.copy(
                this.templatePath('webpack.config.js'),
                this.destinationPath('webpack.config.js'));
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('_travis.yml'),
                this.destinationPath('.travis.yml'));
            this.fs.copy(
                this.templatePath('_eslintrc.json'),
                this.destinationPath('.eslintrc.json'));
        }
        if (!upgrade) {
            this.fs.copyTpl(
                this.templatePath('LICENSE'),
                this.destinationPath('LICENSE'), {
                    ...this.properties, year: new Date().getFullYear(),
                    _: require('lodash')
                }
            );
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'), {
                    ...this.properties, year: new Date().getFullYear(),
                    _: require('lodash')
                }
            );
        }
        if (!upgrade) {
            if (this.options.git || fs.existsSync('.gitignore')) {
                this.fs.copy(
                    this.templatePath('_npmignore'),
                    this.destinationPath('.gitignore'));
            } else {
                this.fs.copy(
                    this.templatePath('_npmignore'),
                    this.destinationPath('.npmignore'));
            }
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('dist/_gitignore'),
                this.destinationPath('dist/.gitignore'));
            this.fs.copy(
                this.templatePath('dist/_npmignore'),
                this.destinationPath('dist/.npmignore'));
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('jsdoc.json'),
                this.destinationPath('jsdoc.json'));
            this.fs.copy(
                this.templatePath('docs/_gitignore'),
                this.destinationPath('docs/.gitignore'));
        }
        this.fs.writeJSON(
            this.destinationPath('package.json'), sort(pkg), null, 2
        );
        this.conflicter.force = upgrade;
    }
    end() {
        const pkg = this.fs.readJSON(
            this.destinationPath('package.json')
        );
        if (!this.options['typescript'] && this.options.upgrade && pkg.devDependencies['coffeescript'] ||
            !this.options['typescript'] && this.options['coffeescript']
        ) {
            this.composeWith(require.resolve(
                '../sub-coffeescript'
            ), lodash.assign(this.options, {
                args: this.args, force: this.properties.initial
            }));
        } else if (
            !this.options['coffeescript'] && this.options.upgrade && pkg.devDependencies['typescript'] ||
            !this.options['coffeescript'] && this.options['typescript']
        ) {
            this.composeWith(require.resolve(
                '../sub-typescript'
            ), lodash.assign(this.options, {
                args: this.args, force: this.properties.initial
            }));
        } else {
            this.log(
                `\nSetting the project root at: ${this.destinationPath()}`);
        }
        this._rim();
        this._git();
    }
    _rim() {
        rimraf.sync(
            this.destinationPath('node_modules/'));
    }
    _git() {
        const git = shell.which('git');
        if (git && this.options.git) {
            this.spawnCommand(git.toString(), [
                'init', '--quiet', this.destinationPath()
            ]);
        }
    }
};
function sort(object) {
    return Object.entries(object).sort().reduce(
        (a, [k, v]) => { a[k] = v; return a; }, {}
    );
}
function oc(el, a) {
    return el ? el[a] : undefined;
}
