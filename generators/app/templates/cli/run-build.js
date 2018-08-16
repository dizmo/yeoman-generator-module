const { arg, npm, npx } = require('./run-utils');
const { exit } = require('process');

const build = () => Promise.all([
    npx('babel', '--presets=env', '-qsd', 'dist/lib', 'lib'),
    npx('babel', '--presets=env', '-qsd', 'dist/test', 'test')
]);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint')(true) ? p.then(require('./run-lint')) : p;
        p.then(build).catch(exit);
    });
}
module.exports = build;
