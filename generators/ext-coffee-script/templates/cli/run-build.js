const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const build = () => Promise.all([
    npx('coffee', '--no-header', '-bco', 'dist/lib', 'lib'),
    npx('coffee', '--no-header', '-bco', 'dist/test', 'test')
]).then(() =>
    npx('babel', '--presets=env', '-qsd', 'dist', 'dist')
);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(require('./run-lint')) : p;
        p.then(build).catch(exit);
    }).catch(exit);
}
module.exports = build;
