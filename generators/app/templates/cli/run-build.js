const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_babel = () => Promise.all([
    npx('babel', '--presets=env', '-qsd', 'dist/lib', 'lib'),
    npx('babel', '--presets=env', '-qsd', 'dist/test', 'test')
]);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(require('./run-lint')) : p;
        p.then(run_babel).catch(exit);
    }).catch(exit);
}
module.exports = run_babel;
