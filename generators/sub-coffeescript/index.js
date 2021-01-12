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
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'coffeelint': '2.1.0',
                    'coffeescript': '^2.5.1',
                    'tmp': '^0.2.1'
                })
            );
            if (pkg.devDependencies['eslint']) {
                delete pkg.devDependencies['eslint'];
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
                this.templatePath('coffeelint.json'),
                this.destinationPath('coffeelint.json'));
        }
        this.fs.writeJSON(
            this.destinationPath('package.json'), sort(pkg), null, 2
        );
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
