const { arg, install, run } = require('./lib-utils');
const { exit } = require('process');

function run_lint() {
    return arg('lint') ? run('npm', 'run', 'lint') : null;
}
function run_babel() {
    let babel = (...args) => [
        'babel', '--presets=env', '-qs'
    ].concat(args);
    return Promise.all([
        run('npx', ...babel('-d', 'dist/lib', 'lib')),
        run('npx', ...babel('-d', 'dist/test', 'test'))
    ]);
}

install('./node_modules')
    .then(run_lint).then(run_babel).catch(exit);
