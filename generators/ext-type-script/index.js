'use strict';

let fs = require('fs'),
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
            let pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            this.fs.copyTpl(
                this.templatePath('cli/'),
                this.destinationPath('cli/'), pkg);
        }
        if (!upgrade || upgrade) {
            let pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            if (pkg.types === undefined) {
                pkg.types = 'dist/lib/index.d.ts';
            }
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    '@types/chai': '^4.1.7',
                    '@types/mocha': '^5.2.6',
                    'tslint': '^5.16.0',
                    'typescript': '^3.4.5'
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
