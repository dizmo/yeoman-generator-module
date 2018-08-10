const { arg, bin, npm, run } = require('./lib-utils');
const { run_lint } = require('./run-lint');
const { exit } = require('process');

function run_coffee() {
    return Promise.all([
        run('node', ...coffee('--output', 'dist/lib', 'lib')),
        run('node', ...coffee('--output', 'dist/test', 'test'))
    ]);
}
const coffee = (...args) => [
    bin('coffee', c => `${c}script`), '--no-header', '--bare', '--compile'
].concat(args);

function run_babel() {
    return run('node', ...babel('-qsd', 'dist', 'dist'));
}
const babel = (...args) => [
    bin('babel', b => `${b}-cli`, b => `${b}.js`), '--presets=env'
].concat(args);

if (require.main === module) {
    let p = npm('install').then(() => {
        p = arg('lint') ? p.then(run_lint) : p;
        p.then(run_coffee).then(run_babel).catch(exit);
    }).catch(exit);
}
module.exports = {
    run_build: () => run_coffee().then(run_babel)
};
