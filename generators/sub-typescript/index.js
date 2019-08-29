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
                    '@types/chai': '^4.2.0',
                    '@types/mocha': '^5.2.7',
                    'tslint': '^5.19.0',
                    'typescript': '^3.6.2'
                })
            );
            if (pkg.devDependencies['eslint']) {
                delete pkg.devDependencies['eslint'];
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
                this.templatePath('tslint.json'),
                this.destinationPath('tslint.json'));
            this.fs.copy(
                this.templatePath('tsconfig.json'),
                this.destinationPath('tsconfig.json'));
        }
        this.conflicter.force = this.options.force || upgrade;
    }

    end() {
        rimraf.sync(
            this.destinationPath('.eslintrc.json'));
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
