const { arg, install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return arg('lint') ? run('npm', 'run', 'lint') : null;
}
function run_build() {
    let build = (...args) => [
        'coffee', '--no-header', '--bare', '--compile'
    ].concat(args);
    return Promise.all([
        run('npx', ...build('--output', 'dist/lib', 'lib')),
        run('npx', ...build('--output', 'dist/test', 'test'))
    ]);
}
function run_babel() {
    return run('npx', 'babel', '--presets=env', '-qsd', 'dist', 'dist');
}

install('./node_modules')
    .then(run_lint).then(run_build).then(run_babel).catch(exit);
