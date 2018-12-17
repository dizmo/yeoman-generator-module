const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const build = () => Promise.all([
    npx('coffee', '--no-header', '-bco', 'dist/lib', 'lib'),
    npx('coffee', '--no-header', '-bco', 'dist/test', 'test')
]).then(() =>
    npx('babel', '--presets=env', '-qsd', 'dist', 'dist')
);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(require('./run-lint')) : p;
        p = p.then(build);
        p = arg('umd')(true) ? p.then(require('./run-browserify')) : p;
        p = p.catch(exit);
    });
}
module.exports = build;
