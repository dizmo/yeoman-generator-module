const { arg, npm, npx } = require('./lib-utils');
const { exit } = require('process');

const run_tsc = () => npx(
    'tsc', '--build', 'tsconfig.json'
);
const run_babel = () => npx(
    'babel', '--presets=env', '-qsd', 'dist', 'dist'
);
if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(require('./run-lint')) : p;
        p.then(run_tsc).then(run_babel).catch(exit);
    }).catch(exit);
}
module.exports = () => run_tsc().then(run_babel);
