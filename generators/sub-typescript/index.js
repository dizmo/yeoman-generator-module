'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const rimraf = require('rimraf');

module.exports = class extends Generator {
    writing() {
        const upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json')
        );
        const pkg = this.fs.readJSON(
            this.destinationPath('package.json')
        );
        if (!upgrade || upgrade) {
            if (pkg.types === undefined) {
                pkg.types = 'dist/lib/index.d.ts';
            }
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    '@types/chai': '^4.2.18',
                    '@types/mocha': '^8.2.2',
                    '@typescript-eslint/parser': '4.26.1',
                    '@typescript-eslint/eslint-plugin': '4.26.1',
                    'typedoc': '^0.20.36',
                    'typescript': '^4.3.2'
                })
            );
            if (pkg.devDependencies['jsdoc']) {
                delete pkg.devDependencies['jsdoc'];
            }
        }
        if (!upgrade || upgrade) {
            this.fs.copyTpl(
                this.templatePath('cli/'),
                this.destinationPath('cli/'), {
                    ...pkg, _: require('lodash')
                }
            );
        }
        if (!upgrade) {
            this.fs.copyTpl(
                this.templatePath('lib/'),
                this.destinationPath('lib/'), {
                    ...pkg, _: require('lodash')
                }
            );
            this.fs.copyTpl(
                this.templatePath('test/'),
                this.destinationPath('test/'), {
                    ...pkg, _: require('lodash')
                }
            );
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('_eslintrc.json'),
                this.destinationPath('.eslintrc.json'));
            this.fs.copy(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json'));
            this.fs.copy(
                this.templatePath('typedoc.json'),
                this.destinationPath('typedoc.json'));
        }
        this.fs.writeJSON(
            this.destinationPath('package.json'), sort(pkg), null, 2
        );
        this.env.conflicter.force = this.options.force || upgrade;
    }
    end() {
        rimraf.sync(
            this.destinationPath('jsdoc.json'));
        rimraf.sync(
            this.destinationPath('tslint.json'));
        rimraf.sync(
            this.destinationPath('test/test.js'));
        rimraf.sync(
            this.destinationPath('lib/index.js'));
    }
};
function sort(object) {
    return Object.entries(object).sort().reduce(
        (a, [k, v]) => { a[k] = v; return a; }, {}
    );
}
