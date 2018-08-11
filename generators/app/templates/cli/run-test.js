const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const test = cover => !cover
    ? npx('mocha', 'dist/test')
    : npx('nyc', 'mocha', 'dist/test');

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(require('./run-lint')) : p;
        p = arg('build') ? p.then(require('./run-build')) : p;
        p.then(test.bind(null, arg('cover'))).catch(exit);
    });
}
module.exports = test;
