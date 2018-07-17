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
            let pkg = this.fs.readJSON(
                this.destinationPath('package.json')
            );
            pkg.devDependencies = sort(
                lodash.assign(pkg.devDependencies, {
                    'tslint': '^5.10.0',
                    'typescript': '^2.9.2'
                })
            );
            pkg.scripts = sort(
                lodash.assign(pkg.scripts, {
                    'build': 'npx tsc && npx babel dist -d dist --presets=env -s',
                    'lint': 'npx tslint --config tslint.json \'lib/**/*.ts\'',
                    'lint:fix': 'npx tslint --config tslint.json \'lib/**/*.ts\' --fix',
                })
            );
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
            this.destinationPath('lib/index.js'));

        this.log('\n' + 'Run:');
        this.log('\n' + '   ' + chalk.white.bold(
            'cd', this.destinationPath(), '&&', 'npm install') + '\n');
    }
};