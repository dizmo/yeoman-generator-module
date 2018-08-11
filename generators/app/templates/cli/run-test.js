const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_test = cover => cover
    ? npx('nyc', 'mocha', 'dist/test')
    : npx('mocha', 'dist/test');

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(require('./run-lint')) : p;
        p = arg('build') ? p.then(require('./run-build')) : p;
        p.then(run_test.bind(null, arg('cover'))).catch(exit);
    }).catch(exit);
}
module.exports = run_test;
