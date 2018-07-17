'use strict';

let chalk = require('chalk'),
    fs = require('fs'),
    generator = require('yeoman-generator'),
    lodash = require('lodash'),
    rimraf = require('rimraf');

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
    writing() {
        let upgrade = Boolean(
            this.options.upgrade && fs.existsSync('package.json'));
        if (!upgrade || upgrade) {
            this.fs.copy(
                this.templatePath('cli/'),
                this.destinationPath('cli/'));
        }
        if (!upgrade || upgrade) {
            let pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'coffeelint': '2.1.0',
                    'coffeescript': '^2.3.1'
                })
            );
            if (pkg.scripts['lint:fix']) {
                delete pkg.scripts['lint:fix'];
            }
            this.fs.writeJSON(
                this.destinationPath('package.json'), pkg, null, 2);
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('lib/'),
                this.destinationPath('lib/'));
        }
        if (!upgrade) {
            this.fs.copy(
                this.templatePath('coffeelint.json'),
                this.destinationPath('coffeelint.json'));
        }
        this.conflicter.force = this.options.force || upgrade;
    }

    end() {
        rimraf.sync(
            this.destinationPath('cli/run-lint-fix.js'));
        rimraf.sync(
            this.destinationPath('.eslintrc.json'));
        rimraf.sync(
            this.destinationPath('lib/index.js'));
    }
};
