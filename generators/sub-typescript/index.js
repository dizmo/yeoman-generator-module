'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const rimraf = require('rimraf');

module.exports = class extends Generator {
    writing() {
        const upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json'));
        if (!upgrade || upgrade) {
            const pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            this.fs.copyTpl(
                this.templatePath('cli/'),
                this.destinationPath('cli/'), pkg);
            this.fs.copy(
                this.templatePath('_eslintrc.json'),
                this.destinationPath('.eslintrc.json'));
            this.fs.copy(
                this.templatePath('typedoc.json'),
                this.destinationPath('typedoc.json'));
            }
        if (!upgrade || upgrade) {
            const pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            if (pkg.types === undefined) {
                pkg.types = 'dist/lib/index.d.ts';
            }
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    '@types/chai': '^4.2.11',
                    '@types/mocha': '^7.0.2',
                    '@typescript-eslint/parser': '3.0.2',
                    '@typescript-eslint/eslint-plugin': '3.0.2',
                    'typescript': '^3.9.3',
                    'typedoc': '^0.17.7'
                })
            );
            if (pkg.devDependencies['jsdoc']) {
                delete pkg.devDependencies['jsdoc'];
            }
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
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json'));
        }
        this.conflicter.force = this.options.force || upgrade;
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
