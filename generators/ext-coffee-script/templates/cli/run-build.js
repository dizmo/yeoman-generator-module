const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_coffee = () => Promise.all([
    npx('coffee', '--no-header', '-bco', 'dist/lib', 'lib'),
    npx('coffee', '--no-header', '-bco', 'dist/test', 'test')
]);
const run_babel = () => npx(
    'babel', '--presets=env', '-qsd', 'dist', 'dist'
);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(require('./run-lint')) : p;
        p.then(run_coffee).then(run_babel).catch(exit);
    }).catch(exit);
}
module.exports = () => run_coffee().then(run_babel);
