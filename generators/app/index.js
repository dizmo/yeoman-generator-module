'use strict';

let chalk = require('chalk'),
    fs = require('fs'),
    generator = require('yeoman-generator'),
    lodash = require('lodash'),
    process = require('process'),
    shell = require('shelljs'),
    rimraf = require('rimraf'),
    yosay = require('yosay');

function sort(dictionary) {
    let array = [],
        sorted = {};

    for(let key in dictionary) {
        array[array.length] = key;
    }
    array.sort();

    for(let i = 0; i < array.length; i++) {
        sorted[array[i]] = dictionary[array[i]];
    }
    return sorted;
}

module.exports = class extends generator {
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
        let prompts = [], pkg = fs.existsSync('package.json')
            ? JSON.parse(fs.readFileSync('package.json'))
            : {};

        this.log(yosay(
            'Welcome to the awesome {0} generator!'.replace(
                '{0}', chalk.green.bold('dizmo module')
            )
        ));

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
                return self.description || 'library module';
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
                        || 'library module';
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
            let root = lodash.kebabCase(this.properties.name[0] === '@'
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
        let upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json'));
        if (!upgrade) {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), this.properties, {
                    _: lodash
                });
        }
        if (!upgrade || upgrade) {
            this.fs.copyTpl(
                this.templatePath('cli/'),
                this.destinationPath('cli/'), this.properties);
        }
        if (!upgrade || upgrade) {
            let pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            pkg.dependencies = sort(
                lodash.assign(pkg.dependencies, {
                })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    '@babel/cli': '^7.5.5',
                    '@babel/core': '^7.5.5',
                    '@babel/preset-env': '^7.5.5',
                    'browserify': '^16.5.0',
                    'chai': '^4.2.0',
                    'coveralls': '^3.0.6',
                    'esm': '^3.2.25',
                    'esmify': '^2.1.1',
                    'exorcist': '^1.0.1',
                    'mocha': '^6.2.0',
                    'nyc': '^14.1.1',
                    'yargs': '^13.3.0'
               })
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'eslint': '^6.2.0'
                })
            );
            pkg.scripts = sort(
                lodash.assign(pkg.scripts, {
                    'build': 'node ./cli/run-build.js',
                    'clean': 'node ./cli/run-clean.js',
                    'cover': 'node ./cli/run-test.js --cover',
                    'lint': 'node ./cli/run-lint.js',
                    'prepack': 'node ./cli/run-prepack.js',
                    'test': 'node ./cli/run-test.js'
                })
            );
            this.fs.writeJSON(
                this.destinationPath('package.json'), sort(pkg), null, 2);
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('lib/'),
                this.destinationPath('lib/'));
            this.fs.copy(
                this.templatePath('test/'),
                this.destinationPath('test/'));
            this.fs.copyTpl(
                this.templatePath('LICENSE'),
                this.destinationPath('LICENSE'), lodash.assign(
                    this.properties, {year: new Date().getFullYear()}
                )
            );
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'), this.properties);
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('babel.config.js'),
                this.destinationPath('babel.config.js'));
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('_travis.yml'),
                this.destinationPath('.travis.yml'));
            this.fs.copy(
                this.templatePath('_eslintrc.json'),
                this.destinationPath('.eslintrc.json'));
        }
        if (!upgrade || upgrade) {
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
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('dist/_gitignore'),
                this.destinationPath('dist/.gitignore'));
            this.fs.copy(
                    this.templatePath('dist/_npmignore'),
                    this.destinationPath('dist/.npmignore'));
        }
        this.conflicter.force = upgrade;
    }

    end() {
        let pkg = this.fs.readJSON(
            this.destinationPath('package.json'));

        if (!this.options['typescript'] && this.options.upgrade && pkg.devDependencies['coffeescript'] ||
            !this.options['typescript'] && this.options['coffeescript']
        ) {
            this.composeWith('@dizmo/module:ext-coffee-script', lodash.assign(
                this.options, {
                    args: this.args, force: this.properties.initial
                }
            ));
        } else if (
            !this.options['coffeescript'] && this.options.upgrade && pkg.devDependencies['typescript'] ||
            !this.options['coffeescript'] && this.options['typescript']
        ) {
            this.composeWith('@dizmo/module:ext-type-script', lodash.assign(
                this.options, {
                    args: this.args, force: this.properties.initial
                }
            ));
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
        let git = shell.which('git');
        if (git && this.options.git) {
            this.spawnCommand(git.toString(), [
                'init', '--quiet', this.destinationPath()
            ]);
        }
    }
};
