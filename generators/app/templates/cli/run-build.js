const { arg, bin, npm, run } = require('./lib-utils');
const { run_lint } = require('./run-lint');
const { exit } = require('process');

function run_babel() {
    return Promise.all([
        run('node', ...babel('-qsd', 'dist/lib', 'lib')),
        run('node', ...babel('-qsd', 'dist/test', 'test'))
    ]);
}
const babel = (...args) => [
    bin('babel', b => `${b}-cli`, b => `${b}.js`), '--presets=env'
].concat(args);

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(run_lint) : p;
        p.then(run_babel).catch(exit);
    }).catch(exit);
}
module.exports = {
    run_build: run_babel
};
